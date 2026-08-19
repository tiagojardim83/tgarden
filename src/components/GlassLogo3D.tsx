import {
  useCallback,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as THREE from 'three'
import logoUrl from '../assets/tgarden-mark.svg'
import { useCanHover } from '../lib/useCanHover'
import { DesktopEnvironment, DesktopGlassMaterial } from './DesktopGlassEffects'

const MAX_TILT = 1.1
const AUTO_SPIN_SPEED = 0.35

type DragRefs = {
  dragging: MutableRefObject<boolean>
  last: MutableRefObject<{ x: number; y: number }>
  rotation: MutableRefObject<{ x: number; y: number }>
  velocity: MutableRefObject<{ x: number; y: number }>
}

function SceneReady({ onReady }: { onReady: () => void }) {
  const renderedFrames = useRef(0)

  useFrame(() => {
    if (renderedFrames.current >= 3) return
    renderedFrames.current += 1
    if (renderedFrames.current === 3) onReady()
  })

  return null
}

function LogoMesh({ dragging, rotation, velocity, lightweight }: DragRefs & { lightweight: boolean }) {
  const data = useLoader(SVGLoader, logoUrl)
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const shapes = data.paths.flatMap((path) => SVGLoader.createShapes(path))
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 14,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2.5,
      bevelSegments: lightweight ? 4 : 12,
      curveSegments: lightweight ? 12 : 24,
    })
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [data, lightweight])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    // continuous loop — always spinning, drag/momentum layers on top
    rotation.current.y += delta * AUTO_SPIN_SPEED

    if (!dragging.current) {
      rotation.current.y += velocity.current.x
      rotation.current.x = THREE.MathUtils.clamp(rotation.current.x + velocity.current.y, -MAX_TILT, MAX_TILT)
      velocity.current.x *= 0.94
      velocity.current.y *= 0.94
    }

    mesh.rotation.y = rotation.current.y
    mesh.rotation.x = rotation.current.x
    mesh.rotation.z = -rotation.current.x * 0.3
  })

  return (
    <group scale={[0.013, -0.013, 0.013]}>
      <mesh ref={meshRef} geometry={geometry}>
        <DesktopGlassMaterial lightweight={lightweight} />
      </mesh>
    </group>
  )
}

export default function GlassLogo3D({ className = '' }: { className?: string }) {
  const canHover = useCanHover()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [isVisible, setIsVisible] = useState(true)
  const [isSceneReady, setIsSceneReady] = useState(false)
  const onSceneReady = useCallback(() => setIsSceneReady(true), [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))
    io.observe(container)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      last.current = { x: e.clientX, y: e.clientY }
      const vx = dx * 0.012
      const vy = dy * 0.012
      rotation.current.y += vx
      rotation.current.x = THREE.MathUtils.clamp(rotation.current.x + vy, -MAX_TILT, MAX_TILT)
      velocity.current = { x: vx, y: vy }
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
    velocity.current = { x: 0, y: 0 }
  }

  return (
    <div
      ref={containerRef}
      className={`${className} relative pointer-events-none`}
      data-3d-ready={isSceneReady}
      style={{
        opacity: isSceneReady ? 1 : 0,
        transition: 'opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <Canvas
        dpr={isMobile ? 1.25 : [1, 2]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
        camera={{ position: [0, 0, 30], fov: 30 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.5} />
        <Suspense fallback={null}>
          <LogoMesh dragging={dragging} last={last} rotation={rotation} velocity={velocity} lightweight={isMobile} />
          <DesktopEnvironment lightweight={isMobile} />
          <SceneReady onReady={onSceneReady} />
        </Suspense>
      </Canvas>
      {/* Interactive hitbox stays centered and modestly sized so the oversized
          bleed canvas doesn't swallow clicks meant for content behind/around it.
          Desktop only — on touch devices the logo just auto-spins. */}
      {canHover && isSceneReady && (
        <div
          className="absolute inset-[18%] pointer-events-auto cursor-grab active:cursor-grabbing"
          data-cursor="DRAG"
          onPointerDown={onPointerDown}
        />
      )}
    </div>
  )
}
