import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { a, useSpring, easings } from '@react-spring/three'
import { CameraShake, Shadow, Html, Cone, Line, QuadraticBezierLine, Segment, Segments, Sphere, Text } from '@react-three/drei'

import useInterval from '../../utils/useInterval'

// import { vshader, fshader } from './shaders/stroke/shader.js'
import './shaders/OutlineMaterial'

function randomSpherePoint(x0, y0, z0, radius) {
  var u = Math.random()
  var v = Math.random()
  var theta = 2 * Math.PI * u
  var phi = Math.acos(2 * v - 1)
  var x = x0 + radius * Math.sin(phi) * Math.cos(theta)
  var y = y0 + radius * Math.sin(phi) * Math.sin(theta)
  var z = z0 + radius * Math.cos(phi)
  return [x, y, z]
}

function DashedLine({ ...props }) {
  const lineRef = useRef()
  const points = []

  var items = 64
  var radius = 5
  var center = [0, 0]
  for (var i = 0; i <= items; i++) {
    var x = center[0] + radius * Math.cos((2 * Math.PI * i) / items)
    var y = center[1] + radius * Math.sin((2 * Math.PI * i) / items)
    points.push(new THREE.Vector3(x, 0, y))
  }

  useFrame((_, delta) => {
    lineRef.current.material.uniforms.dashOffset.value -= delta
  })

  // return <QuadraticBezierLine ref={lineRef} start={[5, 0, 0]} end={[0, 0, 5]} mid={[13, 15, 13]} segments={5} color={'white'} lineWidth={2} dashed={true} />
  return <Line ref={lineRef} points={points} segments={5} color={'white'} lineWidth={2} dashed={true} {...props} />
}

function ContinuousLine({ ...props }) {
  const lineRef = useRef()
  const points = []

  var items = 64
  var radius = 5.4
  var center = [0, 0]
  for (var i = 0; i <= items; i++) {
    var x = center[0] + radius * Math.cos((2 * Math.PI * i) / items)
    var y = center[1] + radius * Math.sin((2 * Math.PI * i) / items)
    points.push(new THREE.Vector3(x, 0, y))
  }

  // return <QuadraticBezierLine ref={lineRef} start={[5, 0, 0]} end={[0, 0, 5]} mid={[13, 15, 13]} segments={5} color={'white'} lineWidth={2} dashed={true} />
  return <Line ref={lineRef} points={points} segments={5} color={'white'} lineWidth={2} dashed={false} {...props} />
}

function Indicator() {
  const ref = useRef()
  const coneRef = useRef()
  const cloneRef = useRef()

  const [qubitValue, setQubitValue] = useState(0)

  const [position, setPosition] = useState([0, 0, 0])

  const [speed, setSpeed] = useState(2000)

  const [rotation, setRotation] = useState([0, 0, 0])

  const [color, setColor] = useState('white')

  const spring = useSpring({
    delay: 0,
    config: {
      duration: speed
    },
    to: {
      rotation: rotation
    }
  })

  useInterval(() => {
    const newRandomPosition = randomSpherePoint(0, 0, 0, 5)
    setQubitValue(newRandomPosition[1] > 0 ? 1 : 0)
    setPosition(newRandomPosition)
    // cloneRef.current.lookAt(newRandomPosition[0], newRandomPosition[1], newRandomPosition[2])
    // setRotation([cloneRef.current.rotation.x, cloneRef.current.rotation.y, cloneRef.current.rotation.z])
    // newRandomPosition[1] > 0 ? setColor('green') : setColor('red')
  }, speed)

  return (
    <>
      {/* <mesh visible scale={[1, 1, 1]} position={position}>
        <sphereGeometry args={[0.2, 10, 4, 4]} />
        <meshStandardMaterial side={THREE.DoubleSide} emissive={color} color={color} />
      </mesh> */}
      {/* <a.group ref={ref} {...spring}>
        <mesh visible userData={{ hello: 'world' }} scale={[1, 1, 1]} position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 4, 4]} />
          <meshStandardMaterial side={THREE.DoubleSide} emissive={color} color={color} />
        </mesh>
        <Sphere ref={coneRef} rotation={[Math.PI / 2, 0, 0]} scale={[0.2, 0.2, 0.2]} position={[0, 0, 4]}>
          <meshStandardMaterial emissive={color} color={color} />
        </Sphere>
      </a.group> */}

      <group ref={cloneRef} />
      {/* <mesh ref={cloneRef} visible userData={{ hello: 'world' }} scale={[1, 1, 1]} position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 4]} />
        <meshStandardMaterial side={THREE.DoubleSide} emissive={color} color={color} />
      </mesh> */}
      <Sphere ref={coneRef} rotation={[Math.PI / 2, 0, 0]} scale={[0.2, 0.2, 0.2]} position={position}>
        <meshStandardMaterial emissive={color} color={color} />
      </Sphere>

      {/* <Segments limit={6} lineWidth={2.0}>
        <Segment segments={5} lineWidth={2} sdashed={true} start={[0, 0, 0]} end={[position[0], 0, position[2]]} color={'white'} />
        <Segment segments={5} lineWidth={2} sdashed={true} start={position} end={[position[0], 0, position[2]]} color={'white'} />
      </Segments>
       */}
      <Line
        points={[new THREE.Vector3(position[0], position[1], position[2]), new THREE.Vector3(position[0], 0, position[2])]}
        color={'white'}
        lineWidth={2}
        dashed={false}></Line>
      <Line points={[new THREE.Vector3(0, 0, 0), position]} segments={3} color={'white'} lineWidth={2} dashed={false} />
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(position[0], 0, position[2])]} segments={3} color={'white'} lineWidth={2} dashed={false} />
      {/* <line
        geometry={new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(position[0], position[1], position[2]),
          new THREE.Vector3(position[0], 0, position[2])
        ])}>
        <lineDashedMaterial attach="material" color={'white'} lineWidth={3} dashSize={1} gapsize={1} />
      </line> */}

      {/* <Text
        position={[0, -9.9, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        fontSize={10}
        color={'#505050'}
        receiveShadow
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center">
        {qubitValue}
      </Text>
      <Text
        position={[3.1, -9.9, 3.1]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        fontSize={0.5}
        color={'#505050'}
        receiveShadow
        anchorX="center"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
        VALUE
      </Text> */}
    </>
  )
}

