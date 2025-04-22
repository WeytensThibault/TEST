"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../_components/Navbar";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const lastMouseX = useRef(0); // Changed to useRef
  const rotationSpeed = useRef(0.05); // Already using useRef, no change needed

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load("/models/id.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(3, 3, 3);
      model.position.set(0, 0, 0);
      model.rotation.y = Math.PI / -2;
      scene.add(model);
      modelRef.current = model;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed.current;

        if (rotationSpeed.current > 0.001) {
          rotationSpeed.current *= 0.99;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction to change rotation speed
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const mouseX = event.clientX;
      const deltaX = mouseX - lastMouseX.current;
      rotationSpeed.current = deltaX * 0.005;
      lastMouseX.current = mouseX; // Update ref value
    };

    containerRef.current.addEventListener("mousemove", onMouseMove);

    // Cleanup on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", onMouseMove);
        if (renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, []); // Empty dependency array is correct here

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100vh", position: "relative" }}
      />
    </>
  );
};

export default AboutMe;
