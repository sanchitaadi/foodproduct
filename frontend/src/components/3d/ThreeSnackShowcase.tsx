"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BrandConceptId } from "@/types/brand";

interface ThreeSnackShowcaseProps {
  brandId: BrandConceptId;
  className?: string;
}

export function ThreeSnackShowcase({ brandId, className = "" }: ThreeSnackShowcaseProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasWebGL(false);
      return;
    }

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth || 360;
    const height = currentMount.clientHeight || 360;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(
      brandId === "flavourverse"
        ? 0xff9f1c
        : brandId === "purepantry"
        ? 0x1e3a2f
        : 0xff2a85,
      2,
      10
    );
    pointLight.position.set(-3, 2, 2);
    scene.add(pointLight);

    const snackGroup = new THREE.Group();
    scene.add(snackGroup);

    // Canister Body
    const cylinderGeo = new THREE.CylinderGeometry(0.9, 0.95, 2.4, 32);

    let cylinderColor = 0xff9f1c;
    let roughness = 0.3;
    let metalness = 0.2;

    if (brandId === "flavourverse") {
      cylinderColor = 0x1f0e1c;
      roughness = 0.2;
      metalness = 0.6;
    } else if (brandId === "purepantry") {
      cylinderColor = 0x1e3a2f;
      roughness = 0.6;
      metalness = 0.1;
    } else {
      cylinderColor = 0xffe600;
      roughness = 0.3;
      metalness = 0.1;
    }

    const canisterMat = new THREE.MeshStandardMaterial({
      color: cylinderColor,
      roughness,
      metalness,
    });

    const canister = new THREE.Mesh(cylinderGeo, canisterMat);
    snackGroup.add(canister);

    // Canister Lid
    const lidGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.15, 32);
    const lidMat = new THREE.MeshStandardMaterial({
      color: brandId === "flavourverse" ? 0xff9f1c : brandId === "purepantry" ? 0x4a5844 : 0x000000,
      metalness: 0.8,
      roughness: 0.2,
    });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.y = 1.25;
    snackGroup.add(lid);

    // Ring Banner
    const ringGeo = new THREE.CylinderGeometry(0.91, 0.91, 0.9, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color:
        brandId === "flavourverse"
          ? 0xff9f1c
          : brandId === "purepantry"
          ? 0xfaf7f2
          : 0xff2a85,
      roughness: 0.5,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.1;
    snackGroup.add(ring);

    // Orbiting Crisps / Seeds
    const particleCount = 14;
    const particles: THREE.Mesh[] = [];
    const crispGeo = new THREE.DodecahedronGeometry(0.12);
    const crispMat = new THREE.MeshStandardMaterial({
      color: brandId === "flavourverse" ? 0xff9f1c : brandId === "purepantry" ? 0xc88d6a : 0xff2a85,
      roughness: 0.6,
    });

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(crispGeo, crispMat);
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.6 + Math.sin(i) * 0.3;
      p.position.set(Math.cos(angle) * radius, (Math.sin(i * 2) * 0.8), Math.sin(angle) * radius);
      snackGroup.add(p);
      particles.push(p);
    }

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      snackGroup.rotation.y = elapsed * 0.45;
      snackGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      particles.forEach((p, idx) => {
        p.rotation.x += 0.02;
        p.rotation.y += 0.03;
        p.position.y += Math.sin(elapsed * 2 + idx) * 0.003;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [isClient, brandId]);

  if (!hasWebGL) {
    return (
      <div className={`flex items-center justify-center p-6 rounded-2xl bg-black/5 ${className}`}>
        <span className="text-xs font-mono text-neutral-400">3D preview unavailable</span>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[360px] flex items-center justify-center select-none ${className}`}
    />
  );
}

export default ThreeSnackShowcase;
