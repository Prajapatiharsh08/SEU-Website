import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

export default function ContactMap() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,
            1000,
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Create 3D map
        const createMap = () => {
            const group = new THREE.Group()
            scene.add(group)

            // Create base plane for map
            const mapGeometry = new THREE.PlaneGeometry(8, 5, 32, 32)
            const mapMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color("#0a1128") },
                    uColor2: { value: new THREE.Color("#4263eb") },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }
          
          void main() {
            vUv = uv;
            
            // Create grid pattern with slight elevation
            float gridSize = 20.0;
            vec2 gridUv = floor(vUv * gridSize) / gridSize;
            float r = random(gridUv);
            
            // Elevation based on grid
            float elevation = r * 0.2 * (0.5 + 0.5 * sin(uTime * 0.5 + r * 10.0));
            vElevation = elevation;
            
            // Apply elevation to z-coordinate
            vec3 pos = position;
            pos.z += elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Create grid lines
            float gridSize = 20.0;
            vec2 grid = fract(vUv * gridSize);
            float gridLine = step(0.95, max(grid.x, grid.y));
            
            // Mix colors based on elevation and grid
            vec3 color = mix(uColor1, uColor2, vElevation * 2.0 + 0.2);
            color = mix(color, vec3(0.5, 0.7, 1.0), gridLine * 0.5);
            
            // Add pulsing effect to certain areas
            float pulse = 0.5 + 0.5 * sin(uTime + vUv.x * 10.0 + vUv.y * 10.0);
            if (distance(vUv, vec2(0.5, 0.5)) < 0.1) {
              color = mix(color, vec3(0.7, 0.8, 1.0), pulse * 0.5);
            }
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
            })

            const map = new THREE.Mesh(mapGeometry, mapMaterial)
            group.add(map)

            // Add location marker
            const markerGeometry = new THREE.CylinderGeometry(0.1, 0.3, 0.5, 16)
            const markerMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            
            // Add hover effect
            vec3 pos = position;
            pos.y += sin(uTime * 2.0) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            // Create gradient from bottom to top
            float gradient = vUv.y;
            
            // Pulse effect
            float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
            
            // Color gradient from red to orange
            vec3 color = mix(vec3(0.8, 0.2, 0.2), vec3(1.0, 0.5, 0.0), gradient);
            
            // Add glow
            color += vec3(0.3, 0.1, 0.0) * pulse;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
            })

            const marker = new THREE.Mesh(markerGeometry, markerMaterial)
            marker.position.set(0, 0, 0.3)
            marker.rotation.x = Math.PI / 2
            group.add(marker)

            // Add pulse ring around marker
            const ringGeometry = new THREE.RingGeometry(0.2, 0.3, 32)
            const ringMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            // Create pulsing effect
            float pulse = fract(uTime * 0.5);
            float alpha = 1.0 - pulse;
            
            // Color
            vec3 color = mix(vec3(1.0, 0.5, 0.0), vec3(0.8, 0.2, 0.2), pulse);
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
            })

            const ring = new THREE.Mesh(ringGeometry, ringMaterial)
            ring.position.set(0, 0, 0.31)
            ring.rotation.x = Math.PI / 2
            group.add(ring)

            // Add expanding rings for animation
            const expandingRings = []
            for (let i = 0; i < 3; i++) {
                const expandingRingGeometry = new THREE.RingGeometry(0.2, 0.25, 32)
                const expandingRingMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uIndex: { value: i },
                    },
                    vertexShader: `
            uniform float uTime;
            uniform float uIndex;
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              
              // Scale based on time and index
              float scale = fract(uTime * 0.3 + uIndex * 0.33);
              vec3 pos = position * (1.0 + scale * 3.0);
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
                    fragmentShader: `
            uniform float uTime;
            uniform float uIndex;
            varying vec2 vUv;
            
            void main() {
              // Fade out as it expands
              float scale = fract(uTime * 0.3 + uIndex * 0.33);
              float alpha = 1.0 - scale;
              
              // Color
              vec3 color = vec3(1.0, 0.5, 0.0);
              
              gl_FragColor = vec4(color, alpha * 0.5);
            }
          `,
                    transparent: true,
                    side: THREE.DoubleSide,
                })

                const expandingRing = new THREE.Mesh(expandingRingGeometry, expandingRingMaterial)
                expandingRing.position.set(0, 0, 0.32)
                expandingRing.rotation.x = Math.PI / 2
                group.add(expandingRing)
                expandingRings.push({ mesh: expandingRing, material: expandingRingMaterial })
            }

            return {
                group,
                map: { mesh: map, material: mapMaterial },
                marker: { mesh: marker, material: markerMaterial },
                ring: { mesh: ring, material: ringMaterial },
                expandingRings,
            }
        }

        const { map, marker, ring, expandingRings } = createMap()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update shader uniforms
            if (map.material.uniforms) {
                map.material.uniforms.uTime.value = elapsedTime
            }

            if (marker.material.uniforms) {
                marker.material.uniforms.uTime.value = elapsedTime
            }

            if (ring.material.uniforms) {
                ring.material.uniforms.uTime.value = elapsedTime
            }

            expandingRings.forEach((ring) => {
                if (ring.material.uniforms) {
                    ring.material.uniforms.uTime.value = elapsedTime
                }
            })

            // Rotate camera slightly for dynamic effect
            camera.position.x = Math.sin(elapsedTime * 0.2) * 0.5
            camera.position.y = Math.cos(elapsedTime * 0.2) * 0.3
            camera.lookAt(0, 0, 0)

            // Render
            renderer.render(scene, camera)
            window.requestAnimationFrame(animate)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            if (!canvasRef.current) return

            camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)

            // Dispose resources
            map.mesh.geometry.dispose()
            map.material.dispose()

            marker.mesh.geometry.dispose()
            marker.material.dispose()

            ring.mesh.geometry.dispose()
            ring.material.dispose()

            expandingRings.forEach((ring) => {
                if (ring.mesh.geometry) ring.mesh.geometry.dispose()
                if (ring.material) ring.material.dispose()
            })

            renderer.dispose()
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8"
        >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Our Location
            </h2>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-blue-900/50">
                <canvas ref={canvasRef} className="w-full h-full" />

                {/* Interactive overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-blue-900/50 backdrop-blur-sm">
                    <motion.a
                        href="https://maps.app.goo.gl/DNectsenrGUoUWgB7?g_st=awb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg text-white font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Open in Google Maps
                    </motion.a>
                </div>
            </div>

            {/* <div className="mt-4 text-white/70">
                <p>123 Innovation Drive, Tech Hub</p>
                <p>Digital City, 10010</p>
            </div> */}
        </motion.div>
    )
}
