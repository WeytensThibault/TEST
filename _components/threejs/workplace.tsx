"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const WorkPlace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Use a fallback camera until we load the GLB's camera
    const fallbackCamera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      100
    );
    fallbackCamera.position.set(0, 1, 3);
    cameraRef.current = fallbackCamera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "/models/workplace.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;

        // Find the GLB camera by name
        const cameraFromGLB = gltf.cameras?.find(
          (c) => c.name === "maincamera"
        );
        if (cameraFromGLB) {
          cameraRef.current = cameraFromGLB;

          // If it's a PerspectiveCamera, update aspect and projection matrix
          if (cameraFromGLB instanceof THREE.PerspectiveCamera) {
            cameraFromGLB.aspect = width / height;
            cameraFromGLB.updateProjectionMatrix();
          }
        } else {
          console.warn("maincamera not found. Using fallback.");
        }
      },
      undefined,
      (error) => {
        console.error("Error loading GLB:", error);
      }
    );

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.0005;
      }
      if (cameraRef.current) {
        renderer.render(scene, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || 1;
      const newHeight = containerRef.current?.clientHeight || 1;
      renderer.setSize(newWidth, newHeight);

      // Ensure the aspect ratio is updated
      const cam = cameraRef.current;
      if (cam instanceof THREE.PerspectiveCamera) {
        cam.aspect = newWidth / newHeight;
        cam.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full z-[-1]" />;
};
export default WorkPlace;
