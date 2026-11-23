/**
 * Target shapes for the particle reactor. Every shape is a Float32Array of
 * N * 4 floats: xyz, plus w = kind + param * 0.99, which the vertex shader
 * decodes to animate each family of particles (liquid, bubbles, cars...).
 */

export type Rng = () => number

export function makeRng(seed: number): Rng {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const pack = (kind: number, param: number) => kind + Math.min(Math.max(param, 0), 1) * 0.99

function put(out: Float32Array, i: number, x: number, y: number, z: number, w: number) {
  const o = i * 4
  out[o] = x
  out[o + 1] = y
  out[o + 2] = z
  out[o + 3] = w
}

/* ---------- 0. The flask from the logo, as a solid of revolution ---------- */

// Radius of the flask at a height given in the logo's own units (y 38 to 138).
// The vertex shader carries the same profile to keep the bubbles inside.
export function flaskRadius(y: number): number {
  if (y < 42) return 15
  if (y < 66) return 13
  if (y < 124) return 13 + ((y - 66) / 58) * 31
  const k = (y - 124) / 14
  return 44 * Math.sqrt(Math.max(0, 1 - 0.7 * k * k))
}

const FLASK_UNIT = 0.024
const flaskY = (y: number) => (88 - y) * FLASK_UNIT

export function flask(n: number, rand: Rng): Float32Array {
  const out = new Float32Array(n * 4)
  const glass = Math.floor(n * 0.34)
  const liquid = Math.floor(n * 0.54)
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2
    if (i < glass) {
      if (rand() < 0.12) {
        const r = Math.sqrt(rand()) * flaskRadius(138) * FLASK_UNIT
        put(out, i, r * Math.cos(a), flaskY(138), r * Math.sin(a), pack(0, rand()))
      } else {
        let y = 38
        for (let tries = 0; tries < 40; tries++) {
          y = 38 + rand() * 100
          if (rand() * 44 < flaskRadius(y)) break
        }
        const r = flaskRadius(y) * FLASK_UNIT
        put(out, i, r * Math.cos(a), flaskY(y), r * Math.sin(a), pack(0, rand()))
      }
    } else if (i < glass + liquid) {
      let y = 100
      if (rand() > 0.16) {
        for (let tries = 0; tries < 40; tries++) {
          y = 100 + rand() * 37
          const rr = flaskRadius(y)
          if (rand() * 44 * 44 < rr * rr) break
        }
      }
      const r = flaskRadius(y) * 0.96 * Math.sqrt(rand()) * FLASK_UNIT
      put(out, i, r * Math.cos(a), flaskY(y), r * Math.sin(a), pack(1, (y - 100) / 37))
    } else {
      // Bubbles: the shader computes their path from (angle, phase, radius).
      put(out, i, a, rand(), rand(), pack(2, rand()))
    }
  }
  return out
}

/* ---------- 1. A crystal lattice: the liquid takes a structure ---------- */

export function lattice(n: number, rand: Rng): Float32Array {
  const out = new Float32Array(n * 4)
  const g = 22
  const total = g * g * g
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(rand() * total)
    const ix = idx % g
    const iy = Math.floor(idx / g) % g
    const iz = Math.floor(idx / (g * g))
    const j = 0.006
    put(
      out,
      i,
      (ix / (g - 1) - 0.5) * 1.9 + (rand() - 0.5) * j,
      (iy / (g - 1) - 0.5) * 1.9 + (rand() - 0.5) * j,
      (iz / (g - 1) - 0.5) * 1.9 + (rand() - 0.5) * j,
      pack(0, rand()),
    )
  }
  return out
}

/* ---------- 2. A circuit on scanned terrain, with a lap simulation ---------- */

export interface Track {
  points: Float32Array
  /** Speed at each of `samples` stations, in lap fractions per second. */
  speed: Float32Array
  samples: number
}

const terrainHeight = (x: number, z: number) =>
  0.1 * Math.sin(x * 1.7 + 0.5) * Math.cos(z * 2.1) + 0.06 * Math.sin(x * 3.1 + z * 2.3)

