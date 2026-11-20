"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { annurcaSkin, linenTexture, oliveWoodTop, plateTexture, woodSide } from "./textures";

/* ------------------------------------------------------------------ */
/* Geometrie                                                            */
/* ------------------------------------------------------------------ */

/** Profilo del piatto: fondo, tesa, labbro e piede. Restituisce anche dove inizia/finisce la tesa (per la texture). */
function usePlateGeometry() {
  return useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const push = (x: number, y: number) => pts.push(new THREE.Vector2(x, y));
    // cavetto (fondo)
    for (let i = 0; i <= 14; i++) push(0.001 + (i / 14) * 0.78, 0.07);
    // raccordo verso la tesa
    for (let i = 1; i <= 7; i++) {
      const t = i / 7;
      push(0.78 + t * 0.2, 0.07 + Math.pow(t, 1.6) * 0.07);
    }
    const rimStartIdx = pts.length - 1;
    // tesa
    for (let i = 1; i <= 10; i++) {
      const t = i / 10;
      push(0.98 + t * 0.34, 0.14 + t * 0.075 + Math.sin(t * Math.PI) * 0.01);
    }
    const rimEndIdx = pts.length - 1;
    // labbro e sotto
    push(1.345, 0.212);
    push(1.35, 0.19);
    push(1.3, 0.165);
    push(1.1, 0.11);
    push(0.82, 0.045);
    push(0.74, 0.0);
    push(0.62, 0.0);
    push(0.6, 0.03);
    push(0.001, 0.03);
    // Il profilo va percorso dal sotto verso il sopra perché le facce superiori siano rivolte verso l'alto
    pts.reverse();
    const geo = new THREE.LatheGeometry(pts, 128);
    geo.computeVertexNormals();
    const n = pts.length - 1;
    return { geo, rimStart: 1 - rimEndIdx / n, rimEnd: 1 - rimStartIdx / n };
  }, []);
}

/** Raviolo: cuscinetto di pasta con bordo festonato. */
function useRavioloGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 56, 56);
    geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i);
      let z = p.getZ(i);
      const d = Math.max(Math.abs(x), Math.abs(z));
      const round = Math.hypot(Math.max(Math.abs(x) - 0.22, 0), Math.max(Math.abs(z) - 0.22, 0));
      const dd = Math.max(d, 0.22 + round) ;
      let y = 0;
      if (dd < 0.36) y = 0.17 * Math.pow(Math.cos((dd / 0.36) * (Math.PI / 2)), 0.75);
      // bordo smerlato
      if (d > 0.4) {
        const a = Math.atan2(z, x);
        const k = 1 + Math.sin(a * 44) * 0.035;
        x *= k;
        z *= k;
        y += 0.006 * Math.sin(a * 44);
      }
      p.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** Mela annurca: tipicamente piccola e schiacciata. */
function useAppleGeometry() {
  return useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = t * Math.PI;
      let rr = Math.sin(a) * (1 + 0.08 * Math.sin(a * 2 - 0.6));
      let y = -Math.cos(a) * 0.78;
      // fossette a calice e peduncolo
      if (t < 0.12) y += (0.12 - t) * 1.1;
      if (t > 0.88) y -= (t - 0.88) * 1.3;
      rr = Math.max(rr, 0.001);
      pts.push(new THREE.Vector2(rr, y));
    }
    const geo = new THREE.LatheGeometry(pts, 64);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** Foglia (salvia / ulivo) leggermente curvata. */
function useLeafGeometry(length: number, width: number) {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(width, length * 0.25, width * 0.8, length * 0.75, 0, length);
    s.bezierCurveTo(-width * 0.8, length * 0.75, -width, length * 0.25, 0, 0);
    const geo = new THREE.ShapeGeometry(s, 16);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      p.setZ(i, x * x * 3.2 - Math.sin((y / length) * Math.PI) * 0.02);
    }
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, [length, width]);
}

/** Velo di burro e salvia sotto i ravioli. */
function useSauceGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const N = 48;
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 0.52 + Math.sin(a * 3) * 0.05 + Math.sin(a * 7 + 1) * 0.03;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r * 0.9;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    const geo = new THREE.ShapeGeometry(s, 24);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);
}

/* ------------------------------------------------------------------ */
/* Composizione                                                         */
/* ------------------------------------------------------------------ */

