'use client'

import { useEffect, useRef } from 'react'
import {
  FORCE_MAX,
  LOAD_MAX,
  LOAD_MIN,
  PLOT,
  SLIP_MAX,
  curvePath,
  lateralForce,
  peakForce,
  plotX,
  plotY,
} from '@/lib/pacejka'

const START_SLIP = 6
const START_LOAD = 5
const REFERENCE_LOADS = [2, 5, 8]
const SLIP_TICKS = [0, 4, 8, 12, 16]
const FORCE_TICKS = [0, 4, 8, 12]

function readings(slip: number, load: number) {
  const force = lateralForce(slip, load)
  return {
    force,
    slipText: `${slip.toFixed(1)}°`,
    loadText: `${load.toFixed(1)} kN`,
    forceText: `${force.toFixed(2)} kN`,
    gripText: `${Math.round((force / peakForce(load)) * 100)}%`,
  }
}

/**
 * A working instrument: the lateral force curve of a tyre, recomputed in the
 * browser as the visitor changes slip angle and vertical load. The first
 * frame is rendered into the static HTML; scripting only makes it live.
 */
export function TyreLab() {
  const svg = useRef<SVGSVGElement>(null)
  const curve = useRef<SVGPathElement>(null)
  const marker = useRef<SVGCircleElement>(null)
  const drop = useRef<SVGLineElement>(null)
  const slipInput = useRef<HTMLInputElement>(null)
  const loadInput = useRef<HTMLInputElement>(null)
  const slipOut = useRef<HTMLElement>(null)
  const loadOut = useRef<HTMLElement>(null)
  const forceOut = useRef<HTMLElement>(null)
  const gripOut = useRef<HTMLElement>(null)
  const touched = useRef(false)

  function draw(slip: number, load: number) {
    const r = readings(slip, load)
    curve.current?.setAttribute('d', curvePath(load))
    const x = plotX(slip).toFixed(1)
    const y = plotY(r.force).toFixed(1)
    marker.current?.setAttribute('cx', x)
    marker.current?.setAttribute('cy', y)
    drop.current?.setAttribute('x1', x)
    drop.current?.setAttribute('x2', x)
    drop.current?.setAttribute('y1', y)
    if (slipOut.current) slipOut.current.textContent = r.slipText
    if (loadOut.current) loadOut.current.textContent = r.loadText
    if (forceOut.current) forceOut.current.textContent = r.forceText
    if (gripOut.current) gripOut.current.textContent = r.gripText
  }

  function redraw() {
    touched.current = true
    draw(Number(slipInput.current?.value ?? START_SLIP), Number(loadInput.current?.value ?? START_LOAD))
  }

  function followPointer(clientX: number) {
    const el = svg.current
    if (!el || !slipInput.current) return
    const box = el.getBoundingClientRect()
    const x = ((clientX - box.left) / box.width) * PLOT.width
    const slip = ((x - PLOT.left) / (PLOT.right - PLOT.left)) * SLIP_MAX
    slipInput.current.value = String(Math.min(SLIP_MAX, Math.max(0, slip)))
    redraw()
  }

  // Idle sweep of the slip angle until the visitor takes over. Skipped for
  // reduced motion and paused while the instrument is off screen.
  useEffect(() => {
    const el = svg.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false
    let origin = 0

    const tick = (now: number) => {
      if (touched.current || !visible) {
        frame = 0
        return
      }
      if (!origin) origin = now
      const slip = 8 + 7 * Math.sin(((now - origin) / 1000) * 0.45 - 0.29)
      if (slipInput.current) slipInput.current.value = String(slip)
      draw(slip, Number(loadInput.current?.value ?? START_LOAD))
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame && !touched.current) frame = requestAnimationFrame(tick)
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const first = readings(START_SLIP, START_LOAD)

  return (
    <figure className="lab">
      <svg
        ref={svg}
        className="lab-plot"
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        role="img"
        aria-label="Lateral tyre force against slip angle, for the selected vertical load"
        onPointerMove={(e) => {
          if (e.pointerType === 'mouse' || e.buttons) followPointer(e.clientX)
        }}
        onPointerDown={(e) => followPointer(e.clientX)}
      >
        {FORCE_TICKS.map((f) => (
          <g key={f}>
            <line className="lab-grid" x1={PLOT.left} x2={PLOT.right} y1={plotY(f)} y2={plotY(f)} />
            <text className="lab-tick" x={PLOT.left - 8} y={plotY(f) + 4} textAnchor="end">
              {f}
            </text>
          </g>
        ))}
        {SLIP_TICKS.map((s) => (
          <g key={s}>
            <line className="lab-grid" x1={plotX(s)} x2={plotX(s)} y1={PLOT.top} y2={PLOT.bottom} />
            <text className="lab-tick" x={plotX(s)} y={PLOT.bottom + 18} textAnchor="middle">
              {s}°
            </text>
          </g>
        ))}
        <text className="lab-axis" x={PLOT.right} y={PLOT.height - 4} textAnchor="end">
          slip angle
        </text>
        <text className="lab-axis" x={PLOT.left + 8} y={PLOT.top + 12}>
          lateral force, kN (max {FORCE_MAX})
        </text>
        {REFERENCE_LOADS.map((load) => (
          <path key={load} className="lab-ref" d={curvePath(load)} />
        ))}
        <path ref={curve} className="lab-curve" d={curvePath(START_LOAD)} />
        <line
          ref={drop}
          className="lab-drop"
          x1={plotX(START_SLIP).toFixed(1)}
          x2={plotX(START_SLIP).toFixed(1)}
          y1={plotY(first.force).toFixed(1)}
          y2={PLOT.bottom}
        />
        <circle
          ref={marker}
          className="lab-point"
          r="6"
          cx={plotX(START_SLIP).toFixed(1)}
          cy={plotY(first.force).toFixed(1)}
        />
      </svg>

      <dl className="lab-readout">
        <div>
          <dt>Slip angle</dt>
          <dd ref={slipOut}>{first.slipText}</dd>
        </div>
        <div>
          <dt>Vertical load</dt>
          <dd ref={loadOut}>{first.loadText}</dd>
        </div>
        <div>
          <dt>Lateral force</dt>
          <dd ref={forceOut} className="lab-live">
            {first.forceText}
          </dd>
        </div>
        <div>
          <dt>Of peak grip</dt>
          <dd ref={gripOut}>{first.gripText}</dd>
        </div>
      </dl>

      <div className="lab-controls">
        <label>
          <span>Slip angle</span>
          <input
            ref={slipInput}
            type="range"
            min={0}
            max={SLIP_MAX}
            step="any"
            defaultValue={START_SLIP}
            onInput={redraw}
          />
        </label>
        <label>
          <span>Vertical load</span>
          <input
            ref={loadInput}
            type="range"
            min={LOAD_MIN}
            max={LOAD_MAX}
            step={0.1}
            defaultValue={START_LOAD}
            onInput={redraw}
          />
        </label>
      </div>

      <figcaption>
        A live instrument, computed in your browser: Pacejka&apos;s tyre formula, the equation family behind
        the grip in our F1 simulator. Coefficients here are textbook values.
      </figcaption>
    </figure>
  )
}
