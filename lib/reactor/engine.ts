import { CARS, FRAG, VERT } from './shaders'
import { flask, lattice, makeRng, mesh, phone, stone, track, vortex } from './shapes'

/**
 * The reactor: one cloud of particles on a fixed WebGL2 canvas. Each section
 * of the page marked with [data-scene] owns a shape, and scrolling morphs the
 * cloud from one shape to the next. No library; the page stays readable and
 * complete without it.
 */

interface Scene {
  shape: number
  /** Where the shape sits on a wide viewport: -1 left, 0 centre, 1 right. */
  side: number
  scale: number
  pitch: number
  spin: number
  sway: number
  alpha: number
}

// Same order as the [data-scene] sections in app/page.tsx.
const SCENES: Scene[] = [
  { shape: 0, side: 1, scale: 1.0, pitch: 0.14, spin: 0.22, sway: 0, alpha: 1 },
  { shape: 1, side: -1, scale: 0.88, pitch: 0.42, spin: 0.1, sway: 0, alpha: 0.9 },
  { shape: 2, side: 1, scale: 1.0, pitch: 0.92, spin: 0.07, sway: 0, alpha: 1 },
  { shape: 3, side: -1, scale: 1.0, pitch: 0.0, spin: 0, sway: 0.38, alpha: 1 },
  { shape: 4, side: 1, scale: 0.95, pitch: 0.2, spin: 0.12, sway: 0, alpha: 1 },
  { shape: 6, side: -1, scale: 0.92, pitch: 0.16, spin: 0.14, sway: 0, alpha: 1 },
  { shape: 5, side: 1, scale: 0.95, pitch: 0.16, spin: 0, sway: 0, alpha: 1 },
  { shape: 0, side: 0, scale: 1.2, pitch: 0.14, spin: 0.16, sway: 0, alpha: 0.3 },
]

const FOV = (40 * Math.PI) / 180
const CAMERA = 5
const STACKED_BELOW = 960
const BACKGROUND = [0.012, 0.031, 0.024]

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'shader failed to compile')
  }
  return shader
}

function shuffle(data: Float32Array, rand: () => number) {
  const n = data.length / 4
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1)) * 4
    const o = i * 4
    for (let k = 0; k < 4; k++) {
      const t = data[o + k]
      data[o + k] = data[j + k]
      data[j + k] = t
    }
  }
}