type Drop = { from: THREE.Vector3; to: THREE.Vector3; delay: number; spin: number };

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

function Composition({ pointer, scroll }: { pointer: React.RefObject<{ x: number; y: number }>; scroll: React.RefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const dish = useRef<THREE.Group>(null);
  const droppers = useRef<(THREE.Object3D | null)[]>([]);
  const time = useRef(0);

  const plate = usePlateGeometry();
  const raviolo = useRavioloGeometry();
  const apple = useAppleGeometry();
  const sage = useLeafGeometry(0.34, 0.11);
  const olive = useLeafGeometry(0.42, 0.06);
  const sauce = useSauceGeometry();

  const mats = useMemo(() => {
    const plateMap = plateTexture(plate.rimStart, plate.rimEnd);
    return {
      plate: new THREE.MeshPhysicalMaterial({ map: plateMap, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.4, envMapIntensity: 0.6 }),
      boardTop: new THREE.MeshStandardMaterial({ map: oliveWoodTop(), roughness: 0.62 }),
      boardSide: new THREE.MeshStandardMaterial({ map: woodSide(), roughness: 0.7 }),
      pasta: new THREE.MeshPhysicalMaterial({
        color: "#ebc98d",
        roughness: 0.5,
        sheen: 0.4,
        sheenColor: new THREE.Color("#fff1cf"),
        clearcoat: 0.25,
        clearcoatRoughness: 0.5,
        side: THREE.DoubleSide,
      }),
      sauce: new THREE.MeshPhysicalMaterial({ color: "#c98d2e", roughness: 0.12, clearcoat: 1, transparent: true, opacity: 0.82 }),
      sage: new THREE.MeshStandardMaterial({ color: "#5f6d45", roughness: 0.55, side: THREE.DoubleSide }),
      olive: new THREE.MeshStandardMaterial({ color: "#7c8563", roughness: 0.6, side: THREE.DoubleSide }),
      appleA: new THREE.MeshPhysicalMaterial({ map: annurcaSkin(3), roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.45 }),
      appleB: new THREE.MeshPhysicalMaterial({ map: annurcaSkin(9), roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.45 }),
      flesh: new THREE.MeshStandardMaterial({ color: "#f3e7c7", roughness: 0.45 }),
      skin: new THREE.MeshStandardMaterial({ color: "#a8232a", roughness: 0.4 }),
      stem: new THREE.MeshStandardMaterial({ color: "#4a3320", roughness: 0.8 }),
      linen: new THREE.MeshStandardMaterial({ map: linenTexture(), roughness: 0.95, side: THREE.DoubleSide }),
      cheese: new THREE.MeshStandardMaterial({ color: "#f7f0de", roughness: 0.9 }),
    };
  }, [plate.rimStart, plate.rimEnd]);

  const stemCurve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.02, 0.08, 0.01), new THREE.Vector3(0.06, 0.14, 0.0)]),
    [],
  );
  const oliveBranch = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.9, 0, 0.2),
        new THREE.Vector3(-0.3, 0.03, 0.05),
        new THREE.Vector3(0.3, 0.05, -0.05),
        new THREE.Vector3(0.9, 0.06, -0.2),
      ]),
    [],
  );

  // dadini di mela, scaglie di formaggio: posizioni stabili
  const garnish = useMemo(() => {
    const out: { p: [number, number, number]; r: number; skin: boolean; s: number }[] = [];
    const spots: [number, number][] = [
      [-0.42, 0.18], [0.38, 0.32], [0.12, -0.46], [-0.18, 0.44], [0.48, -0.12], [-0.5, -0.2], [0.22, 0.05], [-0.05, -0.12],
    ];
    spots.forEach(([x, z], i) => out.push({ p: [x, 0.11, z], r: i * 0.9, skin: i % 3 === 0, s: 0.055 + (i % 2) * 0.012 }));
    return out;
  }, []);

  // Animazione d'ingresso degli ingredienti: cadono dall'alto con un leggero giro
  const drops = useMemo<Drop[]>(
    () => [
      { from: new THREE.Vector3(1.6, 2.6, 0.9), to: new THREE.Vector3(1.45, 0.24, 0.85), delay: 0.5, spin: 2.2 },
      { from: new THREE.Vector3(2.0, 2.9, 0.0), to: new THREE.Vector3(1.62, 0.21, 0.12), delay: 0.7, spin: -1.8 },
      { from: new THREE.Vector3(-0.4, 2.2, 0.2), to: new THREE.Vector3(-0.32, 0.12, 0.08), delay: 1.0, spin: 3 },
      { from: new THREE.Vector3(0.6, 2.4, -0.4), to: new THREE.Vector3(0.36, 0.12, -0.2), delay: 1.1, spin: -3 },
      { from: new THREE.Vector3(0.0, 2.6, 0.6), to: new THREE.Vector3(0.05, 0.13, 0.4), delay: 1.2, spin: 2 },
    ],
    [],
  );

  const { size } = useThree();

  useFrame((state, delta) => {
    // tempo accumulato dai delta (indipendente da THREE.Clock, deprecato), limitato per evitare salti dopo una pausa
    time.current += Math.min(delta, 0.1);
    const t = time.current;
    const sc = scroll.current ?? 0;
    const pt = pointer.current ?? { x: 0, y: 0 };

    if (root.current) {
      const intro = easeOut(t / 1.8);
      root.current.position.y = THREE.MathUtils.lerp(-0.6, 0, intro) - sc * 0.4;
      const s = THREE.MathUtils.lerp(0.86, 1, intro);
      root.current.scale.setScalar(s);
      const targetRy = Math.sin(t * 0.18) * 0.12 + pt.x * 0.18 + sc * 0.7;
      const targetRx = pt.y * 0.06;
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetRy, 3, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetRx, 3, delta);
    }
    if (dish.current) {
      dish.current.position.y = 0.12 + Math.sin(t * 0.9) * 0.012;
    }
    drops.forEach((d, i) => {
      const o = droppers.current[i];
      if (!o) return;
      const k = easeOut((t - d.delay) / 1.3);
      o.position.lerpVectors(d.from, d.to, k);
      o.rotation.y = (1 - k) * d.spin;
      o.visible = t > d.delay - 0.05;
    });

    // camera: inquadratura calcolata sull'aspetto del contenitore, dolly allo scroll, parallasse sul puntatore
    const cam = state.camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const vf = THREE.MathUtils.degToRad(cam.fov) / 2;
    const hf = Math.atan(Math.tan(vf) * aspect);
    const R = 2.6;
    const dist = Math.max(R / Math.sin(hf), (R * 0.8) / Math.sin(vf)) * (1 - sc * 0.22);
    const dir = new THREE.Vector3(pt.x * 0.08, 0.58 - sc * 0.12 + pt.y * 0.03, 0.82).normalize();
    cam.position.x = THREE.MathUtils.damp(cam.position.x, dir.x * dist, 2.5, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, dir.y * dist, 2.5, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, dir.z * dist, 2.5, delta);
    cam.lookAt(0, 0.15, 0);
  });

  return (
    <group ref={root}>
      {/* tagliere in legno d'ulivo */}
      <mesh material={[mats.boardSide, mats.boardTop, mats.boardSide]} position={[0, -0.06, 0]}>
        <cylinderGeometry args={[2.05, 2.0, 0.12, 96]} />
      </mesh>

      {/* tovagliolo di lino */}
      <mesh material={mats.linen} position={[-1.55, -0.115, 1.05]} rotation={[-Math.PI / 2, 0, 0.5]}>
        <planeGeometry args={[1.6, 1.0]} />
      </mesh>

      {/* rametto d'ulivo */}
      <group position={[-0.9, 0.0, -1.35]} rotation={[0, 0.5, 0]}>
        <mesh material={mats.stem}>
          <tubeGeometry args={[oliveBranch, 32, 0.012, 6, false]} />
        </mesh>
        {[-0.7, -0.45, -0.2, 0.05, 0.3, 0.55, 0.78].map((u, i) => {
          const p = oliveBranch.getPoint((u + 0.9) / 1.8);
          return (
            <mesh
              key={i}
              geometry={olive}
              material={mats.olive}
              position={[p.x, p.y + 0.01, p.z]}
              rotation={[0, (i % 2 ? 1 : -1) * 1.1 + i * 0.1, 0]}
            />
          );
        })}
      </group>

      {/* piatto e ravioli */}
      <group ref={dish} position={[0, 0.12, 0]} scale={1.14}>
        <mesh geometry={plate.geo} material={mats.plate} />
        <mesh geometry={sauce} material={mats.sauce} position={[0, 0.072, 0]} />
        <mesh geometry={raviolo} material={mats.pasta} position={[-0.3, 0.075, -0.14]} rotation={[0, 0.35, 0]} scale={0.62} />
        <mesh geometry={raviolo} material={mats.pasta} position={[0.31, 0.075, -0.1]} rotation={[0, -0.2, 0]} scale={0.62} />
        <mesh geometry={raviolo} material={mats.pasta} position={[0.0, 0.075, 0.33]} rotation={[0, 0.9, 0]} scale={0.62} />
        {garnish.map((g, i) => (
          <mesh key={i} material={g.skin ? mats.skin : mats.flesh} position={g.p} rotation={[g.r, g.r * 1.3, 0]}>
            <boxGeometry args={[g.s, g.s * 0.8, g.s]} />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={`c${i}`} material={mats.cheese} position={[Math.cos(i * 1.7) * 0.3, 0.12, Math.sin(i * 1.7) * 0.3]} rotation={[0.4, i, 0.2]}>
            <boxGeometry args={[0.05, 0.006, 0.025]} />
          </mesh>
        ))}
      </group>

      {/* ingredienti in movimento: due mele annurca e tre foglie di salvia */}
      <group ref={(o) => void (droppers.current[0] = o)}>
        <mesh geometry={apple} material={mats.appleA} scale={0.3} />
        <mesh material={mats.stem} position={[0, 0.2, 0]} scale={0.9}>
          <tubeGeometry args={[stemCurve, 8, 0.012, 6, false]} />
        </mesh>
      </group>
      <group ref={(o) => void (droppers.current[1] = o)} rotation={[0.2, 0, 0.35]}>
        <mesh geometry={apple} material={mats.appleB} scale={0.26} />
        <mesh material={mats.stem} position={[0, 0.17, 0]} scale={0.8}>
          <tubeGeometry args={[stemCurve, 8, 0.012, 6, false]} />
        </mesh>
      </group>
      <group ref={(o) => void (droppers.current[2] = o)}>
        <mesh geometry={sage} material={mats.sage} position={[0, 0.12, 0]} rotation={[0, 0.6, 0]} />
      </group>
      <group ref={(o) => void (droppers.current[3] = o)}>
        <mesh geometry={sage} material={mats.sage} position={[0, 0.12, 0]} rotation={[0, -1.9, 0]} />
      </group>
      <group ref={(o) => void (droppers.current[4] = o)}>
        <mesh geometry={sage} material={mats.sage} position={[0, 0.12, 0]} rotation={[0, 2.6, 0]} scale={0.85} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                               */
/* ------------------------------------------------------------------ */

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const visible = useRef(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 3.1, 5.2], fov: 30, near: 0.1, far: 50 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          onReady?.();
        }}
        frameloop="always"
        aria-hidden="true"
      >
        <PauseWhenHidden visible={visible} />
        <ambientLight intensity={0.35} color="#ffe9cf" />
        <directionalLight position={[3.5, 6, 2.5]} intensity={2.4} color="#ffe0b5" />
        <directionalLight position={[-4, 2.5, -3]} intensity={1.1} color="#ff9e66" />
        <pointLight position={[0, 1.6, 2.2]} intensity={1.4} distance={6} color="#ffd9a8" />
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={1.4} color="#fff1dc" position={[3, 5, -4]} rotation={[Math.PI / 2.6, 0, 0]} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#ffb47a" position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} scale={[3, 8, 1]} />
          <Lightformer form="ring" intensity={0.8} color="#ffffff" position={[4, 2, 3]} scale={2} />
        </Environment>
        <Composition pointer={pointer} scroll={scroll} />
        <ContactShadows position={[0, -0.13, 0]} opacity={0.55} scale={7} blur={2.6} far={2.5} resolution={512} color="#1a120c" />
      </Canvas>
    </div>
  );
}

/** Ferma il rendering quando la hero non è visibile, per risparmiare batteria. */
function PauseWhenHidden({ visible }: { visible: React.RefObject<boolean> }) {
  const set = useThree((s) => s.setFrameloop);
  useEffect(() => {
    const id = window.setInterval(() => set(visible.current ? "always" : "never"), 400);
    return () => window.clearInterval(id);
  }, [set, visible]);
  return null;
}
