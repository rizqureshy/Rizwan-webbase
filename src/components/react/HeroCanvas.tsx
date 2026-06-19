import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
  WebGL aurora hero background.
  A single full-screen plane runs a fragment shader that layers flowing
  domain-warped noise in the brand azure and violet, with a soft glow that
  follows the cursor. Cheap (one draw call) and degrades to a static frame
  under prefers-reduced-motion.
*/

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 uAzure;
  uniform vec3 uViolet;
  uniform vec3 uInk;

  // Hash + value noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.04;
    // Domain warp for flowing aurora bands
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 1.7 * q + vec2(8.3, 2.8)), fbm(p + 1.7 * q + vec2(2.1, 9.2)));
    float f = fbm(p + 2.0 * r);

    float bands = smoothstep(0.0, 1.0, f * 0.5 + 0.5);

    // Mix brand colors by the noise field
    vec3 col = mix(uInk, uAzure, smoothstep(0.2, 0.9, bands));
    col = mix(col, uViolet, smoothstep(0.5, 1.0, r.x * 0.5 + 0.5));

    // Cursor glow
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float d = distance(p, m);
    float glow = exp(-d * 3.2) * 0.55;
    col += (uAzure * 0.6 + uViolet * 0.4) * glow;

    // Vignette and floor toward ink so text stays readable
    float vig = smoothstep(1.2, 0.2, length(p));
    col = mix(uInk, col, 0.35 + 0.65 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function toVec3(hex: string) {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function AuroraPlane({ reduce }: { reduce: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uAzure: { value: toVec3("#5b8def") },
      uViolet: { value: toVec3("#7c5cff") },
      uInk: { value: toVec3("#0a0e1a") },
    }),
    [],
  );

  useFrame((state) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uRes.value.set(size.width, size.height);
    // Ease the mouse uniform toward the target for a soft trail.
    u.uMouse.value.lerp(mouse.current, 0.06);
    if (!reduce) {
      u.uTime.value = state.clock.elapsedTime;
    }
  });

  // Track pointer relative to the canvas.
  const onPointer = (e: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.set(
      (e.clientX - rect.left) / rect.width,
      1 - (e.clientY - rect.top) / rect.height,
    );
  };

  useMemo(() => {
    if (typeof window === "undefined" || reduce) return;
    window.addEventListener("pointermove", onPointer, { passive: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      dpr={[1, 1.75]}
      frameloop={reduce ? "demand" : "always"}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <AuroraPlane reduce={reduce} />
    </Canvas>
  );
}