export async function start(canvas: HTMLCanvasElement): Promise<() => void> {
  const noop = () => {}
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  })
  if (!gl) return noop

  const sections: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'))
  if (sections.length !== SCENES.length) return noop

  const root = document.documentElement
  const small = window.innerWidth < STACKED_BELOW || (navigator.hardwareConcurrency || 8) <= 4
  const N = small ? 42000 : 110000

  // The caption is drawn with the page's own typeface, so wait for it.
  const family = getComputedStyle(root).getPropertyValue('--font-manrope').trim() || 'system-ui, sans-serif'
  try {
    await Promise.race([
      document.fonts.load('800 66px ' + family),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ])
  } catch {
    // The system font draws the caption instead.
  }

  const rand = makeRng(20261123)
  const circuit = track(N, rand)
  const shapes = [flask(N, rand), lattice(N, rand), circuit.points, phone(N, rand, family), mesh(N, rand), vortex(N, rand), stone(N, rand)]
  const seeds = new Float32Array(N * 4)
  for (let i = 0; i < seeds.length; i++) seeds[i] = rand()

  let program: WebGLProgram
  try {
    program = gl.createProgram() as WebGLProgram
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link failed')
  } catch (error) {
    console.warn('[reactor] WebGL2 program unavailable, keeping the static page.', error)
    return noop
  }
  gl.useProgram(program)

  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const u = {
    mA: uniform('uMA'),
    mB: uniform('uMB'),
    vp: uniform('uVP'),
    idA: uniform('uIdA'),
    idB: uniform('uIdB'),
    mix: uniform('uMix'),
    time: uniform('uTime'),
    size: uniform('uSize'),
    alphaA: uniform('uAlphaA'),
    alphaB: uniform('uAlphaB'),
    halo: uniform('uHalo'),
    aspect: uniform('uAspect'),
    cars: uniform('uCars'),
    pointer: uniform('uPointer'),
    shock: uniform('uShock'),
  }

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buffers = shapes.map((data) => {
    shuffle(data, rand)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    return buffer
  })
  const seedBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(2)
  gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(0)
  gl.enableVertexAttribArray(1)

  gl.disable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  gl.clearColor(BACKGROUND[0], BACKGROUND[1], BACKGROUND[2], 1)

  // 22 cars: the player and 21 rivals, each a little slower than the last.
  const cars = new Float32Array(CARS)
  const skill = new Float32Array(CARS)
  for (let i = 0; i < CARS; i++) {
    cars[i] = (1.04 - i * 0.021) % 1
    skill[i] = i === 0 ? 1 : 0.995 - rand() * 0.07
  }

  let width = 1
  let height = 1
  let aspect = 1
  let stacked = false
  const vp = new Float32Array(16)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (w !== width || h !== height) {
      width = w
      height = h
      canvas.width = w
      canvas.height = h
    }
    gl!.viewport(0, 0, width, height)
    aspect = width / height
    stacked = window.innerWidth < STACKED_BELOW
    const f = 1 / Math.tan(FOV / 2)
    const near = 0.1
    const far = 50
    vp.fill(0)
    vp[0] = f / aspect
    vp[5] = f
    vp[10] = (far + near) / (near - far)
    vp[11] = -1
    vp[14] = vp[10] * -CAMERA + (2 * far * near) / (near - far)
    vp[15] = CAMERA
    gl!.uniformMatrix4fv(u.vp, false, vp)
    gl!.uniform1f(u.aspect, aspect)
    gl!.uniform1f(u.size, Math.max(1.3, (height / 900) * 1.75))
    dirty = true
  }

  function model(scene: Scene, time: number, out: Float32Array) {
    const halfH = CAMERA * Math.tan(FOV / 2)
    const halfW = halfH * aspect
    const side = stacked ? 0 : scene.side
    const room = side === 0 ? halfW : halfW * 0.5
    // Stacked, the shape lives in the clear band above the text panel.
    const s = scene.scale * Math.min(1, room / 1.35, stacked ? 0.56 : 1)
    const yaw = scene.spin * time + scene.sway * Math.sin(time * 0.5)
    const c = Math.cos(yaw)
    const sn = Math.sin(yaw)
    const cp = Math.cos(scene.pitch)
    const sp = Math.sin(scene.pitch)
    out[0] = c * s
    out[1] = sp * sn * s
    out[2] = -cp * sn * s
    out[3] = 0
    out[4] = 0
    out[5] = cp * s
    out[6] = sp * s
    out[7] = 0
    out[8] = sn * s
    out[9] = -sp * c * s
    out[10] = cp * c * s
    out[11] = 0
    out[12] = side * halfW * 0.5
    out[13] = stacked ? halfH * 0.44 : 0
    out[14] = 0
    out[15] = 1
  }

  // Scroll position as a continuous scene index: 2.5 is halfway from 2 to 3.
  function scrollTarget(): number {
    const vh = window.innerHeight
    const centre = vh / 2
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect()
      if (centre < rect.top && i === 0) return 0
      if (centre >= rect.top && centre < rect.bottom) {
        const band = Math.min(rect.height * 0.25, vh * 0.5)
        const y = centre - rect.top
        if (y < band && i > 0) return i - 0.5 + y / (2 * band)
        if (y > rect.height - band && i < sections.length - 1) return i + (y - (rect.height - band)) / (2 * band)
        return i
      }
    }
    return sections.length - 1
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const hudScene = document.querySelector('[data-hud-scene]')
  const hudCount = document.querySelector('[data-hud-count]')
  if (hudCount) hudCount.textContent = N.toLocaleString('en-US') + ' particles'

  let current = scrollTarget()
  let boundA = -1
  let boundB = -1
  let shown = -1
  let dirty = true
  let frame = 0
  let last = performance.now()
  let clock = 0
  let disposed = false

  const pointer = { x: 0, y: 0, strength: 0, wanted: 0, moved: 0 }
  const shock = { x: 0, y: 0, at: -10 }
  const mA = new Float32Array(16)
  const mB = new Float32Array(16)

  function bind(location: number, shape: number) {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffers[shape])
    gl!.vertexAttribPointer(location, 4, gl!.FLOAT, false, 0, 0)
  }

  function draw(now: number) {
    frame = 0
    if (disposed) return
    const calm = reduced.matches
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now

    const target = scrollTarget()
    if (calm) {
      // Calm version: one still frame per section, no flight and no drift.
      const snapped = Math.round(target)
      if (snapped !== current) dirty = true
      current = snapped
      clock = 12.3
    } else {
      current += (target - current) * (1 - Math.exp(-dt * 5))
      if (Math.abs(target - current) < 0.0005) current = target
      clock += dt
      for (let i = 0; i < CARS; i++) {
        const station = Math.floor(cars[i] * circuit.samples) % circuit.samples
        cars[i] = (cars[i] + circuit.speed[station] * skill[i] * dt) % 1
      }
      pointer.wanted = clock - pointer.moved < 0.6 ? 1 : pointer.wanted * 0.97
      pointer.strength += (pointer.wanted - pointer.strength) * 0.08
    }

    const a = Math.min(SCENES.length - 1, Math.max(0, Math.floor(current)))
    const b = Math.min(SCENES.length - 1, a + 1)
    const mix = Math.min(1, Math.max(0, current - a))
    const active = Math.round(current)
    if (active !== shown) {
      shown = active
      root.setAttribute('data-scene-active', String(active))
      if (hudScene) {
        hudScene.textContent = (active < 10 ? '0' : '') + active + ' / ' + (sections[active].getAttribute('data-scene') || '')
      }
    }

    if (!calm || dirty) {
      dirty = false
      if (a !== boundA) bind(0, SCENES[a].shape)
      if (b !== boundB) bind(1, SCENES[b].shape)
      boundA = a
      boundB = b
      model(SCENES[a], clock, mA)
      model(SCENES[b], clock, mB)
      const dim = stacked ? 0.8 : 1
      gl!.uniformMatrix4fv(u.mA, false, mA)
      gl!.uniformMatrix4fv(u.mB, false, mB)
      gl!.uniform1i(u.idA, SCENES[a].shape)
      gl!.uniform1i(u.idB, SCENES[b].shape)
      gl!.uniform1f(u.mix, mix)
      gl!.uniform1f(u.time, clock)
      gl!.uniform1f(u.alphaA, SCENES[a].alpha * dim)
      gl!.uniform1f(u.alphaB, SCENES[b].alpha * dim)
      gl!.uniform1fv(u.cars, cars)
      gl!.uniform3f(u.pointer, pointer.x, pointer.y, calm ? 0 : pointer.strength)
      const age = clock - shock.at
      gl!.uniform4f(u.shock, shock.x, shock.y, age * 1.5, calm ? 0 : Math.max(0, 1 - age / 1.5))
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.uniform1f(u.halo, 0)
      gl!.drawArrays(gl!.POINTS, 0, N)
      gl!.uniform1f(u.halo, 1)
      gl!.drawArrays(gl!.POINTS, 0, Math.floor(N * 0.1))
    }

    if (!document.hidden) frame = requestAnimationFrame(draw)
  }

  function wake() {
    if (!frame && !disposed && !document.hidden) {
      last = performance.now()
      frame = requestAnimationFrame(draw)
    }
  }

  function onPointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = 1 - (event.clientY / window.innerHeight) * 2
    pointer.moved = clock
  }
  function onPointerDown(event: PointerEvent) {
    shock.x = (event.clientX / window.innerWidth) * 2 - 1
    shock.y = 1 - (event.clientY / window.innerHeight) * 2
    shock.at = clock
  }
  function onResize() {
    resize()
    wake()
  }
  function onMotionChange() {
    dirty = true
    wake()
  }
  function onContextLost(event: Event) {
    event.preventDefault()
    dispose()
  }

  function dispose() {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(frame)
    root.classList.remove('gl')
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', wake)
    reduced.removeEventListener('change', onMotionChange)
    canvas.removeEventListener('webglcontextlost', onContextLost)
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', wake)
  reduced.addEventListener('change', onMotionChange)
  canvas.addEventListener('webglcontextlost', onContextLost)

  resize()
  root.classList.add('gl')
  wake()
  return dispose
}
