import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import worldMapUrl from '../assets/world-map.png'

const RED_RGB = { r: 217, g: 33, b: 33 }
const GRID_RGBA = 'rgba(217, 33, 33, 0.22)'
const OUTLINE_RGBA = 'rgba(217, 33, 33, 0.9)'

const THETA_MIN = -1.15
const THETA_MAX = 1.15

type Vec3 = [number, number, number]

function sphereFromLatLng(lat: number, lng: number): Vec3 {
  return [Math.cos(lat) * Math.sin(lng), Math.sin(lat), Math.cos(lat) * Math.cos(lng)]
}

function rotate([x, y, z]: Vec3, phi: number, theta: number): Vec3 {
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const x1 = x * cosPhi + z * sinPhi
  const z1 = -x * sinPhi + z * cosPhi
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const y2 = y * cosT - z1 * sinT
  const z2 = y * sinT + z1 * cosT
  return [x1, y2, z2]
}

async function loadLandPoints(): Promise<Vec3[]> {
  const img = new Image()
  img.src = worldMapUrl
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height)

  const points: Vec3[] = []
  const strideX = 2
  const strideY = 2
  for (let py = 0; py < height; py += strideY) {
    for (let px = 0; px < width; px += strideX) {
      const idx = (py * width + px) * 4
      const brightness = data[idx]
      if (brightness < 140) continue // land pixels are bright in this texture
      const lng = (px / width) * Math.PI * 2 - Math.PI
      const lat = Math.PI / 2 - (py / height) * Math.PI
      points.push(sphereFromLatLng(lat, lng))
    }
  }
  return points
}

function buildGridCircles(): Vec3[][] {
  const circles: Vec3[][] = []
  const steps = 64

  for (let m = 0; m < 6; m++) {
    const lng = (m / 6) * Math.PI * 2 - Math.PI
    const pts: Vec3[] = []
    for (let i = 0; i <= steps; i++) {
      const lat = (i / steps) * Math.PI - Math.PI / 2
      pts.push(sphereFromLatLng(lat, lng))
    }
    circles.push(pts)
  }

  for (let p = 1; p < 5; p++) {
    const lat = (p / 5) * Math.PI - Math.PI / 2
    const pts: Vec3[] = []
    for (let i = 0; i <= steps; i++) {
      const lng = (i / steps) * Math.PI * 2 - Math.PI
      pts.push(sphereFromLatLng(lat, lng))
    }
    circles.push(pts)
  }

  return circles
}

const GRID_CIRCLES = buildGridCircles()

export default function Globe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const landPoints = useRef<Vec3[]>([])

  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const rotation = useRef({ phi: 0, theta: 0.35 })
  const isPausedRef = useRef(false)

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    isPausedRef.current = true
    if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return
    dragOffset.current = {
      phi: (e.clientX - pointerInteracting.current.x) / 150,
      theta: (e.clientY - pointerInteracting.current.y) / 150,
    }
    const now = Date.now()
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1)
      const max = 0.12
      velocity.current = {
        phi: Math.max(-max, Math.min(max, ((e.clientX - lastPointer.current.x) / dt) * 0.25)),
        theta: Math.max(-max, Math.min(max, ((e.clientY - lastPointer.current.y) / dt) * 0.25)),
      }
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
  }, [])

  const onPointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      rotation.current = {
        phi: rotation.current.phi + dragOffset.current.phi,
        theta: Math.max(THETA_MIN, Math.min(THETA_MAX, rotation.current.theta + dragOffset.current.theta)),
      }
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    isPausedRef.current = false
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
  }, [])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  useEffect(() => {
    let destroyed = false
    let animationId: number | null = null
    let inView = false

    loadLandPoints().then((pts) => {
      if (destroyed) return
      landPoints.current = pts
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas || destroyed || !inView) {
        animationId = null
        return
      }
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const size = canvas.clientWidth
      if (canvas.width !== size * dpr) {
        canvas.width = size * dpr
        canvas.height = size * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)

      if (!isPausedRef.current) {
        rotation.current.phi += 0.0028
        if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
          rotation.current.phi += velocity.current.phi
          rotation.current.theta = Math.max(
            THETA_MIN,
            Math.min(THETA_MAX, rotation.current.theta + velocity.current.theta)
          )
          velocity.current.phi *= 0.95
          velocity.current.theta *= 0.95
        }
      }

      const phi = rotation.current.phi + dragOffset.current.phi
      const theta = Math.max(THETA_MIN, Math.min(THETA_MAX, rotation.current.theta + dragOffset.current.theta))

      const cx = size / 2
      const cy = size / 2
      const R = size / 2 - 2

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = OUTLINE_RGBA
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.strokeStyle = GRID_RGBA
      ctx.lineWidth = 0.75
      for (const circle of GRID_CIRCLES) {
        ctx.beginPath()
        let drawing = false
        for (const pt of circle) {
          const [x, y, z] = rotate(pt, phi, theta)
          if (z <= 0.02) {
            drawing = false
            continue
          }
          const sx = cx + x * R
          const sy = cy - y * R
          if (!drawing) {
            ctx.moveTo(sx, sy)
            drawing = true
          } else {
            ctx.lineTo(sx, sy)
          }
        }
        ctx.stroke()
      }

      for (const pt of landPoints.current) {
        const [x, y, z] = rotate(pt, phi, theta)
        if (z <= 0.03) continue
        const sx = cx + x * R
        const sy = cy - y * R
        const shade = 0.55 + 0.45 * z
        const r = 1.1 + 0.9 * z
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${RED_RGB.r}, ${RED_RGB.g}, ${RED_RGB.b}, ${shade})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const startDrawing = () => {
      if (animationId === null) animationId = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) startDrawing()
      },
      { threshold: 0.01 },
    )
    if (wrapRef.current) io.observe(wrapRef.current)

    return () => {
      destroyed = true
      io.disconnect()
      if (animationId !== null) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      data-cursor="DRAG"
      className={`aspect-square select-none touch-none ${className}`}
      style={{ cursor: 'grab' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  )
}
