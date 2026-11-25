export const CARS = 22

export const VERT = `#version 300 es
precision highp float;

layout(location = 0) in vec4 aA;
layout(location = 1) in vec4 aB;
layout(location = 2) in vec4 aSeed;

uniform mat4 uMA;
uniform mat4 uMB;
uniform mat4 uVP;
uniform int uIdA;
uniform int uIdB;
uniform float uMix;
uniform float uTime;
uniform float uSize;
uniform float uAlphaA;
uniform float uAlphaB;
uniform float uHalo;
uniform float uAspect;
uniform float uCars[${CARS}];
uniform vec3 uPointer;
uniform vec4 uShock;

out float vGlow;
out float vAlpha;
out float vHot;

float flaskR(float y) {
  if (y < 42.0) return 15.0;
  if (y < 66.0) return 13.0;
  if (y < 124.0) return 13.0 + (y - 66.0) / 58.0 * 31.0;
  float k = (y - 124.0) / 14.0;
  return 44.0 * sqrt(max(0.0, 1.0 - 0.7 * k * k));
}

vec3 shape(int id, vec4 p, vec4 sd, out float glow, out float alpha, out float hot) {
  float k = floor(p.w + 1e-4);
  float f = fract(p.w + 1e-4) / 0.99;
  vec3 q = p.xyz;
  glow = 0.5;
  alpha = 1.0;
  hot = 0.0;

  if (id == 0) {
    // The flask: glass, liquid, bubbles.
    if (k < 0.5) {
      glow = 0.22 + 0.25 * sd.y;
      alpha = 0.5;
    } else if (k < 1.5) {
      float s = 1.0 - f;
      q.y += (sin(q.x * 5.0 + uTime * 1.4) + sin(q.z * 6.0 - uTime * 1.1)) * 0.02 * s * s;
      glow = 0.4 + 0.8 * s * s * s;
      alpha = 0.5;
    } else {
      float ph = fract(p.y + uTime * (0.035 + 0.06 * f));
      float yl = mix(134.0, 8.0, ph);
      float r = flaskR(clamp(yl, 42.0, 138.0)) * 0.024 * 0.62 * p.z + max(0.0, 40.0 - yl) * 0.006 * p.z;
      float a = p.x + sin(uTime * 0.8 + p.y * 30.0) * 0.5;
      q = vec3(r * cos(a), (88.0 - yl) * 0.024, r * sin(a));
      glow = 1.25;
      alpha = smoothstep(0.0, 0.05, ph) * (1.0 - smoothstep(0.72, 1.0, ph));
    }
  } else if (id == 1) {
    // The lattice: planes of light sweep through a crystal.
    q *= 1.0 + 0.03 * sin(uTime * 0.9 + length(q) * 5.0);
    float s = fract((q.x + q.y + q.z) * 0.3 - uTime * 0.12);
    float s2 = fract((q.x - q.z) * 0.22 + uTime * 0.07);
    glow = 0.22 + 1.5 * smoothstep(0.88, 1.0, s) + 0.7 * smoothstep(0.94, 1.0, s2);
    alpha = 0.7;
  } else if (id == 2) {
    // The circuit: 22 cars leave a trail on the racing surface.
    if (k < 0.5) {
      float g = 0.0;
      for (int i = 0; i < ${CARS}; i++) {
        float d = fract(uCars[i] - f);
        float car = exp(-d * 420.0) + 0.3 * exp(-d * 55.0);
        g += car;
        if (i == 0) hot = min(1.0, car);
      }
      g = min(g, 1.0);
      glow = 0.2 + g * 0.95;
      alpha = 0.1 + g * 0.75;
    } else if (k < 1.5) {
      float s = fract(q.x * 0.25 - uTime * 0.07);
      glow = 0.1 + 0.12 * sd.x + smoothstep(0.975, 1.0, s) * 1.2;
      alpha = 0.45;
    } else {
      // Kerbs: the outline of the circuit.
      glow = 0.75;
      alpha = 0.5;
    }
  } else if (id == 3) {
    // The phone: a waveform above, captions written word by word below.
    if (k < 0.5) {
      glow = 0.5;
      alpha = 0.28;
    } else if (k < 1.5) {
      float amp = 0.04 + 0.27 * abs(sin(f * 9.0 + uTime * 2.1) * sin(f * 23.0 - uTime * 1.3));
      q.y = 0.48 + p.y * amp;
      glow = 0.55 + 0.6 * (1.0 - abs(p.y));
      alpha = 0.32;
    } else {
      float wi = floor(f * 8.0 + 0.5);
      float cur = floor(mod(uTime * 1.6, 8.0));
      if (wi < cur) {
        glow = 0.7;
        alpha = 0.22;
      } else if (wi == cur) {
        glow = 1.25;
        alpha = 0.42;
      } else {
        glow = 0.1;
        alpha = 0.16;
      }
    }
  } else if (id == 4) {
    // The mesh: packets travel the edges between peers.
    if (k < 0.5) {
      glow = 0.6 + 0.4 * sin(uTime * 1.7 + f * 40.0);
      alpha = 0.3;
    } else {
      float v = f * 50.0;
      float t = floor(v) / 49.0;
      float ph = fract(v);
      float pulse = smoothstep(0.9, 1.0, fract(t * 0.55 + ph * 5.0 - uTime * 0.28));
      glow = 0.16 + pulse * 1.9;
      hot = pulse * 0.25;
      alpha = 0.2 + pulse * 0.7;
    }
  } else if (id == 5) {
    // The vortex: a wide, uncertain cloud narrows into one line.
    float h = fract(p.y + uTime * 0.03 * (0.6 + 0.8 * f));
    float arm = floor(p.x * 3.0 / 6.2831853) * 2.0943951;
    float open = pow(1.0 - h, 1.6);
    float rad = (1.15 * open + 0.012) * (1.0 + (p.z - 0.5) * 0.55 * (1.0 - h));
    float ang = arm + h * 15.0 - uTime * 0.25 + (sd.z - 0.5) * 1.5 * (1.0 - h);
    q = vec3(rad * cos(ang), -1.3 + 2.7 * h, rad * sin(ang));
    float ring = 0.0;
    for (int i = 0; i < 4; i++) {
      float c = 0.1 + float(i) * 0.265;
      ring += exp(-pow((h - c) * 55.0, 2.0));
    }
    glow = 0.25 + 0.9 * h * h + ring * 1.4;
    alpha = (0.55 + ring * 0.45) * smoothstep(0.0, 0.04, h) * (1.0 - smoothstep(0.96, 1.0, h));
  } else {
    // The stone: a reading line descends through the layers of one signature.
    float line = 1.2 - fract(uTime * 0.11) * 1.4;
    float sweep = exp(-pow((f - line) * 16.0, 2.0));
    float band = mod(floor(f * 11.25 + 0.01), 2.0);
    float base = k < 0.5 ? 0.2 + 0.1 * band : (k < 1.5 ? 0.42 : 1.2);
    glow = base + sweep * 1.5;
    hot = sweep * 0.2;
    alpha = 0.45 + sweep * 0.5;
  }
  return q;
}

void main() {
  float ga, aa, ha, gb, ab, hb;
  vec3 pa = (uMA * vec4(shape(uIdA, aA, aSeed, ga, aa, ha), 1.0)).xyz;
  vec3 pb = pa;
  gb = ga; ab = aa; hb = ha;
  float e = 0.0;
  if (uMix > 0.0) {
    pb = (uMB * vec4(shape(uIdB, aB, aSeed, gb, ab, hb), 1.0)).xyz;
    // Each particle leaves and lands on its own schedule.
    e = smoothstep(0.0, 1.0, clamp(uMix * 1.7 - aSeed.x * 0.7, 0.0, 1.0));
  }
  float flight = sin(e * 3.14159265);
  vec3 world = mix(pa, pb, e);
  world += flight * 0.6 * vec3(
    sin(aSeed.y * 40.0 + uTime * 0.7 + world.y * 2.0),
    cos(aSeed.z * 37.0 + uTime * 0.6 + world.x * 2.0),
    sin(aSeed.w * 31.0 + uTime * 0.8 + world.z * 2.0)
  );

  float glow = mix(ga, gb, e) + flight * 0.5;
  float alpha = mix(aa * uAlphaA, ab * uAlphaB, e);
  float hot = mix(ha, hb, e);

  vec4 clip = uVP * vec4(world, 1.0);
  vec2 ndc = clip.xy / clip.w;
  vec2 asp = vec2(uAspect, 1.0);

  // The cursor stirs the liquid.
  vec2 d = (ndc - uPointer.xy) * asp;
  float push = uPointer.z * exp(-dot(d, d) * 9.0);
  vec2 dir = normalize(d + vec2(1e-5));
  ndc += (dir * 0.2 + vec2(-dir.y, dir.x) * 0.12) * push / asp;

  // A click sends a ring through it.
  vec2 ds = (ndc - uShock.xy) * asp;
  float ring = exp(-pow((length(ds) - uShock.z) * 6.0, 2.0)) * uShock.w;
  ndc += normalize(ds + vec2(1e-5)) * ring * 0.1 / asp;
  glow += ring * 1.6 + push * 0.5;

  gl_Position = vec4(ndc * clip.w, clip.z, clip.w);
  float size = uSize * (0.55 + aSeed.w * 0.9) * (1.0 + glow * 0.45) * (5.0 / clip.w);
  gl_PointSize = mix(size, size * 7.0, uHalo);
  vGlow = glow;
  vAlpha = alpha * mix(1.0, 0.045, uHalo);
  vHot = hot;
}
`

export const FRAG = `#version 300 es
precision mediump float;

in float vGlow;
in float vAlpha;
in float vHot;
out vec4 color;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float a = smoothstep(0.25, 0.0, d);
  vec3 deep = vec3(0.016, 0.30, 0.22);
  vec3 brand = vec3(0.063, 0.725, 0.506);
  vec3 mint = vec3(0.80, 1.0, 0.92);
  vec3 col = mix(deep, brand, clamp(vGlow, 0.0, 1.0));
  col = mix(col, mint, clamp(vGlow - 1.0, 0.0, 1.0) * 0.8);
  col = mix(col, vec3(1.0), clamp(vHot, 0.0, 1.0));
  color = vec4(col * a * vAlpha, 1.0);
}
`
