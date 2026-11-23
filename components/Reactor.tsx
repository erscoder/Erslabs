'use client'

import { useEffect, useRef } from 'react'

/**
 * Mounts the particle reactor behind the page. The engine is a separate chunk
 * fetched when the browser is idle, so it never delays the first paint, and
 * the page is complete without it.
 */
export function Reactor() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let dispose: (() => void) | undefined
    let cancelled = false

    const load = () => {
      import('@/lib/reactor/engine')
        .then((engine) => engine.start(canvas))
        .then((stop) => {
          if (cancelled) stop()
          else dispose = stop
        })
        .catch(() => {})
    }
    // Safari has no requestIdleCallback.
    const idle = typeof window.requestIdleCallback === 'function'
    const handle = idle ? window.requestIdleCallback(load, { timeout: 1200 }) : window.setTimeout(load, 200)

    return () => {
      cancelled = true
      if (idle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
      if (dispose) dispose()
    }
  }, [])

  return <canvas ref={ref} className="reactor" aria-hidden="true" />
}
