"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);

  let lastMouseX = 0;
  let rotationSpeed = 0;

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth + 50;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new GLTFLoader();
    loader.load(
      "/models/laptop.glb",
      (gltf) => {
        if (modelRef.current && sceneRef.current) {
          sceneRef.current.remove(modelRef.current);
          modelRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material?.dispose();
              }
            }
          });
        }

        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.position.set(0, 0, 0);
        model.rotation.y = Math.PI / -2;
        scene.add(model);
        modelRef.current = model;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    const animate = () => {
      if (
        modelRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        modelRef.current.rotation.y += rotationSpeed;
        rotationSpeed *= 0.95;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const mouseX = event.clientX;
      const deltaX = mouseX - lastMouseX;
      rotationSpeed = deltaX * 0.005;
      lastMouseX = mouseX;
    };

    containerRef.current.addEventListener("mousemove", onMouseMove);

    return () => {
      containerRef.current?.removeEventListener("mousemove", onMouseMove);

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (modelRef.current && sceneRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
        modelRef.current = null;
      }

      if (rendererRef.current) {
        rendererRef.current.renderLists.dispose();
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }

      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        sceneRef.current = null;
      }

      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }

      cameraRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "200px", height: "100px" }} />;
};

export default ThreeScene;
