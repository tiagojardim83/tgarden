import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import studioEnvironment from '../assets/environment/studio-small.hdr?url'
import studioEnvironmentMobile from '../assets/environment/studio-small-mobile.hdr?url'

const blackBackground = new THREE.Color('#0a0a0a')

export function DesktopGlassMaterial({ lightweight = false }: { lightweight?: boolean }) {
  return (
    <MeshTransmissionMaterial
      background={blackBackground}
      backside
      backsideThickness={1.2}
      samples={lightweight ? 3 : 8}
      resolution={lightweight ? 256 : 512}
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
  )
}

export function DesktopEnvironment({ lightweight = false }: { lightweight?: boolean }) {
  return <Environment files={lightweight ? studioEnvironmentMobile : studioEnvironment} />
}
