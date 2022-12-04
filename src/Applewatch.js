import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { useSpring, animated, easings, SpringValue } from '@react-spring/three';

import { useSnapshot } from 'valtio';

import State, { PAGES } from './State';
import { Object3D, Vector2, Vector3 } from 'three';

export function AppleWatch(props) {
  const { nodes, materials } = useGLTF('/applewatch.glb')
  const camera = useThree(state => state.camera);
  const clock = useThree(state => state.clock);
  const ref = useRef();
  const defaultVec = useRef();
  const snap = useSnapshot(State);
  const [hover, set] = useState(null);
  const animateColors = useRef(false);
  const [pause,setPause] = useState(false);
  const springApi = useSpring({
    from: {
      rotation: [1, -1, -1]
    },
    to: async (next, cancel) => {
      let position = new Vector3(0, 0, -.15);
      position = camera.localToWorld(position);
      position = [-position.x * .1, -position.y * .1, -position.z * .1];
      await next({
        position: snap.addedToCart ? position : [0, 0, 0],
        delay: 500,
        config: {
          duration: 500,
          easing: easings.easeOutSine
        },
      });
      position = new Vector3(0, 3, -.15);
      position = camera.localToWorld(position);
      position = [position.x, position.y, position.z];
      await next({
        rotation: snap.addedToCart ? [10, 10, 10] : [0, 0, 0],
        position: snap.addedToCart ? position : [0, 0, 0],
        delay: snap.addedToCart ? 0 : 100,
        config: {
          duration: snap.addedToCart ? 2000 : 3000,
          easing: easings.easeOutSine
        },
        onResolve: () => {
          if (snap.addedToCart) {
            State.page = PAGES.addedToCart;
            setPause(true);
          }
        }
      });
      
      const test = await next({
        rotation: [0, 0, 0],
        position: [0, 0, 0],
        delay: 100,
        immediate: false,
        onResolve: () => {
          if (snap.addedToCart) {
            State.addedToCart = false;
            animateColors.current = clock.getElapsedTime();
          }
        },
      });
    },
  });

  useEffect(() => {
    if(snap.addedToCart && snap.page == PAGES.addedToCart){
      console.log(springApi);
      springApi.position.pause();
      springApi.rotation.pause();
    }else if(springApi.position && springApi.position.isPaused && springApi.rotation.isPaused){
      springApi.position.resume();
      springApi.rotation.resume();
    }
  },[snap,springApi.position, springApi.rotation]);

  useEffect(() => {
    defaultVec.current = camera.worldToLocal(new Vector3(0, 0, -1));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(time / 1.5) / 40;
    if (animateColors.current) {
      Object.keys(State.items).forEach(i => {
        State.items[i] = new THREE.Color(State.items[i]).lerp(new THREE.Color(snap.defaultItems[i]), .005);
      });
    }
    if (animateColors.current && time - animateColors.current > 3) {
      animateColors.current = false;
      Object.keys(State.items).forEach(i => {
        State.items[i] = snap.defaultItems[i];
      });
    }
  });

  return (
    <animated.group rotation={springApi.rotation} position={springApi.position}>
      <group
        {...props}
        dispose={null}
        onPointerOver={e => {
          e.stopPropagation();
        }}
        onClick={e => {
          e.stopPropagation();
          // console.log(e.object);
          // e.object.position.z += 1;
          if (e.object.name && State.items[e.object.name]) {
            set(e.object);
            State.current = { name: e.object.name };

            State.mouse.x = e.clientX;
            State.mouse.y = e.clientY;
          }
        }}
        onPointerMissed={e => {
          e.stopPropagation();
          State.current = null;
        }}
        ref={ref}
      >
        <group rotation={[-Math.PI / 2, 0, 0]} scale={7}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={nodes.NIYNwKgmPYCkzpx.geometry} material={materials.RfziScXwNjFOjTf} />
            <mesh geometry={nodes.BrmhLaxyDmhbhXA.geometry} name="band-bottom">
              <meshStandardMaterial color={snap.items['band-bottom']} material={materials.KwQHVIjAaOBvYOl} />
            </mesh>
            <mesh geometry={nodes.tqQTKXmBvXiXuUi.geometry} material={materials.iDKPrezlRKAMsXJ} name="band-bottom-button" />
            <mesh geometry={nodes.yTjoxDvwbAPZygY.geometry} material={materials.QGhrBgCXrJDNcrC} name="band-top">
              <meshStandardMaterial color={snap.items['band-top']} />
            </mesh>
            <mesh geometry={nodes.yHafeexXAiPytbW.geometry} material={materials.FqtwwTANGDActcI} />
            <mesh geometry={nodes.KeqqEyvZchDDdlP.geometry} material={materials.AjFlTFrWzhywymA} name="crown" />
            <mesh geometry={nodes.skbFGMQxPawHdOT.geometry} material={materials.xYqzIToOcTBbEzp} />
            <mesh geometry={nodes.ErOVeLWOcyHrdoT.geometry} material={materials.xYqzIToOcTBbEzp} />
            <mesh geometry={nodes.ajDgJcjsZTQAtOL.geometry} material={materials.rcZoXGfqfnZjYLv} />
            <mesh geometry={nodes.wflxnmxxYXvnLxp.geometry} material={materials.YRNmAgRITIuwDMU} />
            <mesh geometry={nodes.ePnvfhsUgYTHLdP.geometry} material={materials.iVwMRUBqdpoOFmg} />
            <mesh geometry={nodes.aynleugQGbyNYsa.geometry} material={materials.kFNgmsjtRAxVPtH} />
            <mesh geometry={nodes.HyRzdvVQMwELnwT.geometry} material={materials.upTfEpgNFxflqtf} name="crown-inner">
              <meshStandardMaterial color={snap.items['crown-inner']} />
            </mesh>
            <mesh geometry={nodes.bvsBShDTmaTjbXM.geometry} material={materials.YpOtGMmrQbktABJ} name="crown-color">
              <meshStandardMaterial color={snap.items['crown-color']} />
            </mesh>
            <mesh geometry={nodes.lnDzpNAJfMDjFms.geometry} material={materials.qxhxiJVpuwSrYLW} name="screen-glass" />
            <mesh geometry={nodes.lrTNGAQkeHccJph.geometry} material={materials.ycVxkCIsnetKUsw} />
            <mesh geometry={nodes.jChLaKiiqDISJhc.geometry} material={materials.sSZvqgMuWCuMkAr} name="crown-outer">
              <meshStandardMaterial color={snap.items['crown-outer']} />
            </mesh>
            <mesh geometry={nodes.DzgfJtxUfpgExsF.geometry} material={materials.mUXcyUQCxEEJdiO} />
            <mesh geometry={nodes.MBrZKZXWsvHIcZQ.geometry} material={materials.JBuGosClPcYrSry} />
            <mesh geometry={nodes.acJwQeGdNxQWEyd.geometry} material={materials.OEDmdMOTgdNMXOP} />
            <mesh geometry={nodes.mcMtSAOyQxOEEfl.geometry} material={materials.sJrbBWzziZrNyXB} />
            <mesh geometry={nodes.qbgXzfcPGFYiUnN.geometry} material={materials.FBAtOQrXrgOoPNd} name="screen" />
            <mesh geometry={nodes.dXSXlyOaLTQHAnn.geometry} material={materials.gMZhwegVXLXWOLd} />
            <group name="bezel">
              <mesh geometry={nodes.QpBpNnkHikCzRXn.geometry} material={materials.JUrNntQLbxHnFtO} name="bezel">
                <meshStandardMaterial color={snap.items['bezel']} />
              </mesh>
              <mesh geometry={nodes.JcqbcJEVwcScYbo.geometry} material={materials.JUrNntQLbxHnFtO} name="bezel">
                <meshStandardMaterial color={snap.items['bezel']} />
              </mesh>
              <mesh geometry={nodes.ToJTXgljlhhqitR.geometry} material={materials.LiBdTcnHkZvFfBu} name="bezel" />
              <mesh geometry={nodes.MKkqtRcjcYdQNza.geometry} material={materials.LiBdTcnHkZvFfBu} name="bezel" />
            </group>
            <mesh geometry={nodes.fWLGcfnLpXnhehz.geometry} material={materials.GdUNwQJEkZeKMrn} />
            <mesh geometry={nodes.aEQvkfzeWvwzYAe.geometry} material={materials.JbkKnNDeFOFjmsi} name="crown-outer">
              <meshStandardMaterial color={snap.items['crown-outer']} />
            </mesh>
            <mesh geometry={nodes.dwwWsLxRsdeWNuY.geometry} material={materials.JbkKnNDeFOFjmsi} name="crown-outer">
              <meshStandardMaterial color={snap.items['crown-outer']} />
            </mesh>
            <mesh geometry={nodes.uzbwArIObdMRDiX.geometry} material={materials.JbkKnNDeFOFjmsi} name="crown-outer">
              <meshStandardMaterial color={snap.items['crown-outer']} />
            </mesh>
            <mesh geometry={nodes.IKFNZjXnJPkRlsj.geometry} material={materials.JbkKnNDeFOFjmsi} name="crown-outer">
              <meshStandardMaterial color={snap.items['crown-outer']} />
            </mesh>
            <mesh geometry={nodes.sEZkXDXAzFzaCpi.geometry} material={materials.JAXIvIljFWpqimH} name="band-top-button" />
          </group>
        </group>
      </group>
      <animated.meshBasicMaterial opacity={0} />
      <ContactShadows position={[0, -0.35, 0]} opacity={.25} scale={2} blur={1.5} far={.5} />
    </animated.group>
  )
}

useGLTF.preload('/applewatch.glb')
