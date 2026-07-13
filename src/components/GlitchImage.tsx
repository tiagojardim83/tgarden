import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
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
  // Distinct from hasPannedRef (which only guards against re-triggering the
  // entrance IO): flips true once the pan-in tween has actually finished, so
  // effectiveSx/drag/breathing don't take over mid-tween and stomp on it.
  const enteredRef = useRef(false)
  const canHover = useCanHover()
  const [active, setActive] = useState(false)

  // Mobile only, once the entrance pan has finished: the current drag/breathe
  // crop position (in source-image px), and the resting point it eases back
  // toward between drags.
  const dragSxRef = useRef(0)
  const breatheRafRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartSxRef = useRef(0)
  const inViewRef = useRef(true)

  // Mobile entrance: the image starts cropped to its left edge and pans in
  // toward the resting (centered) crop as panProgress goes 0 -> 1. After that,
  // dragSxRef (driven by touch-drag or the idle side-to-side loop) takes over.
  const effectiveSx = (rect: CoverRect) => {
    if (!enteredRef.current) return rect.sx * panProgressRef.current
    const maxSx = Math.max(0, (imgRef.current?.naturalWidth ?? 0) - rect.sWidth)
    return clamp(dragSxRef.current, 0, maxSx)
  }

  // Continuous slow side-to-side loop, hinting the photo can be dragged to
  // reveal the rest of the scene. Pauses while the user drags or the photo
  // is off-screen; resumes from wherever it was left, easing toward
  // whichever edge is farther away.
  const runLeg = (target: number) => {
    const rect = rectRef.current
    const img = imgRef.current
    if (!rect || !img) return
    const maxSx = Math.max(0, img.naturalWidth - rect.sWidth)
    if (maxSx <= 1) return
    const from = dragSxRef.current
    const duration = Math.max(2500, (Math.abs(target - from) / maxSx) * 14000)
    const start = performance.now()
    const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
    const tick = (now: number) => {
      if (isDraggingRef.current || !inViewRef.current) {
        breatheRafRef.current = null
        return
      }
      const t = Math.min((now - start) / duration, 1)
      dragSxRef.current = from + (target - from) * ease(t)
      drawClean()
      if (t < 1) {
        breatheRafRef.current = requestAnimationFrame(tick)
      } else {
        breatheRafRef.current = null
        runLeg(target === maxSx ? 0 : maxSx)
      }
    }
    breatheRafRef.current = requestAnimationFrame(tick)
  }

  const startBreathing = () => {
    if (!enteredRef.current || breatheRafRef.current || isDraggingRef.current || !inViewRef.current) return
    const rect = rectRef.current
    const img = imgRef.current
    if (!rect || !img) return
    const maxSx = Math.max(0, img.naturalWidth - rect.sWidth)
    if (maxSx <= 1) return
    runLeg(dragSxRef.current < maxSx / 2 ? maxSx : 0)
  }

  const stopBreathing = () => {
    if (breatheRafRef.current) {
      cancelAnimationFrame(breatheRafRef.current)
      breatheRafRef.current = null
    }
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (canHover || !enteredRef.current) return
    isDraggingRef.current = true
    stopBreathing()
    dragStartXRef.current = e.clientX
    dragStartSxRef.current = dragSxRef.current
    containerRef.current?.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!isDraggingRef.current) return
    const rect = rectRef.current
    const img = imgRef.current
    if (!rect || !img) return
    const maxSx = Math.max(0, img.naturalWidth - rect.sWidth)
    const dx = e.clientX - dragStartXRef.current
    dragSxRef.current = clamp(dragStartSxRef.current - dx, 0, maxSx)
    drawClean()
  }

  const onPointerEnd = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    startBreathing()
  }

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

  // Recompute the crop when focalX changes (e.g. switching mobile/desktop framing).
  useEffect(() => {
    rectRef.current = null
    drawClean()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focalX])

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
        if (t < 1) {
          panRafRef.current = requestAnimationFrame(tick)
        } else {
          panRafRef.current = null
          const rect = rectRef.current
          if (rect) {
            dragSxRef.current = rect.sx
            enteredRef.current = true
            startBreathing()
          }
        }
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
      stopBreathing()
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
        inViewRef.current = inView
        if (inView) {
          if (!pulseIntervalRef.current) {
            burst()
            pulseIntervalRef.current = window.setInterval(burst, 2000)
          }
          startBreathing()
        } else {
          clearPulse()
          setActive(false)
          stopBreathing()
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    io.observe(container)
    return () => {
      io.disconnect()
      clearPulse()
      stopBreathing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canHover])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${!canHover ? 'touch-pan-y cursor-grab active:cursor-grabbing' : ''}`}
      onMouseEnter={canHover ? () => setActive(true) : undefined}
      onMouseLeave={canHover ? () => setActive(false) : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <canvas ref={canvasRef} role="img" aria-label={alt} className="block w-full h-full" />
    </div>
  )
}
