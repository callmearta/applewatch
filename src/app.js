import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useProgress, Html } from '@react-three/drei';
import { AppleWatch } from './Applewatch';

import Picker from './Picker';
import Loading from './Loading'
import Heading from './Heading'
import AddToCart from './AddToCart';

const App = (props) => {
    return (
        <>
            <Heading />
            <Loading />
            <Canvas shadows camera={{ position: [0, 1, 1], fov: 40 }} gl={{antialias:true}} >
                <OrbitControls enablePan={false}/>
                <ambientLight intensity={.7} />
                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                <Suspense fallback={null}>
                    <AppleWatch rotation={[-.5, -.8, -0.15]} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
            <Picker />
            <AddToCart />
        </>
    );
}

export default App;