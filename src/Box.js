function Box(props) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={e => click(!clicked)}
            onPointerOver={e => hover(true)}
            onPointerOut={e => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}
