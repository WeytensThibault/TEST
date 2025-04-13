"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface PedestalsProps {
  rotationY: number;
}

const Pedestals: React.FC<PedestalsProps> = ({ rotationY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const emptyRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const targetRotationY = useRef(rotationY);
  const currentRotationY = useRef(rotationY);

  useEffect(() => {
    targetRotationY.current = rotationY;
  }, [rotationY]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container contents to prevent stacking
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspectRatio = width / height;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 2000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "./models/LANDING.glb",
      (gltf) => {
        // Remove any existing model to prevent duplication
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
        scene.add(model);
        modelRef.current = model;

        const emptyObject = gltf.scene.getObjectByName("Empty");
        if (emptyObject) {
          emptyRef.current = emptyObject;
        } else {
          console.warn("Empty object not found in GLB");
        }

        const glbCamera = gltf.scene.getObjectByName("Camera");
        if (glbCamera && cameraRef.current) {
          cameraRef.current.position.copy(glbCamera.position);
          cameraRef.current.rotation.copy(glbCamera.rotation);
        }

        const glbLight = gltf.scene.getObjectByName("Area");
        if (glbLight) {
          scene.add(glbLight);
        } else {
          scene.add(new THREE.AmbientLight(0xffffff, 1));
        }
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        // Animate rotationY
        if (emptyRef.current) {
          const target = THREE.MathUtils.degToRad(targetRotationY.current);
          const current = currentRotationY.current;
          const lerped = THREE.MathUtils.lerp(current, target, 0.1); // 0.1 = smoothing factor
          emptyRef.current.rotation.y = lerped;
          currentRotationY.current = lerped;
        }

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

      // Dispose of renderer
      if (rendererRef.current) {
        rendererRef.current.renderLists.dispose();
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }

      // Clear scene
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        sceneRef.current = null;
      }

      // Clear container contents
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }

      // Clear camera and other refs
      cameraRef.current = null;
      emptyRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "50vh" }} />;
};

export default Pedestals;
