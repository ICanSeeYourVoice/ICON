import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  position: THREE.Vector3 | [number, number, number];
}

const BleModel = ({ position }: ModelProps) => {
  const glb = useGLTF("/ble/bluetooth_icon.glb");
  const group = useRef<THREE.Group>(null!);
  // useFrame(() => (group.current.rotation.y += 0.02));
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime();
  //   group.current.rotation.x = Math.PI + Math.cos(t / 4) / 8;
  //   group.current.rotation.y = Math.sin(t / 4) / 8;
  //   group.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
  //   group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  // });
  return (
    <primitive
      // rotation={[Math.PI / 2, 0, 0]}
      ref={group}
      object={glb.scene.clone()}
      scale={[2, 2, 1]}
      position={position}
    />
  );
};

const WatchModel = ({ position }: ModelProps) => {
  const gltf = useGLTF("/watch/samsung__galaxy__watch_5.glb");
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
useGLTF.preload("/ble/bluetooth_icon.glb");
useGLTF.preload("/watch/samsung__galaxy__watch_5.glb");
export default BleImage;
