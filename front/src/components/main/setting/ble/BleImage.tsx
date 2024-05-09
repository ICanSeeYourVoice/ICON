import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  position: THREE.Vector3 | [number, number, number];
}

const BleModel = ({ position }: ModelProps) => {
  const gltf = useGLTF("/ble_gltf/scene.gltf");
  const group = useRef<THREE.Group>(null!);
  // useFrame(() => (group.current.rotation.y += 0.02));
  return (
    <primitive
      ref={group}
      object={gltf.scene.clone()}
      scale={2}
      position={position}
    />
  );
};

const WatchModel = ({ position }: ModelProps) => {
  const gltf = useGLTF("/watch_gltf/scene.gltf");
  const group = useRef<THREE.Group>(null!);
  useFrame(() => (group.current.rotation.y += 0.02));
  return (
    <primitive
      ref={group}
      object={gltf.scene.clone()}
      scale={48}
      position={position}
    />
  );
};

const BleImage = () => {
  return (
    <div>
      <Canvas>
        <Suspense fallback={null}>
          <directionalLight intensity={1} />
          <ambientLight intensity={1.2} />
          <spotLight
            intensity={0.1}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <BleModel position={[-3, 0, 0]} />
          <WatchModel position={[3, 2, -1]} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BleImage;
