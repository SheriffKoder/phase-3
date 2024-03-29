/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/3d/computer/opt-iphone42.glb -o components/myModels/optPhone42.jsx -r public 
*/


import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useTexture } from '@react-three/drei';
import { Decal } from '@react-three/drei';





export function OptPhone42(props) {
  const { nodes, materials } = useGLTF('/models/opt-iphone42.glb');


  
  

  return (
    <group {...props} dispose={null}>
      <group position={[0.012, -0.496, -0.005]} rotation={[-Math.PI, 0.002, -Math.PI]} scale={0.01}>
        <group scale={100}>
          <mesh geometry={nodes.iPhone__12_Pro_Antenna_0.geometry} material={materials['Antenna.002']} />
          <mesh geometry={nodes.iPhone__12_Pro_BodyFrame_0.geometry} material={materials['BodyFrame.001']} />
          <mesh geometry={nodes.iPhone__12_Pro_GrayGlossy2_0.geometry} material={materials['GrayGlossy2.001']} />
          <mesh geometry={nodes.iPhone__12_Pro_MicrophoneSpeaker_0.geometry} material={materials['MicrophoneSpeaker.001']} />
          <mesh geometry={nodes.iPhone12_Pro_Body_0.geometry} material={materials['Body.002']} />
          {/* <mesh geometry={nodes.Apple_Logo_Logo_0.geometry} material={materials['Logo.002']} /> */}
          <mesh geometry={nodes.Bezel_bezel_0.geometry} material={materials['bezel.002']} />
          <mesh geometry={nodes.FrontCamera_Cameralens_0.geometry} material={materials['Cameralens.001']} />
          <mesh geometry={nodes.FrontCamera_FrontCamera_0.geometry} material={materials['FrontCamera.001']} />
          {/* <mesh geometry={nodes.FrontCamera_Glass_0.geometry} material={materials['Glass.002']} /> */}
          {/* <mesh geometry={nodes.FrontCamera001_bezel001_0.geometry} material={materials['bezel.003']} position={[0, 0, -0.001]} /> */}
          <mesh geometry={nodes.FrontMic_GrayGlossy2_0.geometry} material={materials['GrayGlossy2.001']} />
          <mesh geometry={nodes.FrontMic_MicrophoneSpeaker_0.geometry} material={materials['MicrophoneSpeaker.001']} />
          <mesh geometry={nodes.CameraModule001_Glass_0.geometry} material={materials['Glass.002']} />
          {/* <mesh geometry={nodes.Screen_Wallpaper_0001.geometry} material={materials['Wallpaper.002']} /> */}
          {/* <mesh geometry={nodes.Screen_Wallpaper_0001_1.geometry} material={materials['myWallpaper.002']} /> */}

          <mesh geometry={nodes.Screen_Wallpaper_0001_1.geometry}>
          <meshBasicMaterial color={"black"}/>
            <Decal
            // debug
            position={[0.006,0.49,0]}
            rotation={[0,0,0]}
            scale={[0.443,0.96,0.1]}
            // scale-x={0.5}
            // scale-y={1}
                
            >
                <meshBasicMaterial
                map={props.myWallpaper}
                polygonOffset
                polygonOffsetFactor={-1}
                transparent
                />

            </Decal>

          </mesh>


          {/* <mesh geometry={nodes.MuteButton_BodyFrame_0.geometry} material={materials['BodyFrame.001']} /> */}
          {/* <mesh geometry={nodes.Port_Blackmatte_0.geometry} material={materials['Blackmatte.001']} /> */}
          {/* <mesh geometry={nodes.Port_BodyFrame_0.geometry} material={materials['BodyFrame.001']} /> */}
          {/* <mesh geometry={nodes.PowerButton_BodyFrame_0.geometry} material={materials['BodyFrame.001']} /> */}
          {/* <mesh geometry={nodes.SimTray_Blackmatte_0.geometry} material={materials['Blackmatte.001']} /> */}
          {/* <mesh geometry={nodes.SimTray_BodyFrame_0.geometry} material={materials['BodyFrame.001']} /> */}
          {/* <mesh geometry={nodes.VolumeButton_BodyFrame_0.geometry} material={materials['BodyFrame.001']} /> */}
        </group>
      </group>
      <mesh geometry={nodes.Camera001_Flash_0001.geometry} material={materials['Flash.003']} position={[-0.011, 0.003, 0]} />
      <mesh geometry={nodes.Camera001_Gray_Glass_0001.geometry} material={materials['Gray_Glass.002']} position={[-0.013, 0.04, 0]} scale={0.914} />
      <mesh geometry={nodes.Camera003_Material002_0001.geometry} material={materials['Material.002']} position={[-0.007, 0.034, -0.002]} scale={0.932} />
      <mesh geometry={nodes.Camera001_Black_Glass_0002.geometry} material={materials['Black_Glass.002']} position={[0.001, 0.014, -0.007]} />
    </group>
  )
}

useGLTF.preload('/models/opt-iphone42.glb')
