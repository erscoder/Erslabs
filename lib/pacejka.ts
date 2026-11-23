// Pacejka "Magic Formula" for lateral tyre force, with a simple load
// sensitivity. Coefficients are illustrative textbook values, not the tuning
// of any shipped simulator.

export const SLIP_MAX = 16 // degrees
export const FORCE_MAX = 14 // kN
export const LOAD_MIN = 2 // kN
export const LOAD_MAX = 8 // kN

const C = 1.65
const E = 0.35

/** Lateral force in kN for a slip angle in degrees and a vertical load in kN. */
export function lateralForce(slipDeg: number, loadKn: number): number {
  const stiffness = 12 - 0.4 * (loadKn - LOAD_MIN)
  const grip = 1.9 - 0.05 * (loadKn - LOAD_MIN)
  const x = stiffness * ((slipDeg * Math.PI) / 180)
  return grip * loadKn * Math.sin(C * Math.atan(x - E * (x - Math.atan(x))))
}

/** Peak lateral force in kN for a vertical load in kN. */
export function peakForce(loadKn: number): number {
  let peak = 0
  for (let slip = 0; slip <= SLIP_MAX; slip += 0.1) {
    peak = Math.max(peak, lateralForce(slip, loadKn))
  }
  return peak
}

// Plot geometry, in SVG user units.
export const PLOT = { width: 560, height: 352, left: 44, right: 548, top: 14, bottom: 312 }

export function plotX(slipDeg: number): number {
  return PLOT.left + (slipDeg / SLIP_MAX) * (PLOT.right - PLOT.left)
}

export function plotY(forceKn: number): number {
  return PLOT.bottom - (forceKn / FORCE_MAX) * (PLOT.bottom - PLOT.top)
}

/** SVG path of the force curve for one vertical load. */
export function curvePath(loadKn: number): string {
  let d = ''
  for (let slip = 0; slip <= SLIP_MAX + 1e-9; slip += 0.25) {
    const x = plotX(slip).toFixed(1)
    const y = plotY(lateralForce(slip, loadKn)).toFixed(1)
    d += `${d ? 'L' : 'M'}${x} ${y}`
  }
  return d
}
