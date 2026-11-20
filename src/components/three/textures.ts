import * as THREE from "three";

/** Generatore pseudo-casuale deterministico: le texture sono identiche a ogni caricamento. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function finish(canvas: HTMLCanvasElement, repeat = false) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Smalto del piatto in ceramica artigianale, mappato sulle UV della LatheGeometry:
 * asse X = giro del piatto, asse Y = profilo (dal centro al bordo).
 * rimStart/rimEnd sono le frazioni del profilo che corrispondono alla tesa.
 */
export function plateTexture(rimStart: number, rimEnd: number) {
  const W = 2048;
  const H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const r = rng(7);

  // smalto crema con variazioni
  g.fillStyle = "#f2e8d5";
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = `rgba(${120 + r() * 60},${90 + r() * 40},${60 + r() * 30},${r() * 0.08})`;
    g.beginPath();
    g.arc(r() * W, r() * H, r() * 2.2, 0, Math.PI * 2);
    g.fill();
  }

  // y canvas = (1 - v) * H
  const y = (v: number) => (1 - v) * H;
  const top = y(rimEnd);
  const bottom = y(rimStart);
  const band = bottom - top;

  // filetto terracotta interno ed esterno
  g.fillStyle = "#a75b3a";
  g.fillRect(0, bottom - band * 0.1, W, band * 0.07);
  g.fillRect(0, top + band * 0.04, W, band * 0.09);

  // onda cobalto dipinta a mano
  g.strokeStyle = "#2f4a6b";
  g.lineWidth = band * 0.07;
  g.lineCap = "round";
  g.beginPath();
  const mid = top + band * 0.5;
  for (let x = 0; x <= W; x += 4) {
    const yy = mid + Math.sin((x / W) * Math.PI * 2 * 18) * band * 0.16 + (r() - 0.5) * 1.2;
    if (x === 0) g.moveTo(x, yy);
    else g.lineTo(x, yy);
  }
  g.stroke();

  // puntini ocra
  g.fillStyle = "#c08a3e";
  for (let k = 0; k < 36; k++) {
    const x = ((k + 0.5) / 36) * W;
    g.beginPath();
    g.arc(x, top + band * 0.28, band * 0.045, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.arc(x + W / 72, top + band * 0.73, band * 0.035, 0, Math.PI * 2);
    g.fill();
  }

  return finish(c);
}

/** Tagliere in legno d'ulivo tagliato in sezione: anelli concentrici irregolari. */
export function oliveWoodTop() {
  const S = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const r = rng(21);
  const grd = g.createRadialGradient(S / 2, S / 2, 10, S / 2, S / 2, S / 2);
  grd.addColorStop(0, "#c49a6c");
  grd.addColorStop(0.7, "#a5784e");
  grd.addColorStop(1, "#7d5434");
  g.fillStyle = grd;
  g.fillRect(0, 0, S, S);
  for (let ring = 0; ring < 70; ring++) {
    const base = 8 + ring * 7 + r() * 3;
    g.strokeStyle = `rgba(${70 + r() * 40},${42 + r() * 20},${22 + r() * 12},${0.12 + r() * 0.22})`;
    g.lineWidth = 0.8 + r() * 2.4;
    g.beginPath();
    for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.04) {
      const wob = Math.sin(a * 3 + ring * 0.7) * 6 + Math.sin(a * 7 + ring) * 2.5;
      const rad = base + wob;
      const x = S / 2 + 18 + Math.cos(a) * rad;
      const yy = S / 2 - 12 + Math.sin(a) * rad * 0.97;
      if (a === 0) g.moveTo(x, yy);
      else g.lineTo(x, yy);
    }
    g.stroke();
  }
  // venature scure tipiche dell'ulivo
  for (let i = 0; i < 9; i++) {
    g.strokeStyle = `rgba(55,32,18,${0.15 + r() * 0.2})`;
    g.lineWidth = 3 + r() * 6;
    g.beginPath();
    const a0 = r() * Math.PI * 2;
    g.moveTo(S / 2 + Math.cos(a0) * 90, S / 2 + Math.sin(a0) * 90);
    g.bezierCurveTo(
      S / 2 + Math.cos(a0 + 0.4) * 250,
      S / 2 + Math.sin(a0 + 0.4) * 250,
      S / 2 + Math.cos(a0 - 0.3) * 360,
      S / 2 + Math.sin(a0 - 0.3) * 360,
      S / 2 + Math.cos(a0) * 500,
      S / 2 + Math.sin(a0) * 500,
    );
    g.stroke();
  }
  return finish(c);
}

export function woodSide() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 64;
  const g = c.getContext("2d")!;
  const r = rng(5);
  g.fillStyle = "#7b5233";
  g.fillRect(0, 0, 1024, 64);
  for (let i = 0; i < 80; i++) {
    g.fillStyle = `rgba(40,22,10,${r() * 0.25})`;
    g.fillRect(r() * 1024, 0, 1 + r() * 4, 64);
  }
  return finish(c, true);
}

/** Buccia della mela annurca: rosso con striature e lenticelle chiare, base più gialla. */
export function annurcaSkin(seed = 3) {
  const W = 512;
  const H = 256;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const r = rng(seed);
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#9e1f24");
  grd.addColorStop(0.55, "#b52a2a");
  grd.addColorStop(0.85, "#c4572e");
  grd.addColorStop(1, "#b9a046");
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 120; i++) {
    g.strokeStyle = `rgba(${90 + r() * 40},${10 + r() * 15},${20 + r() * 15},${0.25 + r() * 0.3})`;
    g.lineWidth = 1 + r() * 4;
    const x = r() * W;
    g.beginPath();
    g.moveTo(x, 0);
    g.bezierCurveTo(x + (r() - 0.5) * 20, H * 0.3, x + (r() - 0.5) * 20, H * 0.6, x + (r() - 0.5) * 10, H * (0.7 + r() * 0.3));
    g.stroke();
  }
  for (let i = 0; i < 420; i++) {
    g.fillStyle = `rgba(245,220,170,${0.25 + r() * 0.4})`;
    g.beginPath();
    g.arc(r() * W, r() * H * 0.9, 0.6 + r() * 1.3, 0, Math.PI * 2);
    g.fill();
  }
  return finish(c);
}

/** Tovagliolo di lino con righe terracotta. */
export function linenTexture() {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const r = rng(11);
  g.fillStyle = "#ece2cf";
  g.fillRect(0, 0, S, S);
  for (let i = 0; i < S; i += 2) {
    g.fillStyle = `rgba(120,100,70,${r() * 0.06})`;
    g.fillRect(0, i, S, 1);
    g.fillRect(i, 0, 1, S);
  }
  g.fillStyle = "rgba(167,91,58,0.85)";
  g.fillRect(0, S * 0.12, S, 10);
  g.fillRect(0, S * 0.12 + 18, S, 4);
  g.fillRect(0, S * 0.84, S, 10);
  g.fillRect(0, S * 0.84 - 14, S, 4);
  return finish(c);
}
