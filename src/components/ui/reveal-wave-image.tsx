import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Wave displacement
    float wave = sin(pos.x * 4.0 + uTime * 1.8) * 0.04 * (1.0 - uProgress);
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uBrightness;

  varying vec2 vUv;

  // Ordered dithering 4x4 matrix
  float dither4x4(vec2 uv, float val) {
    int x = int(mod(uv.x * 1000.0, 4.0));
    int y = int(mod(uv.y * 1000.0, 4.0));
    float threshold[16];
    threshold[0]  = 0.0/16.0;  threshold[1]  = 8.0/16.0;
    threshold[2]  = 2.0/16.0;  threshold[3]  = 10.0/16.0;
    threshold[4]  = 12.0/16.0; threshold[5]  = 4.0/16.0;
    threshold[6]  = 14.0/16.0; threshold[7]  = 6.0/16.0;
    threshold[8]  = 3.0/16.0;  threshold[9]  = 11.0/16.0;
    threshold[10] = 1.0/16.0;  threshold[11] = 9.0/16.0;
    threshold[12] = 15.0/16.0; threshold[13] = 7.0/16.0;
    threshold[14] = 13.0/16.0; threshold[15] = 5.0/16.0;
    int idx = y * 4 + x;
    float t = threshold[idx];
    return step(t, val);
  }

  void main() {
    vec2 uv = vUv;

    // Subtle wave distortion on uv
    float distort = sin(uv.x * 6.0 + uTime * 1.4) * 0.008 * (1.0 - uProgress);
    uv.y += distort;

    vec4 tex = texture2D(uTexture, uv);
    vec3 col = tex.rgb * uBrightness;

    // Dithering reveal: progress drives how many pixels are "on"
    float reveal = dither4x4(vUv, uProgress);

    // Flashlight / spotlight on mouse hover
    float dist = distance(vUv, uMouse);
    float spot  = smoothstep(0.38, 0.0, dist) * 0.28 * uProgress;

    float alpha = clamp(reveal + spot, 0.0, 1.0);
    vec3 finalCol = col + col * spot;

    gl_FragColor = vec4(finalCol, alpha);
  }
`;

// ─── R3F Mesh ─────────────────────────────────────────────────────────────────

interface WaveMeshProps {
  src: string;
  mouse: { x: number; y: number };
  triggered: boolean;
  brightness: number;
}

function WaveMesh({ src, mouse, triggered, brightness }: WaveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const texture = useTexture(src);
  const progressRef = useRef(0);

  // Responsive plane size
  const imgAspect = texture.image
    ? (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height
    : 16 / 9;
  const planeW = size.width;
  const planeH = planeW / imgAspect;

  const uniforms = useRef({
    uTexture:    { value: texture },
    uTime:       { value: 0 },
    uProgress:   { value: 0 },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uBrightness: { value: brightness },
  });

  useEffect(() => {
    uniforms.current.uTexture.value = texture;
  }, [texture]);

  useEffect(() => {
    uniforms.current.uBrightness.value = brightness;
  }, [brightness]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.x, mouse.y),
      0.08
    );

    // Animate progress when triggered
    if (triggered && progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + 0.008, 1);
    } else if (!triggered && progressRef.current > 0) {
      progressRef.current = Math.max(progressRef.current - 0.004, 0);
    }
    mat.uniforms.uProgress.value = progressRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeW, planeH, 32, 32]} />
      <shaderMaterial
        key={`${planeW}-${planeH}`}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface RevealWaveImageProps {
  src: string;
  alt?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  className?: string;
  brightness?: number;
  aspectRatio?: string;
}

const RevealWaveImage = ({
  src,
  alt,
  eyebrow,
  heading,
  body,
  className = "",
  brightness = 0.72,
  aspectRatio = "16/9",
}: RevealWaveImageProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ background: "hsl(8,60%,3%)", overflow: "hidden" }}
    >
      {/* Text header */}
      {(eyebrow || heading || body) && (
        <div style={{
          padding: "4rem 2rem 3rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.55em",
                color: "rgba(201,168,76,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {eyebrow}
            </motion.p>
          )}
          {heading && (
            <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: '"Cormorant Garamond", Cormorant, serif',
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                {heading}
              </motion.h2>
            </div>
          )}
          {body && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              style={{
                fontFamily: "Calibri, 'Gill Sans', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.32)",
                maxWidth: "480px",
                lineHeight: 1.75,
              }}
            >
              {body}
            </motion.p>
          )}
        </div>
      )}

      {/* Canvas container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          aspectRatio,
          width: "100%",
          maxHeight: "640px",
          overflow: "hidden",
          cursor: "crosshair",
        }}
        aria-label={alt}
      >
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ position: "absolute", inset: 0 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <WaveMesh
            src={src}
            mouse={mouse}
            triggered={isInView}
            brightness={brightness}
          />
        </Canvas>

        {/* Subtle vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
};

export default RevealWaveImage;
