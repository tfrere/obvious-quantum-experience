import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Environment, MeshReflectorMaterial, Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'

export default function GroundReflection() {
  return (
    <>
      <mesh position={[0, -10.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[10, 10]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15.5}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#505050"
          metalness={1}
          roughness={0.5}
        />
      </mesh>
      <Environment preset="dawn" />
    </>
  )
}
