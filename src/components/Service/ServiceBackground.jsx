import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"

export default function ServiceBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x000000, 0.02)

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 30
        camera.position.y = 5

        // Renderer setup
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

        // Custom shader for final pass
        const finalPass = new ShaderPass({
            uniforms: {
                tDiffuse: { value: null },
                time: { value: 0 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Subtle distortion
          uv.x += sin(uv.y * 10.0 + time * 0.1) * 0.003;
          uv.y += cos(uv.x * 10.0 + time * 0.1) * 0.003;
          
          vec4 color = texture2D(tDiffuse, uv);
          
          // Add vignette effect
          float dist = length(vUv - 0.5);
          color.rgb *= smoothstep(0.8, 0.2, dist);
          
          gl_FragColor = color;
        }
      `,
        })
        composer.addPass(finalPass)

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 2000

        const positions = new Float32Array(particlesCount * 3)
        const colors = new Float32Array(particlesCount * 3)
        const scales = new Float32Array(particlesCount)

        const color1 = new THREE.Color("#4263eb")
        const color2 = new THREE.Color("#3a0ca3")
        const color3 = new THREE.Color("#4cc9f0")

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3

            // Position particles in a sphere
            const radius = Math.random() * 50 + 10
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 10 // Offset y position
            positions[i3 + 2] = radius * Math.cos(phi)

            // Random color from palette
            const colorChoice = Math.floor(Math.random() * 3)
            let particleColor
            if (colorChoice === 0) particleColor = color1
            else if (colorChoice === 1) particleColor = color2
            else particleColor = color3

            colors[i3] = particleColor.r
            colors[i3 + 1] = particleColor.g
            colors[i3 + 2] = particleColor.b

            // Random scale
            scales[i] = Math.random() * 2 + 0.5
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
        particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

        // Particle material with custom shader
        const particlesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        attribute vec3 color;
        attribute float scale;
        
        varying vec3 vColor;
        
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          
          // Animate position
          vec3 pos = position;
          
          // Slow rotation around y-axis
          float angle = time * 0.05;
          float x = pos.x * cos(angle) - pos.z * sin(angle);
          float z = pos.x * sin(angle) + pos.z * cos(angle);
          pos.x = x;
          pos.z = z;
          
          // Add subtle wave motion
          pos.y += sin(time * 0.2 + pos.x * 0.05 + pos.z * 0.05) * 2.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Size attenuation
          gl_PointSize = scale * pixelRatio * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular points with soft edges
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Glow effect
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 1.5);
          
          gl_FragColor = vec4(vColor, glow * 0.7);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        // Create light beams
        const createLightBeams = () => {
            const beamGroup = new THREE.Group()
            scene.add(beamGroup)

            const beamCount = 8
            const beams = []

            for (let i = 0; i < beamCount; i++) {
                const angle = (i / beamCount) * Math.PI * 2
                const radius = 30

                const startPoint = new THREE.Vector3(Math.cos(angle) * radius, -20, Math.sin(angle) * radius)

                const endPoint = new THREE.Vector3(Math.cos(angle) * radius * 0.2, 30, Math.sin(angle) * radius * 0.2)

                const beamGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8)
                beamGeometry.rotateX(Math.PI / 2)

                const colorIndex = i % 3
                let beamColor
                if (colorIndex === 0) beamColor = color1
                else if (colorIndex === 1) beamColor = color2
                else beamColor = color3

                const beamMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        color: { value: beamColor },
                    },
                    vertexShader: `
            uniform float time;
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
                    fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            
            void main() {
              // Create flowing energy effect
              float flow = fract(vUv.x * 3.0 - time * 0.5);
              
              // Pulse effect
              float pulse = smoothstep(0.0, 0.5, flow) * smoothstep(1.0, 0.5, flow);
              pulse = pow(pulse, 2.0);
              
              // Edge glow
              float edge = smoothstep(0.5, 0.0, abs(vUv.y - 0.5));
              
              // Combine effects
              float alpha = pulse * edge * 0.5;
              
              // Color variation
              vec3 finalColor = color + 0.2 * sin(vUv.x * 20.0 + time);
              
              gl_FragColor = vec4(finalColor, alpha);
            }
          `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                })

                const beam = new THREE.Mesh(beamGeometry, beamMaterial)

                // Position and scale the beam
                const direction = endPoint.clone().sub(startPoint)
                const distance = direction.length()

                beam.position.copy(startPoint.clone().add(direction.multiplyScalar(0.5)))
                beam.scale.set(1, 1, distance)
                beam.lookAt(endPoint)

                beamGroup.add(beam)
                beams.push({ mesh: beam, material: beamMaterial, startPoint, endPoint })
            }

            return beams
        }

        const beams = createLightBeams()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update particle uniforms
            if (particles.material instanceof THREE.ShaderMaterial) {
                particles.material.uniforms.time.value = elapsedTime
            }

            // Update beam uniforms and positions
            beams.forEach((beam) => {
                if (beam.material instanceof THREE.ShaderMaterial) {
                    beam.material.uniforms.time.value = elapsedTime
                }

                // Add subtle movement to beams
                const startOffset = new THREE.Vector3(Math.sin(elapsedTime * 0.2) * 2, 0, Math.cos(elapsedTime * 0.3) * 2)
                const endOffset = new THREE.Vector3(
                    Math.sin(elapsedTime * 0.3 + 1) * 2,
                    Math.sin(elapsedTime * 0.2) * 2,
                    Math.cos(elapsedTime * 0.2 + 1) * 2,
                )

                const newStart = beam.startPoint.clone().add(startOffset)
                const newEnd = beam.endPoint.clone().add(endOffset)

                const direction = newEnd.clone().sub(newStart)
                const distance = direction.length()

                beam.mesh.position.copy(newStart.clone().add(direction.multiplyScalar(0.5)))
                beam.mesh.scale.set(1, 1, distance)
                beam.mesh.lookAt(newEnd)
            })

            // Update final pass time uniform
            if (finalPass.material.uniforms) {
                finalPass.material.uniforms.time.value = elapsedTime
            }

            // Render with post-processing
            composer.render()

            window.requestAnimationFrame(animate)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            composer.setSize(window.innerWidth, window.innerHeight)

            // Update particle size
            if (particles.material instanceof THREE.ShaderMaterial) {
                particles.material.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2)
            }
        }

        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)

            // Dispose of all resources
            renderer.dispose()
            composer.dispose()

            // Dispose particles
            if (particles.geometry) particles.geometry.dispose()
            if (particles.material) particles.material.dispose()

            // Dispose beams
            beams.forEach((beam) => {
                if (beam.mesh.geometry) beam.mesh.geometry.dispose()
                if (beam.mesh.material) beam.mesh.material.dispose()
            })

            scene.clear()
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />
}
