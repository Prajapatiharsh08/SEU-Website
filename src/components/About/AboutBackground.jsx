import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export default function AboutBackground() {
    const canvasRef = useRef(null)

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

        // Create hexagonal grid background
        const createHexagonalGrid = () => {
            const group = new THREE.Group()
            scene.add(group)

            const hexGeometry = new THREE.CircleGeometry(0.2, 6)
            const hexMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color("#0a1128") },
                    uHighlight: { value: new THREE.Color("#4263eb") },
                },
                vertexShader: `
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uHighlight;
          varying vec2 vUv;
          
          void main() {
            // Distance from center
            float dist = length(vUv - vec2(0.5));
            
            // Create hexagon shape
            float hexEdge = smoothstep(0.5, 0.48, dist);
            
            // Pulse effect
            float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
            
            // Mix colors based on pulse
            vec3 color = mix(uColor, uHighlight, pulse * 0.3);
            
            // Edge highlight
            float edge = smoothstep(0.48, 0.47, dist);
            color = mix(color, uHighlight, edge * 0.5);
            
            gl_FragColor = vec4(color, hexEdge * 0.5);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
            })

            const rows = 20
            const cols = 20
            const spacing = 0.5

            for (let i = -rows / 2; i < rows / 2; i++) {
                for (let j = -cols / 2; j < cols / 2; j++) {
                    const hex = new THREE.Mesh(hexGeometry, hexMaterial.clone())

                    // Position in grid with offset for every other row
                    hex.position.x = j * spacing * 1.5
                    hex.position.z = i * spacing * Math.sqrt(3)

                    // Offset every other row
                    if (i % 2 !== 0) {
                        hex.position.x += spacing * 0.75
                    }

                    // Random y position for depth
                    hex.position.y = Math.random() * 2 - 4

                    // Random rotation
                    hex.rotation.x = Math.PI / 2

                    group.add(hex)
                }
            }

            return { group, materials: [hexMaterial] }
        }

        const { group: hexGrid, materials: hexMaterials } = createHexagonalGrid()

        // Create floating light beams
        const createLightBeams = () => {
            const beamGroup = new THREE.Group()
            scene.add(beamGroup)

            const beamCount = 10
            const beams = []

            for (let i = 0; i < beamCount; i++) {
                const height = Math.random() * 10 + 5
                const width = Math.random() * 0.3 + 0.05

                const beamGeometry = new THREE.PlaneGeometry(width, height)
                const beamMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uColor: { value: new THREE.Color("#4263eb") },
                        uOpacity: { value: Math.random() * 0.3 + 0.1 },
                    },
                    vertexShader: `
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
                    fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uOpacity;
            varying vec2 vUv;
            
            void main() {
              // Create gradient effect
              float gradient = smoothstep(0.0, 1.0, vUv.y);
              
              // Add some variation
              float noise = sin(vUv.y * 20.0 + uTime) * 0.05;
              
              // Final color with opacity
              vec3 color = uColor;
              float alpha = (gradient + noise) * uOpacity;
              
              gl_FragColor = vec4(color, alpha);
            }
          `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                })

                const beam = new THREE.Mesh(beamGeometry, beamMaterial)

                // Position randomly
                const angle = (i / beamCount) * Math.PI * 2
                const radius = Math.random() * 5 + 3
                beam.position.x = Math.cos(angle) * radius
                beam.position.z = Math.sin(angle) * radius
                beam.position.y = Math.random() * 2 - 1

                // Random rotation
                beam.rotation.z = Math.random() * Math.PI

                beamGroup.add(beam)
                beams.push({ mesh: beam, material: beamMaterial })
            }

            return { group: beamGroup, beams }
        }

        const { beams } = createLightBeams()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update hexagonal grid
            hexMaterials.forEach((material) => {
                if (material.uniforms) {
                    material.uniforms.uTime.value = elapsedTime
                }
            })

            // Update light beams
            beams.forEach((beam) => {
                if (beam.material.uniforms) {
                    beam.material.uniforms.uTime.value = elapsedTime

                    // Pulse opacity
                    beam.material.uniforms.uOpacity.value =
                        beam.material.uniforms.uOpacity.value * 0.95 + (0.1 + 0.2 * Math.sin(elapsedTime + Math.random())) * 0.05
                }
            })

            // Rotate grid slowly
            hexGrid.rotation.z = elapsedTime * 0.05

            // Camera movement
            camera.position.y = Math.sin(elapsedTime * 0.2) * 0.5

            // Render with post-processing
            composer.render()

            window.requestAnimationFrame(animate)
        }

        animate()

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            composer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            composer.dispose()
            renderer.dispose()
            scene.clear()
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}