export default function Qubit({ htmlPortalRef }) {
  // const material = new THREE.RawShaderMaterial({
  //   uniforms: {
  //     inner: { value: 0.4 },
  //     outer: { value: 0.45 }
  //   },
  //   vertexShader: vshader,
  //   fragmentShader: fshader
  // })

  return (
    <>
      <DashedLine />
      <Indicator />
      {/* <ContinuousLine rotation={[3.14 / 2, 0, 0]} />
      <ContinuousLine rotation={[0, 0, 3.14 / 2]} /> */}
      {/* <DashedLine rotation={[3.14 / 2, 0, 0]} />
      <DashedLine rotation={[0, 0, 3.14 / 2]} /> */}
      <Segments limit={6} lineWidth={2.0}>
        <Segment start={[0, 0, 0]} end={[5.5, 0, 0]} color={'white'} />
        <Segment start={[0, 0, 0]} end={[0, 5.5, 0]} color={'white'} />
        <Segment start={[0, 0, 0]} end={[0, 0, 5.5]} color={'white'} />
      </Segments>
      <mesh visible userData={{ hello: 'world' }} scale={[5, 5, 5]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 64, 64]} />
        <meshStandardMaterial emissive="white" side={THREE.DoubleSide} color="white" transparent={true} opacity={0.3} />
      </mesh>
      <Cone rotation={[0, 0, -Math.PI / 2]} scale={[0.2, 0.4, 0.2]} position={[5.5, 0, 0]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Cone>
      <Cone rotation={[0, 0, 0]} scale={[0.2, 0.4, 0.2]} position={[0, 5.5, 0]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Cone>
      <Cone rotation={[Math.PI / 2, 0, 0]} scale={[0.2, 0.4, 0.2]} position={[0, 0, 5.5]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Cone>
      <Sphere scale={[0.15, 0.15, 0.15]} position={[0, 0, 0]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Sphere>

      <Sphere scale={[0.15, 0.15, 0.15]} position={[0, 5, 0]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Sphere>
      <Sphere scale={[0.15, 0.15, 0.15]} position={[0, -5, 0]}>
        <meshStandardMaterial emissive="white" color="white" />
      </Sphere>

      <mesh visible userData={{ hello: 'world' }} scale={[5, 5, 5]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1, 64, 16]} />
        <meshStandardMaterial emissive="white" side={THREE.BackSide} color="white" transparent={true} opacity={0.1} />
        {/* <outlineMaterial transparent depthWrite={false} /> */}
        {/* <rawShaderMaterial
          attach="material"
          side={THREE.DoublesSide}
          uniforms={{
            offset: { value: 1 }
          }}
          vertexShader={vshader}
          fragmentShader={fshader}
        /> */}
      </mesh>
      <Html portal={htmlPortalRef} sprite transform position={[-1, 5, 0]} distanceFactor={10}>
        <div class="html-box">| 0 ></div>
      </Html>
      <Html portal={htmlPortalRef} sprite transform position={[-1, -5, 0]} distanceFactor={10}>
        <div class="html-box">| 1 ></div>
      </Html>
      <Html portal={htmlPortalRef} sprite transform position={[0.5, 6, 0]} distanceFactor={10}>
        <div class="html-box">Y</div>
      </Html>
      <Html portal={htmlPortalRef} sprite transform position={[6, 0, 0]} distanceFactor={10}>
        <div class="html-box">X</div>
      </Html>
      <Html portal={htmlPortalRef} sprite transform position={[0, 0, 6]} distanceFactor={10}>
        <div class="html-box">Z</div>
      </Html>

      {/* <Html portal={htmlPortalRef} sprite transform position={[6, 6, -1]} distanceFactor={10}>
        <div class="html-popup">Qubit</div>
      </Html> */}

      {/* <Html portal={htmlPortalRef} sprite transform position={[0, 0, 0]} distanceFactor={0}>
        <div class="html-circle"></div>
      </Html> */}

      {/* <mesh visible userData={{ hello: 'world' }} scale={[5, 5, 5]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.9, 2, 32, 32]} />
        <meshStandardMaterial wireframe color="white" transparent={true} opacity={0.1} />
      </mesh> */}
    </>
  )
}
