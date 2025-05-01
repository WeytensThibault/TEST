"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function NotFound() {
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

    const fallbackCamera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      100
    );
    fallbackCamera.position.set(0.2, 0.8, 3);
    cameraRef.current = fallbackCamera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load("/models/untitled.glb", (gltf) => {
      const model = gltf.scene;

      model.rotation.y = Math.PI / -2;
      model.scale.set(2, 2, 2);

      scene.add(model);
      modelRef.current = model;

      const cameraFromGLB = gltf.cameras?.find((c) => c.name === "maincamera");
      if (cameraFromGLB) {
        cameraRef.current = cameraFromGLB;
        if (cameraFromGLB instanceof THREE.PerspectiveCamera) {
          cameraFromGLB.aspect = width / height;
          cameraFromGLB.updateProjectionMatrix();
        }
      } else {
        console.warn("maincamera not found. Using fallback.");
      }
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const animate = () => {
      requestAnimationFrame(animate);
      if (cameraRef.current) {
        renderer.render(scene, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || 1;
      const newHeight = containerRef.current?.clientHeight || 1;
      renderer.setSize(newWidth, newHeight);

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

  return (
    <div className=" flex flex-col justify-center items-center">
      <div ref={containerRef} className="w-full h-[400px] z-[-1]" />
      <p className="text-4xl font-bold mt-4 text-center px-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
}
