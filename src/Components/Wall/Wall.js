import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraShake, Shadow } from '@react-three/drei'

export default function Wall() {
  return (
    <Suspense fallback={null}>
      <Shadow fog={true} color="#5E4288" scale={[30, 30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} />v{' '}
      <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
    </Suspense>
  )
}