// A fictional circuit: one long straight, a hairpin, a chicane and esses.
const CONTROL: number[][] = [
  [-1.2, -0.72],
  [0.0, -0.74],
  [0.9, -0.72],
  [1.4, -0.5],
  [1.45, 0.0],
  [1.1, 0.34],
  [0.62, 0.24],
  [0.3, 0.5],
  [0.46, 0.86],
  [0.0, 1.0],
  [-0.5, 0.8],
  [-0.7, 0.4],
  [-1.02, 0.46],
  [-1.45, 0.3],
  [-1.52, -0.1],
  [-1.38, -0.52],
]

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  const t3 = t2 * t
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
}

export function track(n: number, rand: Rng): Track {
  const M = 2048
  const c = CONTROL.length
  // Dense polyline, then resampled so stations are evenly spaced by arc length.
  const D = 4096
  const dx = new Float32Array(D + 1)
  const dz = new Float32Array(D + 1)
  const acc = new Float32Array(D + 1)
  for (let i = 0; i <= D; i++) {
    const s = (i / D) * c
    const k = Math.floor(s) % c
    const t = s - Math.floor(s)
    const p0 = CONTROL[(k + c - 1) % c]
    const p1 = CONTROL[k]
    const p2 = CONTROL[(k + 1) % c]
    const p3 = CONTROL[(k + 2) % c]
    dx[i] = catmull(p0[0], p1[0], p2[0], p3[0], t)
    dz[i] = catmull(p0[1], p1[1], p2[1], p3[1], t)
    acc[i] = i === 0 ? 0 : acc[i - 1] + Math.hypot(dx[i] - dx[i - 1], dz[i] - dz[i - 1])
  }
  const length = acc[D]
  const cx = new Float32Array(M)
  const cz = new Float32Array(M)
  let j = 0
  for (let i = 0; i < M; i++) {
    const target = (i / M) * length
    while (j < D - 1 && acc[j + 1] < target) j++
    const span = acc[j + 1] - acc[j] || 1
    const t = (target - acc[j]) / span
    cx[i] = dx[j] + (dx[j + 1] - dx[j]) * t
    cz[i] = dz[j] + (dz[j + 1] - dz[j]) * t
  }

  // Quasi-steady-state lap simulation: corner speed from curvature, then a
  // forward pass limited by traction and a backward pass limited by braking.
  const ds = length / M
  const vTop = 1.25
  const aLat = 1.5
  const aAccel = 0.55
  const aBrake = 1.7
  const v = new Float32Array(M)
  for (let i = 0; i < M; i++) {
    const a = (i + M - 6) % M
    const b = (i + 6) % M
    const h1 = Math.atan2(cz[i] - cz[a], cx[i] - cx[a])
    const h2 = Math.atan2(cz[b] - cz[i], cx[b] - cx[i])
    let dh = h2 - h1
    while (dh > Math.PI) dh -= Math.PI * 2
    while (dh < -Math.PI) dh += Math.PI * 2
    const kappa = Math.abs(dh) / (6 * ds)
    v[i] = Math.min(vTop, Math.sqrt(aLat / Math.max(kappa, 1e-4)))
  }
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < M; i++) {
      const nx = (i + 1) % M
      v[nx] = Math.min(v[nx], Math.sqrt(v[i] * v[i] + 2 * aAccel * ds))
    }
    for (let i = M - 1; i >= 0; i--) {
      const nx = (i + 1) % M
      v[i] = Math.min(v[i], Math.sqrt(v[nx] * v[nx] + 2 * aBrake * ds))
    }
  }
  const speed = new Float32Array(M)
  for (let i = 0; i < M; i++) speed[i] = v[i] / length

  const out = new Float32Array(n * 4)
  const onTrack = Math.floor(n * 0.56)
  const half = 0.05
  for (let i = 0; i < n; i++) {
    if (i < onTrack) {
      const u = rand()
      const s = Math.floor(u * M) % M
      const nx = (s + 1) % M
      let tx = cx[nx] - cx[s]
      let tz = cz[nx] - cz[s]
      const tl = Math.hypot(tx, tz) || 1
      tx /= tl
      tz /= tl
      const edge = rand() < 0.3
      const lat = edge ? (rand() < 0.5 ? -half : half) : (rand() * 2 - 1) * half
      const x = cx[s] - tz * lat
      const z = cz[s] + tx * lat
      put(out, i, x, terrainHeight(cx[s], cz[s]) + 0.012, z, pack(edge ? 2 : 0, u))
    } else {
      // Terrain as scan lines, the way an elevation survey reads.
      const row = Math.floor(rand() * 54)
      const z = -1.3 + (row / 53) * 2.6
      const x = (rand() * 2 - 1) * 1.85
      put(out, i, x, terrainHeight(x, z) - 0.02, z, pack(1, rand()))
    }
  }
  return { points: out, speed, samples: M }
}

