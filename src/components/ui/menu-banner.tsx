import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface MenuBannerProps {
  activeCategory: string;
  activeCategoryLabel: string;
  categoryImages: Record<string, string>; // categoryId → image URL (imported asset)
}

export default function MenuBanner({
  activeCategory,
  activeCategoryLabel,
  categoryImages,
}: MenuBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  // Store WebGL objects so they persist across renders but are not reactive state
  const glRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    loader: THREE.TextureLoader;
    t1: THREE.Texture | null;
    t2: THREE.Texture | null;
    animRaf: number | null;
    animStart: number | null;
    ro: ResizeObserver | null;
  } | null>(null);

  // Keep a ref to the active category so the transition effect can read it
  // without closing over a stale value
  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

  // ─── Mount / unmount: build the Three.js scene once ───────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer — with WebGL availability check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false });
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Camera: orthographic NDC-style, plane from -1 to 1
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const scene = new THREE.Scene();

    // Full-screen plane
    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform sampler2D uT1;
      uniform sampler2D uT2;
      uniform float uProg;
      uniform vec2 uRes;
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5);
        float ar = uRes.x / uRes.y;
        vec2 uv = vUv;

        // aspect-corrected distance from center
        vec2 d = (uv - center) * vec2(ar, 1.0);
        float dist = length(d);

        // expanding radius
        float radius = uProg * 1.8;
        float edge = 0.08;
        float mask = smoothstep(radius, radius - edge, dist);

        // glass refraction direction
        vec2 dir = normalize((uv - center) + vec2(0.0001));
        float refr = 0.03 * (1.0 - smoothstep(0.0, 0.6, uProg));
        float ca = 0.018 * (1.0 - smoothstep(0.0, 0.4, uProg));

        // chromatic aberration on uT2
        float r2 = texture2D(uT2, uv + dir * (refr + ca)).r;
        float g2 = texture2D(uT2, uv + dir * refr).g;
        float b2 = texture2D(uT2, uv + dir * (refr - ca)).b;
        vec4 t2 = vec4(r2, g2, b2, 1.0);

        vec4 t1 = texture2D(uT1, uv);

        gl_FragColor = mix(t1, t2, mask);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uT1: { value: null },
        uT2: { value: null },
        uProg: { value: 0.0 },
        uRes: { value: new THREE.Vector2() },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();

    // Size helper
    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      material.uniforms.uRes.value.set(w, h);
    };

    setSize();

    // Load initial image
    const initialSrc = categoryImages[activeCategoryRef.current];
    if (initialSrc) {
      loader.load(initialSrc, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        material.uniforms.uT1.value = tex;
        material.uniforms.uT2.value = tex;
        material.uniforms.uProg.value = 0.0;
        renderer.render(scene, camera);
        gl.t1 = tex;
        gl.t2 = tex;
      });
    }

    // Render loop (static — only rendered when needed; we drive it via RAF in transitions)
    renderer.render(scene, camera);

    // ResizeObserver
    const ro = new ResizeObserver(() => {
      setSize();
      renderer.render(scene, camera);
    });
    ro.observe(container);

    const gl = {
      renderer,
      scene,
      camera,
      mesh,
      material,
      loader,
      t1: null as THREE.Texture | null,
      t2: null as THREE.Texture | null,
      animRaf: null as number | null,
      animStart: null as number | null,
      ro,
    };

    glRef.current = gl;

    // Cleanup
    return () => {
      ro.disconnect();

      if (gl.animRaf !== null) cancelAnimationFrame(gl.animRaf);

      if (gl.t1) gl.t1.dispose();
      if (gl.t2 && gl.t2 !== gl.t1) gl.t2.dispose();

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      glRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Transition: fires whenever activeCategory changes ────────────────────
  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    const src = categoryImages[activeCategory];
    if (!src) return;

    // Cancel any in-progress animation
    if (gl.animRaf !== null) {
      cancelAnimationFrame(gl.animRaf);
      gl.animRaf = null;
    }

    // If there was a pending t2 that never became t1, dispose it
    if (gl.t2 && gl.t2 !== gl.t1) {
      gl.t2.dispose();
      gl.t2 = null;
    }

    // Immediately show current t1 while loading
    gl.material.uniforms.uProg.value = 0.0;
    gl.renderer.render(gl.scene, gl.camera);

    gl.loader.load(src, (tex) => {
      tex.minFilter = THREE.LinearFilter;

      const currentGl = glRef.current;
      if (!currentGl) {
        tex.dispose();
        return;
      }

      currentGl.t2 = tex;
      currentGl.material.uniforms.uT2.value = tex;
      currentGl.material.uniforms.uProg.value = 0.0;

      const DURATION = 1200; // ms
      let start: number | null = null;

      const animate = (ts: number) => {
        if (!glRef.current) return;
        if (start === null) start = ts;

        const elapsed = ts - start;
        const progress = Math.min(elapsed / DURATION, 1.0);

        glRef.current.material.uniforms.uProg.value = progress;
        glRef.current.renderer.render(glRef.current.scene, glRef.current.camera);

        if (progress < 1.0) {
          glRef.current.animRaf = requestAnimationFrame(animate);
        } else {
          // Transition complete: promote t2 → t1
          const g = glRef.current;

          // Dispose old t1 only if it's different from t2
          if (g.t1 && g.t1 !== g.t2) {
            g.t1.dispose();
          }

          g.t1 = g.t2;
          g.material.uniforms.uT1.value = g.t1;
          g.material.uniforms.uProg.value = 0.0;
          g.animRaf = null;

          g.renderer.render(g.scene, g.camera);
        }
      };

      currentGl.animRaf = requestAnimationFrame(animate);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  // ─── Render ───────────────────────────────────────────────────────────────
  const fallbackSrc = categoryImages[activeCategory];

  return (
    <div className="relative w-full" style={{ height: "55vh" }}>
      {/* WebGL canvas container or fallback image */}
      {webglFailed ? (
        <motion.img
          key={activeCategory}
          src={fallbackSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ filter: "brightness(0.55)" }}
        />
      ) : (
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,8,4,0.3) 0%, rgba(10,8,4,0.55) 100%)",
        }}
      />

      {/* Category label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h2
          key={activeCategoryLabel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#F5ECD7",
            textAlign: "center",
            textShadow: "0 2px 24px rgba(0,0,0,0.5)",
          }}
        >
          {activeCategoryLabel}
        </motion.h2>
      </div>
    </div>
  );
}
