"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const TorusModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null); // Initialize with null

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container contents to prevent stacking
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 1; // Move inside or near the center of the torus

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // ADD THIS
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "/models/torus.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;
      },
      undefined,
      (error) => {
        console.error("Error loading torus.glb:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);

      // Slowly rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full z-[-1]"
    />
  );
};

export default TorusModel;
