import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as THREE from 'three'
import logoUrl from '../assets/tgarden-mark.svg'

const blackBackground = new THREE.Color('#0a0a0a')

function LogoMesh() {
  const data = useLoader(SVGLoader, logoUrl)
  const meshRef = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })

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

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, pointer.current.x * Math.PI, 0.07)
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pointer.current.y * Math.PI * 0.6, 0.07)
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -pointer.current.x * 0.5, 0.07)
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
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 30], fov: 30 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.5} />
        <Suspense fallback={null}>
          <LogoMesh />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
