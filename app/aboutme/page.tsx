"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../_components/Navbar";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load("/models/id.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(3, 3, 3);
      model.position.set(0, 0, 0);
      model.rotation.y = 1.5;
      scene.add(model);
      modelRef.current = model;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      renderer.render(scene, camera);
    });

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
          <h1 className="text-6xl font-bold animate-fadeIn underline mb-5 after:content-['<span classname='flex background-white p-1 '></span>']">
            ABOUT ME
          </h1>

          <p>Thibault Weytens</p>
          <p>Student</p>
          <p>2003</p>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
