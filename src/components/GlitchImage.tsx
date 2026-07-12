import { useEffect, useRef, useState } from 'react'
import { useCanHover } from '../lib/useCanHover'

interface CoverRect {
  sx: number
  sy: number
  sWidth: number
  sHeight: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

// focalX (0-1) is where the subject sits horizontally in the source image.
// Only matters when the image ends up cropped on its sides (portrait boxes).
function computeCoverRect(imgW: number, imgH: number, boxW: number, boxH: number, focalX = 0.5): CoverRect {
  const imgAspect = imgW / imgH
  const boxAspect = boxW / boxH
  if (imgAspect > boxAspect) {
    const sHeight = imgH
    const sWidth = imgH * boxAspect
    const sx = clamp(focalX * imgW - sWidth / 2, 0, imgW - sWidth)
    return { sx, sy: 0, sWidth, sHeight }
  }
  const sWidth = imgW
  const sHeight = imgW / boxAspect
  return { sx: 0, sy: (imgH - sHeight) / 2, sWidth, sHeight }
}

export default function GlitchImage({ src, alt = '', focalX = 0.5 }: { src: string; alt?: string; focalX?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const rectRef = useRef<CoverRect | null>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const intervalRef = useRef<number | null>(null)
  const pulseIntervalRef = useRef<number | null>(null)
  const burstTimeoutRef = useRef<number | null>(null)
  const panProgressRef = useRef(1)
  const panRafRef = useRef<number | null>(null)
  const hasPannedRef = useRef(false)
  const canHover = useCanHover()
  const [active, setActive] = useState(false)

  // Mobile entrance: the image starts cropped to its left edge and pans in
  // toward the resting (centered) crop as panProgress goes 0 -> 1.
  const effectiveSx = (rect: CoverRect) => rect.sx * panProgressRef.current

  const drawClean = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !img || !img.complete || !ctx) return
    const { w, h } = sizeRef.current
    if (!w || !h) return
    const rect = rectRef.current ?? computeCoverRect(img.naturalWidth, img.naturalHeight, w, h, focalX)
    rectRef.current = rect
    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, effectiveSx(rect), rect.sy, rect.sWidth, rect.sHeight, 0, 0, w, h)
  }

  const drawGlitchFrame = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const rect = rectRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !img || !rect || !ctx) return
    const { w, h } = sizeRef.current
    if (!w || !h) return
    const sx = effectiveSx(rect)

    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, sx, rect.sy, rect.sWidth, rect.sHeight, 0, 0, w, h)

    const sliceCount = 6 + Math.floor(Math.random() * 5)
    for (let i = 0; i < sliceCount; i++) {
      const sliceH = h / 22 + Math.random() * (h / 10 - h / 22)
      const y0 = Math.random() * Math.max(h - sliceH, 0)
      const offsetX = (Math.random() * 2 - 1) * w * 0.12

      const sy = rect.sy + (y0 / h) * rect.sHeight
      const sh = (sliceH / h) * rect.sHeight

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.filter = 'none'
      ctx.drawImage(img, sx, sy, rect.sWidth, sh, offsetX, y0, w, sliceH)

      ctx.globalCompositeOperation = 'screen'
      ctx.globalAlpha = 0.7
      ctx.filter = 'sepia(1) saturate(8) hue-rotate(-50deg) brightness(1.2)'
      const ghostOffsetX = offsetX + (Math.random() * 2 - 1) * w * 0.03
      ctx.drawImage(img, sx, sy, rect.sWidth, sh, ghostOffsetX, y0, w, sliceH)
    }

    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    const lineCount = 4 + Math.floor(Math.random() * 5)
    for (let i = 0; i < lineCount; i++) {
      const lineH = 1 + Math.random() * 2
      const y = Math.random() * Math.max(h - lineH, 0)
      ctx.globalAlpha = 0.7 + Math.random() * 0.25
      ctx.fillStyle = '#e71313'
      ctx.fillRect(0, y, w, lineH)
    }

    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  // Load the source image once.
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      imgRef.current = img
      rectRef.current = null
      drawClean()
    }
    return () => {
      img.onload = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  // Keep the canvas's backing store matched to its displayed size.
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = container.clientWidth
      const h = container.clientHeight
      sizeRef.current = { w, h }
      canvas.width = w * dpr
      canvas.height = h * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rectRef.current = null
      drawClean()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mobile only: the photo enters cropped to its left edge, then pans in to
  // the resting (centered) crop once, the first time it scrolls into view.
  useEffect(() => {
    if (canHover) {
      panProgressRef.current = 1
      drawClean()
      return
    }
    if (hasPannedRef.current) return

    panProgressRef.current = 0
    drawClean()

    const container = containerRef.current
    if (!container) return

    const animatePanIn = () => {
      hasPannedRef.current = true
      const duration = 1300
      const start = performance.now()
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        panProgressRef.current = ease(t)
        drawClean()
        panRafRef.current = t < 1 ? requestAnimationFrame(tick) : null
      }
      panRafRef.current = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPannedRef.current) animatePanIn()
      },
      { threshold: 0.2 },
    )
    io.observe(container)
    return () => {
      io.disconnect()
      if (panRafRef.current) {
        cancelAnimationFrame(panRafRef.current)
        panRafRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canHover])

  // Drive the glitch loop off the active flag, ~90ms per frame.
  useEffect(() => {
    if (active) {
      intervalRef.current = window.setInterval(drawGlitchFrame, 90)
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
    drawClean()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Touch devices: pulse a short glitch burst every 2s while in view, instead of hover.
  useEffect(() => {
    if (canHover) return
    const container = containerRef.current
    if (!container) return

    const clearPulse = () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
        pulseIntervalRef.current = null
      }
      if (burstTimeoutRef.current) {
        clearTimeout(burstTimeoutRef.current)
        burstTimeoutRef.current = null
      }
    }

    const burst = () => {
      setActive(true)
      burstTimeoutRef.current = window.setTimeout(() => setActive(false), 600)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.intersectionRatio >= 0.6
        if (inView) {
          if (!pulseIntervalRef.current) {
            burst()
            pulseIntervalRef.current = window.setInterval(burst, 2000)
          }
        } else {
          clearPulse()
          setActive(false)
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    io.observe(container)
    return () => {
      io.disconnect()
      clearPulse()
    }
  }, [canHover])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={canHover ? () => setActive(true) : undefined}
      onMouseLeave={canHover ? () => setActive(false) : undefined}
    >
      <canvas ref={canvasRef} role="img" aria-label={alt} className="block w-full h-full" />
    </div>
  )
}
