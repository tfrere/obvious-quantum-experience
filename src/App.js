import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Loader, Stats } from '@react-three/drei'

import Scene from './Components/Qubit/Scene.js'
import Wall from './Components/Wall/Wall.js'

export default function App() {
  const mouse = useRef([0, 0])
  const htmlPortalRef = useRef()
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [12, 8, 12] }} gl={{ alpha: false }} resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}>
        <Suspense fallback={null}>
          <Stats
            showPanel={0} // Start-up panel (default=0)
            className="stats" // Optional className to add to the stats container dom element
          />
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
      <div ref={htmlPortalRef} id="html-portal"></div>
    </>
  )
}
