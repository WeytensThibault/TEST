"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const FaceModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 2;
    camera.position.set(0.03, -0.05, 5); // Closer camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    loader.load(
      "/models/face.glb",
      (gltf) => {
        const model = gltf.scene;
        model.rotation.y = Math.PI / 2;
        model.scale.set(0.6, 0.6, 0.6); // Adjust scale as needed
        scene.add(model);

        // Play animation once and stop at frame 40
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce, 1); // Play only once and stop
            action.clampWhenFinished = true; // Prevent looping after finishing

            action.play();

            // Set animation to stop at frame 40
            action.onFinished = () => {
              const finalFrame = 40;
              action.time =
                (finalFrame / action.getClip().duration) * clip.duration;
            };
          });
          mixerRef.current = mixer;
        } else {
          console.warn("No animations found in GLTF file.");
        }
      },
      undefined,
      (error) => {
        console.error("Error loading face.glb:", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute   w-full h-full z-30" />;
};

export default FaceModel;
