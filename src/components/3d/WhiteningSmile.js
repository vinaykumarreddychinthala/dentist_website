import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const WhiteningSmile = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 1.5, Math.sin((i / 3) * Math.PI * 2) * 1.5, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
};

export default WhiteningSmile;
