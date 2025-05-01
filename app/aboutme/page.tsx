"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";
import Image from "next/image";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "/models/cube.glb",
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

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex mt-25 flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-4 md:px-16 py-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/img/me.png"
            alt="About Me"
            width={400}
            height={400}
            className="shadow-lg border-2 border-white p-4 max-w-full h-auto"
          />
        </div>

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
            I&#39;m a {age}-year-old male originally from Belgium, raised on a
            farm where I learned the value of hard work early on. After
            graduating as a carpenter, I followed my passion for technology and
            pursued further studies in computer-related fields.
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
            Technologies), passionate about all things computer-related
            especially coding and 3D modeling.
          </p>
          <p className="mb-4">
            I&#39;m constantly working to expand my skill set, aiming to grow
            from backend development into cloud engineering, where I can build
            scalable, modern solutions that bridge creativity and performance.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div ref={containerRef} className="relative w-full h-[400px] " />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;
