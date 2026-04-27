import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const THREE: any;

export type EventId = 'sip-paint' | 'sports' | 'birthday' | 'corporate';

const EVENT_SLIDES = [
  {
    id: 'sip-paint' as EventId,
    label: 'EVERY SATURDAY',
    navLabel: 'SIP & PAINT',
    title: 'Sip & Paint',
    description: 'Every Saturday · Pick up a brush, create something beautiful, and enjoy the atmosphere of Bar Maaya.',
    media: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop',
  },
  {
    id: 'sports' as EventId,
    label: 'WATCH PARTY',
    navLabel: 'SPORTS WATCH',
    title: 'Sports Watch Party',
    description: 'Watch Party · Reserve your table, pick your game, and enjoy the party with $8 drinks all match long.',
    media: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80&auto=format&fit=crop',
  },
  {
    id: 'birthday' as EventId,
    label: 'CELEBRATE IN STYLE',
    navLabel: 'BIRTHDAY',
    title: 'Birthday Packages',
    description: 'Celebrate in Style · Every package includes an on-the-house tiramisu cake. Groups of 2 to 40.',
    media: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1600&q=80&auto=format&fit=crop',
  },
  {
    id: 'corporate' as EventId,
    label: 'FOR YOUR TEAM',
    navLabel: 'CORPORATE',
    title: 'Corporate Events',
    description: 'For Your Team · Private venue, custom menus, and full event coordination for your next corporate gathering.',
    media: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80&auto=format&fit=crop',
  },
];

interface EventsSliderProps {
  onBook: (eventId: EventId) => void;
}

