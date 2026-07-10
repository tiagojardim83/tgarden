import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as THREE from 'three'
import logoUrl from '../assets/tgarden-mark.svg'

const blackBackground = new THREE.Color('#0a0a0a')
const MAX_TILT = 1.1
const AUTO_SPIN_SPEED = 0.35

type DragRefs = {
  dragging: MutableRefObject<boolean>
  last: MutableRefObject<{ x: number; y: number }>
  rotation: MutableRefObject<{ x: number; y: number }>
  velocity: MutableRefObject<{ x: number; y: number }>
}

function LogoMesh({ dragging, rotation, velocity }: DragRefs) {
  const data = useLoader(SVGLoader, logoUrl)
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const shapes = data.paths.flatMap((path) => SVGLoader.createShapes(path))
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 14,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2.5,
      bevelSegments: 12,
      curveSegments: 24,
    })
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [data])

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
        <MeshTransmissionMaterial
          background={blackBackground}
          backside
          backsideThickness={1.2}
          samples={8}
          resolution={512}
          thickness={0.6}
          chromaticAberration={0.9}
          anisotropy={0.5}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0.1}
          roughness={0.02}
          ior={1.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.6}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
    </group>
  )
}

export default function GlassLogo3D({ className = '' }: { className?: string }) {
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

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
    <div className={`${className} relative pointer-events-none`}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 30], fov: 30 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.5} />
        <Suspense fallback={null}>
          <LogoMesh dragging={dragging} last={last} rotation={rotation} velocity={velocity} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      {/* Interactive hitbox stays centered and modestly sized so the oversized
          bleed canvas doesn't swallow clicks meant for content behind/around it. */}
      <div
        className="absolute inset-[18%] pointer-events-auto cursor-grab active:cursor-grabbing"
        data-cursor="DRAG"
        onPointerDown={onPointerDown}
      />
    </div>
  )
}
