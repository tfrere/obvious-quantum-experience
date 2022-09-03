import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  CameraShake,
  Loader,
  Shadow,
  OrbitControls,
  useGLTF,
  useScroll,
  ScrollControls,
  Environment,
  Merged,
  Text,
  ContactShadows,
  MeshReflectorMaterial,
  Stats,
  Float
} from '@react-three/drei'

import Qubit from './Qubit.js'
import Particles from './Particles.js'
import Sparks from './Sparks.js'
import GroundReflection from './GroundReflection.js'
import SvgLoader from './SvgLoader.js'
import Fireflies from './Fireflies.js'

import { EffectComposer, SSAO, DepthOfField } from '@react-three/postprocessing'

export default function Scene() {
  const mouse = useRef([0, 0])
  const htmlPortalRef = useRef()
  return (
    <Suspense fallback={null}>
      <Stats
        showPanel={0} // Start-up panel (default=0)
        className="stats" // Optional className to add to the stats container dom element
      />
      <Particles count={100} mouse={mouse} />
      <Float>
        <Qubit htmlPortalRef={htmlPortalRef} />
      </Float>
      {/* <Fireflies count={500} /> */}
      {/* <Sparks count={2} mouse={mouse} colors={['#B19CCF', '#D99F71', '#E46D71']} /> */}
      {/* <fog attach="fog" args={['#505050', 10, 40]} /> */}
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.25} />
      {/* <EffectComposer multisampling={0}> */}
      {/* <SSAO samples={31} radius={0.1} intensity={10} luminanceInfluence={0.1} color="black" /> */}
      {/* <DepthOfField
        focusDistance={0.0} // where to focus
        focalLength={0.08} // focal length
        bokehScale={2} // bokeh size
      /> */}
      {/* </EffectComposer> */}
      {/* <gridHelper args={[100, 20, '#17171b', '#17171b']} position={[0, -9.95, 0]} /> */}
      {/* <GroundReflection /> */}
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0} zoomSpeed={0.1} />
      {/* <Shadow fog={true} color="#303030" scale={[30, 30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} />v{' '} */}
      {/* <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */}
    </Suspense>
  )
}