export function EventsSlider({ onBook }: EventsSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef(0);
  const onBookRef = useRef(onBook);
  onBookRef.current = onBook;

  useEffect(() => {
    const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
      if ((window as any)[globalName]) { res(); return; }
      if (document.querySelector(`script[src="${src}"]`)) {
        const check = setInterval(() => {
          if ((window as any)[globalName]) { clearInterval(check); res(); }
        }, 50);
        setTimeout(() => { clearInterval(check); rej(new Error(`Timeout: ${globalName}`)); }, 10000);
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => { setTimeout(() => res(), 100); };
      s.onerror = () => rej(new Error(`Failed: ${src}`));
      document.head.appendChild(s);
    });

    const init = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Events slider: failed to load scripts', e);
        return;
      }

      let currentIdx = 0;
      let isTransitioning = false;
      let shaderMaterial: any, renderer: any, scene: any, camera: any;
      const slideTextures: any[] = [];
      let texturesLoaded = false;
      let progressAnim: any = null;
      let autoTimer: any = null;
      let enabled = false;

      const AUTO_SPEED = 6000;
      const PROGRESS_INTERVAL = 50;
      const TRANS_DURATION = 2.5;

      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        varying vec2 vUv;

        vec2 coverUV(vec2 uv, vec2 sz) {
          vec2 s = uResolution / sz;
          float scale = max(s.x, s.y);
          vec2 sc = sz * scale;
          vec2 off = (uResolution - sc) * 0.5;
          return (uv * uResolution - off) / sc;
        }

        void main() {
          vec2 uv1 = coverUV(vUv, uTexture1Size);
          vec2 uv2 = coverUV(vUv, uTexture2Size);
          float maxR = length(uResolution) * 0.85;
          float br = uProgress * maxR;
          vec2 pos = vUv * uResolution;
          vec2 ctr = uResolution * 0.5;
          float d = length(pos - ctr);
          float nd = d / max(br, 0.001);
          float param = smoothstep(br + 3.0, br - 3.0, d);
          vec4 img;
          float time = uProgress * 5.0;
          if (param > 0.0) {
            float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
            vec2 dir = (d > 0.0) ? (pos - ctr) / d : vec2(0.0);
            vec2 dUV = uv2 - dir * ro;
            dUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * param;
            float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
            img = vec4(
              texture2D(uTexture2, dUV + dir * ca * 1.2).r,
              texture2D(uTexture2, dUV + dir * ca * 0.2).g,
              texture2D(uTexture2, dUV - dir * ca * 0.8).b,
              1.0
            );
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08;
          } else {
            img = texture2D(uTexture2, uv2);
          }
          vec4 oldImg = texture2D(uTexture1, uv1);
          if (uProgress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (uProgress - 0.95) / 0.05);
          gl_FragColor = mix(oldImg, img, param);
        }
      `;

      const splitText = (text: string) =>
        text.split('').map(c => `<span style="display:inline-block;opacity:0">${c === ' ' ? '&nbsp;' : c}</span>`).join('');

      const updateLabel = (idx: number) => {
        const el = document.getElementById('eventsLabel');
        if (el) el.textContent = EVENT_SLIDES[idx].label;
      };

      const updateContent = (idx: number) => {
        const titleEl = document.getElementById('eventsTitle');
        const descEl = document.getElementById('eventsDesc');
        if (!titleEl || !descEl) return;

        gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.4, stagger: 0.015, ease: 'power2.in' });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.35, ease: 'power2.in' });

        setTimeout(() => {
          titleEl.innerHTML = splitText(EVENT_SLIDES[idx].title);
          descEl.textContent = EVENT_SLIDES[idx].description;
          updateLabel(idx);
          const ch = titleEl.children;
          switch (idx) {
            case 0:
              gsap.set(ch, { y: 20 });
              gsap.to(ch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
              gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
              break;
            case 1:
              gsap.set(ch, { y: -20 });
              gsap.to(ch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)' });
              gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
              break;
            case 2:
              gsap.set(ch, { filter: 'blur(10px)', scale: 1.5 });
              gsap.to(ch, { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: 'random' }, ease: 'power2.out' });
              gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' });
              break;
            case 3:
              gsap.set(ch, { scale: 0 });
              gsap.to(ch, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' });
              gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' });
              break;
            default:
              gsap.set(ch, { y: 20 });
              gsap.to(ch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
              gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
          }
        }, 450);
      };

      const updateCounter = (idx: number) => {
        const el = document.getElementById('eventsNum');
        if (el) el.textContent = String(idx + 1).padStart(2, '0');
      };

      const updateNavState = (idx: number) =>
        document.querySelectorAll('.events-nav-item').forEach((el, i) => el.classList.toggle('active', i === idx));

      const setNavProgress = (idx: number, pct: number) => {
        const el = document.querySelectorAll('.events-nav-item')[idx]?.querySelector('.events-nav-fill') as HTMLElement | null;
        if (el) { el.style.width = `${pct}%`; el.style.opacity = '1'; }
      };

      const resetNavProgress = (idx: number) => {
        const el = document.querySelectorAll('.events-nav-item')[idx]?.querySelector('.events-nav-fill') as HTMLElement | null;
        if (!el) return;
        el.style.transition = 'width 0.2s ease-out';
        el.style.width = '0%';
        setTimeout(() => { el.style.transition = 'width 0.1s linear, opacity 0.3s ease'; }, 200);
      };

      const stopTimers = () => {
        if (progressAnim) clearInterval(progressAnim);
        if (autoTimer) clearTimeout(autoTimer);
        progressAnim = null;
        autoTimer = null;
      };

      const startTimer = (delay = 0) => {
        stopTimers();
        if (!enabled || !texturesLoaded) return;
        const go = () => {
          let pct = 0;
          const inc = (100 / AUTO_SPEED) * PROGRESS_INTERVAL;
          progressAnim = setInterval(() => {
            if (!enabled) { stopTimers(); return; }
            pct += inc;
            setNavProgress(currentIdx, pct);
            if (pct >= 100) {
              clearInterval(progressAnim);
              progressAnim = null;
              const fill = document.querySelectorAll('.events-nav-item')[currentIdx]?.querySelector('.events-nav-fill') as HTMLElement | null;
              if (fill) { fill.style.opacity = '0'; setTimeout(() => { fill.style.width = '0%'; }, 300); }
              if (!isTransitioning) goTo((currentIdx + 1) % EVENT_SLIDES.length);
            }
          }, PROGRESS_INTERVAL);
        };
        if (delay > 0) autoTimer = setTimeout(go, delay);
        else go();
      };

      const goTo = (targetIdx: number) => {
        if (isTransitioning || targetIdx === currentIdx || !texturesLoaded) return;
        stopTimers();
        resetNavProgress(currentIdx);

        const fromTex = slideTextures[currentIdx];
        const toTex = slideTextures[targetIdx];
        if (!fromTex || !toTex) return;

        isTransitioning = true;
        shaderMaterial.uniforms.uTexture1.value = fromTex;
        shaderMaterial.uniforms.uTexture2.value = toTex;
        shaderMaterial.uniforms.uTexture1Size.value = fromTex.userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = toTex.userData.size;

        updateContent(targetIdx);
        currentIdx = targetIdx;
        currentSlideRef.current = targetIdx;
        updateCounter(targetIdx);
        updateNavState(targetIdx);

        gsap.fromTo(shaderMaterial.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: TRANS_DURATION,
            ease: 'power2.inOut',
            onComplete: () => {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = toTex;
              shaderMaterial.uniforms.uTexture1Size.value = toTex.userData.size;
              isTransitioning = false;
              startTimer(100);
            },
          }
        );
      };

      const buildNav = () => {
        const nav = document.getElementById('eventsNav');
        if (!nav) return;
        nav.innerHTML = '';
        EVENT_SLIDES.forEach((slide, i) => {
          const item = document.createElement('div');
          item.className = `events-nav-item${i === 0 ? ' active' : ''}`;
          item.innerHTML = `<div class="events-nav-line"><div class="events-nav-fill"></div></div><div class="events-nav-name">${slide.navLabel}</div>`;
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isTransitioning && i !== currentIdx) {
              stopTimers();
              resetNavProgress(currentIdx);
              goTo(i);
            }
          });
          nav.appendChild(item);
        });
      };

      const loadTex = (src: string) => new Promise<any>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          src,
          (t: any) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
            resolve(t);
          },
          undefined,
          reject
        );
      });

      const setup = async () => {
        const canvas = document.querySelector('.events-webgl-canvas') as HTMLCanvasElement | null;
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1: { value: null },
            uTexture2: { value: null },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uTexture1Size: { value: new THREE.Vector2(1, 1) },
            uTexture2Size: { value: new THREE.Vector2(1, 1) },
          },
          vertexShader,
          fragmentShader,
        });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

        for (const slide of EVENT_SLIDES) {
          try { slideTextures.push(await loadTex(slide.media)); }
          catch { console.warn('Events slider: failed texture', slide.media); }
        }

        if (slideTextures.length >= 2) {
          shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
          shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
          shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
          shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
          texturesLoaded = true;
          enabled = true;
          document.querySelector('.events-slider-wrapper')?.classList.add('loaded');
          startTimer(500);
        }

        const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
        render();
      };

      // ── Bootstrap ──
      buildNav();
      updateCounter(0);

      const titleEl = document.getElementById('eventsTitle');
      const descEl = document.getElementById('eventsDesc');
      if (titleEl && descEl) {
        titleEl.innerHTML = splitText(EVENT_SLIDES[0].title);
        descEl.textContent = EVENT_SLIDES[0].description;
        updateLabel(0);
        gsap.fromTo(titleEl.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: 'power3.out', delay: 0.5 }
        );
        gsap.fromTo(descEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
      }

      // Arrow click handlers
      document.getElementById('eventsArrowLeft')?.addEventListener('click', () => {
        if (!isTransitioning) goTo((currentIdx - 1 + EVENT_SLIDES.length) % EVENT_SLIDES.length);
      });
      document.getElementById('eventsArrowRight')?.addEventListener('click', () => {
        if (!isTransitioning) goTo((currentIdx + 1) % EVENT_SLIDES.length);
      });

      // Touch swipe
      let touchStartX = 0;
      const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
      const onTouchEnd = (e: TouchEvent) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
          if (dx < 0) goTo((currentIdx + 1) % EVENT_SLIDES.length);
          else goTo((currentIdx - 1 + EVENT_SLIDES.length) % EVENT_SLIDES.length);
        }
      };
      const wrapper = document.querySelector('.events-slider-wrapper');
      wrapper?.addEventListener('touchstart', onTouchStart as EventListener, { passive: true });
      wrapper?.addEventListener('touchend', onTouchEnd as EventListener, { passive: true });

      // Visibility & resize
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopTimers();
        else if (!isTransitioning) startTimer();
      });
      window.addEventListener('resize', () => {
        if (renderer) {
          renderer.setSize(window.innerWidth, window.innerHeight);
          shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        }
      });

      setup();
    };

    init();
    return () => {};
  }, []);

  return (
    <div className="events-slider-wrapper" ref={containerRef}>
      <canvas className="events-webgl-canvas" />
      <div className="events-overlay" />

      {/* Top-left counter */}
      <div className="events-counter-wrap">
        <span id="eventsNum" className="events-num">01</span>
        <span className="events-num-sep">&thinsp;/&thinsp;04</span>
      </div>

      {/* Centred event content */}
      <div className="events-content-wrap">
        <p className="events-slide-label" id="eventsLabel">EVERY SATURDAY</p>
        <h2 className="events-slide-title" id="eventsTitle"></h2>
        <p className="events-slide-desc" id="eventsDesc"></p>
        <button
          className="events-book-btn"
          onClick={() => onBookRef.current(EVENT_SLIDES[currentSlideRef.current].id)}
        >
          RESERVE A TABLE
        </button>
      </div>

      {/* Bottom navigation */}
      <nav className="events-nav" id="eventsNav" />

      {/* Arrows */}
      <button className="events-arrow events-arrow-left" id="eventsArrowLeft" aria-label="Previous event">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="events-arrow events-arrow-right" id="eventsArrowRight" aria-label="Next event">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
