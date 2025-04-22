"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../../_components/Navbar";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  let lastMouseX = 0;
  let rotationSpeed = useRef(0.05); // Start with some speed

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 15); // Increase the Z value to zoom out further (from 5 to 8, for example)

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Set high pixel ratio for better rendering
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load("/models/id.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(3, 3, 3);
      model.position.set(0, 0, 0);
      model.rotation.y = Math.PI / -2; // Initial rotation to adjust the model orientation
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
        // Apply the rotation to the model
        modelRef.current.rotation.y += rotationSpeed.current;

        // Ease the rotation speed to slow it down gradually
        if (rotationSpeed.current > 0.001) {
          rotationSpeed.current *= 0.99; // Easing effect (slowing down)
        }
      }

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction to change rotation speed
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const mouseX = event.clientX;
      const deltaX = mouseX - lastMouseX;
      rotationSpeed.current = deltaX * 0.005; // Adjust speed based on mouse movement
      lastMouseX = mouseX;
    };

    // Event listeners for mousemove
    containerRef.current.addEventListener("mousemove", onMouseMove);

    // Cleanup on component unmount
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      containerRef.current?.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

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
