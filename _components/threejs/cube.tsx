"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Cube = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container contents to prevent stacking
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    // Initialize scene and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "./models/cube.glb",
      (gltf) => {
        // If the model is already loaded, remove it before adding the new one
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        const model = gltf.scene;

        // Traverse through the model to replace materials with MeshBasicMaterial
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({
              map: child.material.map, // Preserve the texture map
              wireframe: false, // Disable wireframe mode
            });
            child.castShadow = false; // Disable shadow casting
            child.receiveShadow = false; // Disable shadow receiving
          }
        });

        scene.add(model);
        modelRef.current = model;

        // Retrieve the camera from the GLB file (if available)
        const glbCamera = gltf.scene.getObjectByName(
          "Camera"
        ) as THREE.PerspectiveCamera;
        if (glbCamera) {
          // Set the loaded camera as the scene's camera
          cameraRef.current = glbCamera;
        } else {
          // If no camera in GLB, set a default camera
          const defaultCamera = new THREE.PerspectiveCamera(
            35,
            aspectRatio,
            0.1,
            2000
          );
          defaultCamera.position.set(0, 1, 3);
          cameraRef.current = defaultCamera;
        }

        // Set camera reference
        const camera = cameraRef.current;
        if (camera) {
          camera.aspect = aspectRatio;
          camera.updateProjectionMatrix();
        }
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Rotate the model around the Y-axis
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Dispose of model
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

      // Clear scene
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

      // Clear camera
      cameraRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "50vh" }} />;
};

export default Cube;