/* ---------- 3. A phone: a waveform on top, captions written below ---------- */

function roundedRect(t: number, hw: number, hh: number, r: number): [number, number] {
  const sx = 2 * (hw - r)
  const sy = 2 * (hh - r)
  const arc = (Math.PI / 2) * r
  const per = 2 * sx + 2 * sy + 4 * arc
  let d = t * per
  const corner = (cx: number, cy: number, a0: number, dist: number): [number, number] => {
    const a = a0 + dist / r
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  if (d < sx) return [-hw + r + d, hh]
  d -= sx
  if (d < arc) return corner(hw - r, hh - r, Math.PI / 2, -d)
  d -= arc
  if (d < sy) return [hw, hh - r - d]
  d -= sy
  if (d < arc) return corner(hw - r, -hh + r, 0, -d)
  d -= arc
  if (d < sx) return [hw - r - d, -hh]
  d -= sx
  if (d < arc) return corner(-hw + r, -hh + r, -Math.PI / 2, -d)
  d -= arc
  if (d < sy) return [-hw, -hh + r + d]
  d -= sy
  return corner(-hw + r, hh - r, Math.PI, -d)
}

export const CAPTION_LINES = [['NO', 'AUDIO'], ['LEAVES'], ['THE', 'PHONE']]

/** Rasterises the caption and returns, per word, the pixels that are inked. */
function captionPixels(fontFamily: string): number[][] {
  const W = 420
  const H = 300
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const words: number[][] = []
  if (!ctx) return words
  ctx.textBaseline = 'middle'
  ctx.font = '800 66px ' + fontFamily
  const gap = ctx.measureText(' ').width
  let wi = 0
  for (let l = 0; l < CAPTION_LINES.length; l++) {
    const line = CAPTION_LINES[l]
    let width = 0
    for (let k = 0; k < line.length; k++) width += ctx.measureText(line[k]).width + (k ? gap : 0)
    let x = (W - width) / 2
    for (let k = 0; k < line.length; k++) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#fff'
      ctx.fillText(line[k], x, 52 + l * 96)
      x += ctx.measureText(line[k]).width + gap
      const data = ctx.getImageData(0, 0, W, H).data
      const pts: number[] = []
      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          if (data[(py * W + px) * 4 + 3] > 120) pts.push(px / W - 0.5, 0.5 - py / H)
        }
      }
      words[wi++] = pts
    }
  }
  return words
}

export function phone(n: number, rand: Rng, fontFamily: string): Float32Array {
  const out = new Float32Array(n * 4)
  const frame = Math.floor(n * 0.2)
  const wave = Math.floor(n * 0.27)
  const words = captionPixels(fontFamily)
  let inked = 0
  for (let k = 0; k < words.length; k++) inked += words[k].length / 2
  for (let i = 0; i < n; i++) {
    if (i < frame) {
      if (rand() < 0.06) {
        put(out, i, (rand() - 0.5) * 0.2, 0.98, 0, pack(0, rand()))
      } else {
        const p = roundedRect(rand(), 0.56, 1.1, 0.15)
        const j = 1 + (rand() - 0.5) * 0.025
        put(out, i, p[0] * j, p[1] * j, (rand() - 0.5) * 0.05, pack(0, rand()))
      }
    } else if (i < frame + wave || inked === 0) {
      const bar = Math.floor(rand() * 40)
      put(out, i, -0.4 + (bar / 39) * 0.8, rand() * 2 - 1, (rand() - 0.5) * 0.02, pack(1, bar / 40))
    } else {
      let pick = Math.floor(rand() * inked)
      let w = 0
      while (w < words.length - 1 && pick >= words[w].length / 2) {
        pick -= words[w].length / 2
        w++
      }
      const pts = words[w]
      const o = Math.min(pick, pts.length / 2 - 1) * 2
      put(
        out,
        i,
        pts[o] * 0.98 + (rand() - 0.5) * 0.004,
        -0.42 + pts[o + 1] * 0.98 * (300 / 420) + (rand() - 0.5) * 0.004,
        (rand() - 0.5) * 0.02,
        pack(2, w / 8),
      )
    }
  }
  return out
}

