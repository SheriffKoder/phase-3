"use client"
import React from "react"

import {useState, useRef, Suspense} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";


const Stars = (props) => {

  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(500), {radius: 1.2});


  useFrame((state, delta) => {

    //speed of rotation
    ref.current.rotation.x -= delta /(1*400);
    ref.current.rotation.y -= delta /(1.25*400);
  });

  return (

    //rotation angle ?
    <group rotation={[0,0,Math.PI /20]}>

      <Points 
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled
      {...props}
      >

        <PointMaterial
        transparent
        color="#f272c8"
        size={0.002}
        sizeAttentuation={true}
        depthWrite={false}
        />


        </Points>
      </group>
      
  )
}


const StarsCanvas = () => {
  return (

    // the stars will fill whatever component it will be rendered on
    <div className="absolute inset-0 z-[0]">
      <Canvas
      camera={{
        position: [0,0,1]
      }}>

        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />

      </Canvas>

    </div>
  )
}

export default StarsCanvas;