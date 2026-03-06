import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import PremiumTooth from "./PremiumTooth";

export default function DentalHero() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
        {/* Background color */}
        <color attach="background" args={["#f4fff8"]} />

        {/* Premium studio lighting */}
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
        />

        <pointLight
          position={[0, 2, 2]}
          intensity={1}
          color="#b6ffd2"
        />

        {/* HDR environment reflections */}
        <Environment preset="studio" />

        {/* Tooth */}
        <PremiumTooth />

        {/* Disable zoom for hero */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}