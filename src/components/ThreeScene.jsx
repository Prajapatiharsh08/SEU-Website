"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"

export default function ThreeScene() {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState()

    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x000000, 0.035)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.5

        // Post-processing
        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        // Bloom effect
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8, // strength
            0.3, // radius
            0.9, // threshold
        )
        composer.addPass(bloomPass)

        // Anti-aliasing
        const fxaaPass = new ShaderPass(FXAAShader)
        fxaaPass.material.uniforms["resolution"].value.x = 1 / (window.innerWidth * renderer.getPixelRatio())
        fxaaPass.material.uniforms["resolution"].value.y = 1 / (window.innerHeight * renderer.getPixelRatio())
        composer.addPass(fxaaPass)

        // Create main fluid-like structure
        const fluidGeometry = new THREE.IcosahedronGeometry(2, 20)

        // Custom shader material for fluid effect
        const fluidMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uColor1: { value: new THREE.Color(0x3a0ca3) },
                uColor2: { value: new THREE.Color(0x4361ee) },
                uColor3: { value: new THREE.Color(0x4cc9f0) },
            },
            vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vDistortion;
        
        //
        // Description : Array and textureless GLSL 2D/3D/4D simplex 
        //               noise functions.
        //      Author : Ian McEwan, Ashima Arts.
        //  Maintainer : ijm
        //     Lastmod : 20110822 (ijm)
        //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
        //               Distributed under the MIT License. See LICENSE file.
        //               https://github.com/ashima/webgl-noise
        // 
        
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec4 permute(vec4 x) {
          return mod289(((x*34.0)+1.0)*x);
        }
        
        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }
        
        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          
          // First corner
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;
          
          // Other corners
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          // Permutations
          i = mod289(i); 
          vec4 p = permute( permute( permute( 
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                
          // Gradients: 7x7 points over a square, mapped onto an octahedron.
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          
          // Normalise gradients
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          // Mix final noise value
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                        dot(p2,x2), dot(p3,x3) ) );
        }
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Calculate distortion
          float noise = snoise(position * 0.5 + uTime * 0.2);
          float mouseEffect = 0.0;
          
          // Add mouse interaction
          if (uMouse.x != 0.0 && uMouse.y != 0.0) {
            vec3 mousePos = vec3(uMouse.x, uMouse.y, 0.0);
            float dist = distance(position, mousePos);
            mouseEffect = 0.5 / (1.0 + dist * 2.0);
          }
          
          // Apply distortion
          float distortion = noise * 0.3 + mouseEffect;
          vDistortion = distortion;
          
          // Modify position
          vec3 pos = position;
          pos += normal * distortion;
          
          // Pulsating effect
          pos += normal * sin(uTime * 0.5) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vDistortion;
        
        void main() {
          // Create dynamic color gradient based on position and time
          float t = (vPosition.x + vPosition.y + vPosition.z) * 0.1 + uTime * 0.2;
          
          // Mix colors based on distortion and position
          vec3 color = mix(
            mix(uColor1, uColor2, sin(t) * 0.5 + 0.5),
            uColor3,
            vDistortion * 2.0
          );
          
          // Add glow effect
          float glow = 0.5 + 0.5 * sin(uTime * 0.5);
          color += glow * 0.1;
          
          // Add edge highlighting
          float edge = 1.0 - vDistortion;
          edge = pow(edge, 3.0);
          color += edge * 0.2;
          
          gl_FragColor = vec4(color, 0.8);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
        })

        const fluidMesh = new THREE.Mesh(fluidGeometry, fluidMaterial)
        scene.add(fluidMesh)

        // Create particles around the fluid
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 2000

        const posArray = new Float32Array(particlesCount * 3)
        const scaleArray = new Float32Array(particlesCount)

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3
            const radius = 3 + Math.random() * 3
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            posArray[i3] = radius * Math.sin(phi) * Math.cos(theta)
            posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            posArray[i3 + 2] = radius * Math.cos(phi)

            scaleArray[i] = Math.random()
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
        particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

        // Custom shader for particles
        const particlesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 8.0 * renderer.getPixelRatio() },
                uColor: { value: new THREE.Color(0xffffff) },
            },
            vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float scale;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          
          // Animate particles
          vec3 pos = position;
          float t = uTime * 0.2;
          
          // Spiral movement
          float angle = t + length(position) * 0.5;
          float radius = length(position.xz);
          float y = pos.y;
          
          pos.x = sin(angle) * radius;
          pos.z = cos(angle) * radius;
          pos.y = y + sin(t + radius) * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = uSize * scale * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform float uTime;
        varying vec3 vPosition;
        
        void main() {
          // Create circular points with soft edges
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Glow effect
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 1.5);
          
          // Color variation based on position and time
          float hue = fract(length(vPosition) * 0.1 + uTime * 0.1);
          vec3 color = 0.5 + 0.5 * sin(vec3(hue, hue + 0.33, hue + 0.67) * 6.28318);
          
          gl_FragColor = vec4(color, glow * 0.6);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Create energy streams
        const streamCount = 12
        const streamPoints = 100
        const streamCurves = []
        const streamMeshes = []

        for (let i = 0; i < streamCount; i++) {
            // Create a curved path
            const points = []
            const radius = 2.5 + Math.random() * 1.5
            const startAngle = Math.random() * Math.PI * 2
            const endAngle = startAngle + Math.PI * (1 + Math.random())

            for (let j = 0; j < streamPoints; j++) {
                const t = j / (streamPoints - 1)
                const angle = startAngle + (endAngle - startAngle) * t
                const x = Math.cos(angle) * radius * (1 + Math.sin(t * Math.PI) * 0.2)
                const y = Math.sin(t * Math.PI * 2) * 0.5
                const z = Math.sin(angle) * radius * (1 + Math.sin(t * Math.PI) * 0.2)

                points.push(new THREE.Vector3(x, y, z))
            }

            const curve = new THREE.CatmullRomCurve3(points)
            streamCurves.push(curve)

            // Create tube geometry along the curve
            const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, false)

            // Custom shader material for energy streams
            const tubeMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(0x4cc9f0) },
                    uLength: { value: curve.getLength() },
                },
                vertexShader: `
          uniform float uTime;
          uniform float uLength;
          
          varying vec2 vUv;
          varying float vProgress;
          
          void main() {
            vUv = uv;
            
            // Calculate progress along the tube
            vProgress = uv.x;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uLength;
          
          varying vec2 vUv;
          varying float vProgress;
          
          void main() {
            // Create flowing energy effect
            float flow = fract(vProgress * 3.0 - uTime * 0.5);
            
            // Pulse effect
            float pulse = smoothstep(0.0, 0.5, flow) * smoothstep(1.0, 0.5, flow);
            pulse = pow(pulse, 2.0);
            
            // Edge glow
            float edge = smoothstep(0.5, 0.0, abs(vUv.y - 0.5));
            
            // Combine effects
            float alpha = pulse * edge;
            
            // Color variation
            vec3 color = uColor + 0.2 * sin(vProgress * 20.0 + uTime);
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            })

            const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
            scene.add(tubeMesh)
            streamMeshes.push(tubeMesh)
        }

        // Mouse movement effect
        function onDocumentMouseMove(event) {
            // Update mouse position for shader
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1

            if (fluidMaterial.uniforms) {
                fluidMaterial.uniforms.uMouse.value.x = x * 3
                fluidMaterial.uniforms.uMouse.value.y = y * 3
            }

            setMousePosition({ x, y })
        }

        document.addEventListener("mousemove", onDocumentMouseMove)

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            composer.setSize(window.innerWidth, window.innerHeight)

            if (fxaaPass.material.uniforms) {
                fxaaPass.material.uniforms["resolution"].value.x = 1 / (window.innerWidth * renderer.getPixelRatio())
                fxaaPass.material.uniforms["resolution"].value.y = 1 / (window.innerHeight * renderer.getPixelRatio())
            }

            if (fluidMaterial.uniforms) {
                fluidMaterial.uniforms.uResolution.value.x = window.innerWidth
                fluidMaterial.uniforms.uResolution.value.y = window.innerHeight
            }
        }

        window.addEventListener("resize", onWindowResize)

        // Scroll effect
        let scrollY = window.scrollY

        function onScroll() {
            scrollY = window.scrollY
        }

        window.addEventListener("scroll", onScroll)

        // Initial animations with GSAP
        gsap.from(fluidMesh.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2.5,
            ease: "elastic.out(1, 0.5)",
        })

        gsap.from(camera.position, {
            z: 10,
            duration: 2.5,
            ease: "power3.inOut",
        })

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update shader uniforms
            if (fluidMaterial.uniforms) {
                fluidMaterial.uniforms.uTime.value = elapsedTime
            }

            if (particlesMaterial.uniforms) {
                particlesMaterial.uniforms.uTime.value = elapsedTime
            }

            // Update energy streams
            streamMeshes.forEach((mesh, i) => {
                if (mesh.material instanceof THREE.ShaderMaterial && mesh.material.uniforms) {
                    mesh.material.uniforms.uTime.value = elapsedTime
                }
            })

            // Rotate fluid mesh
            fluidMesh.rotation.y = elapsedTime * 0.1
            fluidMesh.rotation.z = elapsedTime * 0.05

            // // Mouse interaction
            // fluidMesh.rotation.x += (mousePosition.y * 0.5 - fluidMesh.rotation.x) * 0.02
            // fluidMesh.rotation.y += (mousePosition.x * 0.5 - fluidMesh.rotation.y) * 0.02

            // Scroll effect - scale and rotate based on scroll
            const scrollFactor = scrollY / 1000
            fluidMesh.scale.set(1 + scrollFactor * 0.1, 1 + scrollFactor * 0.1, 1 + scrollFactor * 0.1)

            // Render with post-processing
            composer.render()

            // Call animate again on the next frame
            window.requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener("resize", onWindowResize)
            window.removeEventListener("scroll", onScroll)
            document.removeEventListener("mousemove", onDocumentMouseMove)

            // Dispose geometries
            fluidGeometry.dispose()
            particlesGeometry.dispose()
            streamMeshes.forEach((mesh) => {
                if (mesh.geometry) mesh.geometry.dispose()
                if (mesh.material) mesh.material.dispose()
            })

            // Dispose materials
            if (fluidMaterial) fluidMaterial.dispose()
            if (particlesMaterial) particlesMaterial.dispose()

            // Dispose renderer and composer
            composer.dispose()
            renderer.dispose()
        }
    }, [])

    // Track mouse movement for interactive elements
    useEffect(() => {
        const handleMouseMove = (e) => {
            const root = document.documentElement
            root.style.setProperty("--x", `${e.clientX}px`)
            root.style.setProperty("--y", `${e.clientY}px`)
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}

