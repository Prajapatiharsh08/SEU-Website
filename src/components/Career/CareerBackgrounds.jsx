import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export default function CareerBackgrounds() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x000000, 0.02)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5
        camera.position.y = 1

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2

        // Post-processing
        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.7, // strength
            0.3, // radius
            0.8, // threshold
        )
        composer.addPass(bloomPass)

        // Create abstract network visualization
        const createNetwork = () => {
            const group = new THREE.Group()
            scene.add(group)

            // Create nodes
            const nodeCount = 50
            const nodes = []
            const nodePositions = []
            const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16)

            for (let i = 0; i < nodeCount; i++) {
                const nodeMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uColor: { value: new THREE.Color(i % 3 === 0 ? "#4263eb" : i % 3 === 1 ? "#3a0ca3" : "#4cc9f0") },
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
            varying vec2 vUv;
            
            void main() {
              // Create pulsing glow effect
              float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
              
              // Create gradient from center
              float dist = length(vUv - vec2(0.5));
              float alpha = smoothstep(0.5, 0.0, dist);
              
              // Final color with pulse
              vec3 color = uColor * (1.0 + pulse * 0.2);
              
              gl_FragColor = vec4(color, alpha);
            }
          `,
                    transparent: true,
                })

                const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

                // Position nodes in a 3D space
                const radius = 5
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)

                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.sin(phi) * Math.sin(theta)
                const z = radius * Math.cos(phi)

                node.position.set(x, y, z)
                nodePositions.push(new THREE.Vector3(x, y, z))

                group.add(node)
                nodes.push({ mesh: node, material: nodeMaterial })
            }

            // Create connections between nodes
            const connections = []
            const connectionsMaterial = new THREE.LineBasicMaterial({
                color: 0x4263eb,
                transparent: true,
                opacity: 0.2,
            })

            // Connect each node to its closest neighbors
            for (let i = 0; i < nodeCount; i++) {
                const distances = []

                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        distances.push({
                            index: j,
                            distance: nodePositions[i].distanceTo(nodePositions[j]),
                        })
                    }
                }

                // Sort by distance and connect to closest 3 nodes
                distances.sort((a, b) => a.distance - b.distance)

                for (let k = 0; k < Math.min(3, distances.length); k++) {
                    const j = distances[k].index

                    // Create line geometry
                    const points = [nodePositions[i].clone(), nodePositions[j].clone()]
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

                    const line = new THREE.Line(lineGeometry, connectionsMaterial)
                    group.add(line)
                    connections.push({ line, startIndex: i, endIndex: j, geometry: lineGeometry })
                }
            }

            return { group, nodes, connections, nodePositions }
        }

        const { nodes, connections, nodePositions } = createNetwork()

        // Create floating particles
        const createParticles = () => {
            const particlesGeometry = new THREE.BufferGeometry()
            const particlesCount = 200

            const positions = new Float32Array(particlesCount * 3)
            const scales = new Float32Array(particlesCount)

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3
                const radius = Math.random() * 8
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)

                positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
                positions[i3 + 2] = radius * Math.cos(phi)

                scales[i] = Math.random()
            }

            particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
            particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

            const particlesMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                },
                vertexShader: `
          attribute float scale;
          uniform float uTime;
          uniform float uPixelRatio;
          
          void main() {
            // Animate position
            vec3 pos = position;
            
            // Subtle movement
            float angle = uTime * 0.1 + length(position) * 0.2;
            float radius = length(position.xz);
            float y = pos.y;
            
            pos.x = sin(angle * 0.2) * radius;
            pos.z = cos(angle * 0.2) * radius;
            pos.y = y + sin(uTime * 0.1 + radius) * 0.2;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = scale * uPixelRatio * (15.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
                fragmentShader: `
          void main() {
            // Create circular points with soft edges
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            // Glow effect
            float glow = 1.0 - dist * 2.0;
            glow = pow(glow, 1.5);
            
            vec3 color = vec3(0.2, 0.4, 0.8);
            gl_FragColor = vec4(color, glow * 0.4);
          }
        `,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            })

            const particles = new THREE.Points(particlesGeometry, particlesMaterial)
            scene.add(particles)

            return { particles, material: particlesMaterial }
        }

        const { particles, material: particlesMaterial } = createParticles()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update node materials
            nodes.forEach((node, index) => {
                if (node.material.uniforms) {
                    node.material.uniforms.uTime.value = elapsedTime
                }

                // Add subtle movement to nodes
                const initialPosition = nodePositions[index]
                node.mesh.position.x = initialPosition.x + Math.sin(elapsedTime * 0.5 + index) * 0.1
                node.mesh.position.y = initialPosition.y + Math.cos(elapsedTime * 0.5 + index) * 0.1
                node.mesh.position.z = initialPosition.z + Math.sin(elapsedTime * 0.3 + index) * 0.1
            })

            // Update connections
            connections.forEach((connection) => {
                const startNode = nodes[connection.startIndex].mesh
                const endNode = nodes[connection.endIndex].mesh

                // Update line geometry to match node positions
                const points = [startNode.position.clone(), endNode.position.clone()]
                connection.geometry.setFromPoints(points)
                connection.geometry.attributes.position.needsUpdate = true
            })

            // Update particles
            if (particlesMaterial.uniforms) {
                particlesMaterial.uniforms.uTime.value = elapsedTime
            }

            // Subtle camera movement
            camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5
            camera.position.y = Math.cos(elapsedTime * 0.1) * 0.5 + 1
            camera.lookAt(0, 0, 0)

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

            if (particlesMaterial.uniforms) {
                particlesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)

            // Dispose resources
            nodes.forEach((node) => {
                if (node.mesh.geometry) node.mesh.geometry.dispose()
                if (node.material) node.material.dispose()
            })

            connections.forEach((connection) => {
                if (connection.geometry) connection.geometry.dispose()
            })

            if (particles.geometry) particles.geometry.dispose()
            if (particlesMaterial) particlesMaterial.dispose()

            composer.dispose()
            renderer.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}
