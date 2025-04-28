"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous children
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/models/id.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(0, 0, 0);
      model.rotation.y = 1.7;
      scene.add(model);
      modelRef.current = model;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        const targetScale = 3;
        if (modelRef.current.scale.x < targetScale) {
          const newScale =
            modelRef.current.scale.x +
            (targetScale - modelRef.current.scale.x) * 0.05;
          modelRef.current.scale.set(newScale, newScale, newScale);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <div
          className="w-2/4"
          ref={containerRef}
          style={{ height: "100vh", position: "relative" }}
        />
        <div className="w-2/4 mx-auto flex flex-col justify-center">
          <h1 className="text-6xl font-bold animate-fadeIn underline mb-5">
            ABOUT ME
          </h1>
          <p className="animate-fadeIn text-2xl ">
            My name is <span className="font-bold">Thibault Weytens</span>
          </p>
          I am a student at Howest,
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;