/* ---------- 4. A coordinator and a peer-to-peer mesh ---------- */

export function mesh(n: number, rand: Rng): Float32Array {
  const out = new Float32Array(n * 4)
  const count = 30
  const nx: number[] = [0]
  const ny: number[] = [0]
  const nz: number[] = [0]
  const nr: number[] = [0.15]
  for (let i = 1; i < count; i++) {
    const y = 1 - (2 * (i - 0.5)) / (count - 1)
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const a = i * 2.39996
    const rad = 0.78 + rand() * 0.5
    nx.push(Math.cos(a) * ring * rad)
    ny.push(y * rad)
    nz.push(Math.sin(a) * ring * rad)
    nr.push(0.04 + rand() * 0.035)
  }
  const seen: { [key: string]: boolean } = {}
  const ea: number[] = []
  const eb: number[] = []
  const link = (a: number, b: number) => {
    const key = a < b ? a + '-' + b : b + '-' + a
    if (a === b || seen[key]) return
    seen[key] = true
    ea.push(a)
    eb.push(b)
  }
  for (let i = 1; i < count; i++) {
    const order: number[] = []
    for (let k = 1; k < count; k++) if (k !== i) order.push(k)
    order.sort(
      (p, q) =>
        Math.hypot(nx[p] - nx[i], ny[p] - ny[i], nz[p] - nz[i]) -
        Math.hypot(nx[q] - nx[i], ny[q] - ny[i], nz[q] - nz[i]),
    )
    link(i, order[0])
    link(i, order[1])
    if (i % 4 === 1) link(0, i)
  }
  const lengths: number[] = []
  let totalLength = 0
  for (let e = 0; e < ea.length; e++) {
    const l = Math.hypot(nx[ea[e]] - nx[eb[e]], ny[ea[e]] - ny[eb[e]], nz[ea[e]] - nz[eb[e]])
    lengths.push(l)
    totalLength += l
  }
  const phases: number[] = []
  for (let e = 0; e < ea.length; e++) phases.push(rand())

  const nodes = Math.floor(n * 0.36)
  for (let i = 0; i < n; i++) {
    if (i < nodes) {
      // The coordinator takes a fifth of the node particles.
      const k = rand() < 0.2 ? 0 : 1 + Math.floor(rand() * (count - 1))
      const y = rand() * 2 - 1
      const a = rand() * Math.PI * 2
      const ring = Math.sqrt(1 - y * y)
      const r = nr[k] * (k === 0 ? Math.cbrt(rand()) : 1)
      put(out, i, nx[k] + r * ring * Math.cos(a), ny[k] + r * y, nz[k] + r * ring * Math.sin(a), pack(0, rand()))
    } else {
      let pick = rand() * totalLength
      let e = 0
      while (e < ea.length - 1 && pick > lengths[e]) {
        pick -= lengths[e]
        e++
      }
      const t = rand()
      const a = ea[e]
      const b = eb[e]
      const j = 0.006
      put(
        out,
        i,
        nx[a] + (nx[b] - nx[a]) * t + (rand() - 0.5) * j,
        ny[a] + (ny[b] - ny[a]) * t + (rand() - 0.5) * j,
        nz[a] + (nz[b] - nz[a]) * t + (rand() - 0.5) * j,
        pack(1, (Math.floor(t * 49) + 0.1 + phases[e] * 0.8) / 50),
      )
    }
  }
  return out
}

/* ---------- 5. A vortex that narrows into one line: the process ---------- */

export function vortex(n: number, rand: Rng): Float32Array {
  const out = new Float32Array(n * 4)
  // The shader builds the path; these are only its per-particle parameters.
  for (let i = 0; i < n; i++) put(out, i, rand() * Math.PI * 2, rand(), rand(), pack(0, rand()))
  return out
}
