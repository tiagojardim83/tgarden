import { useEffect, useRef, useState } from 'react'
import { useCanHover } from '../lib/useCanHover'

interface CoverRect {
  sx: number
  sy: number
  sWidth: number
  sHeight: number
}

function computeCoverRect(imgW: number, imgH: number, boxW: number, boxH: number): CoverRect {
  const imgAspect = imgW / imgH
  const boxAspect = boxW / boxH
  if (imgAspect > boxAspect) {
    const sHeight = imgH
    const sWidth = imgH * boxAspect
    return { sx: (imgW - sWidth) / 2, sy: 0, sWidth, sHeight }
  }
  const sWidth = imgW
  const sHeight = imgW / boxAspect
  return { sx: 0, sy: (imgH - sHeight) / 2, sWidth, sHeight }
}

export default function GlitchImage({ src, alt = '' }: { src: string; alt?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const rectRef = useRef<CoverRect | null>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const intervalRef = useRef<number | null>(null)
  const canHover = useCanHover()
  const [active, setActive] = useState(false)

  const drawClean = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !img || !img.complete || !ctx) return
    const { w, h } = sizeRef.current
    if (!w || !h) return
    const rect = rectRef.current ?? computeCoverRect(img.naturalWidth, img.naturalHeight, w, h)
    rectRef.current = rect
    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, rect.sx, rect.sy, rect.sWidth, rect.sHeight, 0, 0, w, h)
  }

  const drawGlitchFrame = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const rect = rectRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !img || !rect || !ctx) return
    const { w, h } = sizeRef.current
    if (!w || !h) return

    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, rect.sx, rect.sy, rect.sWidth, rect.sHeight, 0, 0, w, h)

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
      ctx.drawImage(img, rect.sx, sy, rect.sWidth, sh, offsetX, y0, w, sliceH)

      ctx.globalCompositeOperation = 'screen'
      ctx.globalAlpha = 0.7
      ctx.filter = 'sepia(1) saturate(8) hue-rotate(-50deg) brightness(1.2)'
      const ghostOffsetX = offsetX + (Math.random() * 2 - 1) * w * 0.03
      ctx.drawImage(img, rect.sx, sy, rect.sWidth, sh, ghostOffsetX, y0, w, sliceH)
    }

    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'lighten'
    const lineCount = 4 + Math.floor(Math.random() * 5)
    for (let i = 0; i < lineCount; i++) {
      const lineH = 2 + Math.random() * 4
      const y = Math.random() * Math.max(h - lineH, 0)
      ctx.globalAlpha = 0.55 + Math.random() * 0.3
      ctx.fillStyle = '#ff1a1a'
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

  // Drive the glitch loop off the active flag, ~90ms per frame.
  useEffect(() => {
    if (active) {
      intervalRef.current = window.setInterval(drawGlitchFrame, 90)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      drawClean()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Touch devices: trigger from scroll position instead of hover.
  useEffect(() => {
    if (canHover) return
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.intersectionRatio >= 0.6), {
      threshold: [0, 0.6, 1],
    })
    io.observe(container)
    return () => io.disconnect()
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
