"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

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
    camera.position.z = 4; // Adjust camera position as needed

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "/models/cube.glb", // Adjust the path to your model
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);

      // Slowly rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || 1;
      const newHeight = containerRef.current?.clientHeight || 1;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const age = new Date().getFullYear() - 2003;

  // Cursor blink logic
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000); // Toggle every 1 second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex mt-25 flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-4 md:px-16 py-10">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/img/me.png"
            alt="About Me"
            className="shadow-lg border-2 border-white p-4 max-w-full h-auto"
          />
        </div>

        {/* Right Section: Text */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 flex flex-col justify-center">
          <h1 className="relative text-4xl md:text-6xl mb-4 font-code font-bold">
            ~Whoami{" "}
            <span
              className="text-4xl absolute top-0"
              style={{ opacity: showCursor ? 1 : 0 }}
            >
              █
            </span>
          </h1>

          <p className="mb-4">
            Hello! My name is{" "}
            <span className="font-bold">Thibault Weytens</span>.
          </p>
          <p className="mb-4">
            I am a {age} year old male from Belgium, grew up on a farm,
            graduated as a carpenter, but continued my love for computers by
            studying in a more computer relative studies.
          </p>
        </div>
      </div>

      <div className="flex mt-25 flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-4 md:px-16 py-10">
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold underline mb-5">
            My studies
          </h1>
          <p className="mb-4">
            I am a student at Howest, studying MCT (Multimedia and Creative
            Technologies). I am passionate about everything with a computer,
            especially Coding and 3D modeling.
          </p>
        </div>

        {/* 3D Model Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div ref={containerRef} className="relative w-full h-[400px] " />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;
