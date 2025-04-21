import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export default function ContactBackground() {
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

        // Create flowing waves
        const createWaves = () => {
            const waveGeometry = new THREE.PlaneGeometry(30, 30, 128, 128)
            const waveMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color("#0a1128") },
                    uColor2: { value: new THREE.Color("#4263eb") },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          // Simplex 3D Noise
          vec4 permute(vec4 x) {
            return mod(((x*34.0)+1.0)*x, 289.0);
          }
          
          vec4 taylorInvSqrt(vec4 r) {
            return 1.79284291400159 - 0.85373472095314 * r;
          }
          
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            
            // First corner
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            
            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            
            // Permutations
            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                    
            // Gradients
            float n_ = 1.0/7.0;
            vec3 ns = n_ * D.wyz - D.xzx;
            
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            
            // Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            
            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }
          
          void main() {
            vUv = uv;
            
            // Create wave effect
            vec3 pos = position;
            float noiseFreq = 0.8;
            float noiseAmp = 0.4;
            vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.3, pos.y * noiseFreq, uTime * 0.1);
            pos.z += snoise(noisePos) * noiseAmp;
            vElevation = pos.z;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixStrength = (vElevation + 0.4) * 0.5;
            vec3 color = mix(uColor1, uColor2, mixStrength);
            
            gl_FragColor = vec4(color, 0.8);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
            })

            const waves = new THREE.Mesh(waveGeometry, waveMaterial)
            waves.rotation.x = -Math.PI / 2
            waves.position.y = -2
            scene.add(waves)

            return { waves, material: waveMaterial }
        }

        const { waves, material: waveMaterial } = createWaves()

        // Create floating particles
        const createParticles = () => {
            const particlesGeometry = new THREE.BufferGeometry()
            const particlesCount = 300

            const positions = new Float32Array(particlesCount * 3)
            const scales = new Float32Array(particlesCount)

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3
                const radius = Math.random() * 15
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)

                positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 1 // Offset to match waves
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
            gl_PointSize = scale * uPixelRatio * (20.0 / -mvPosition.z);
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
            gl_FragColor = vec4(color, glow * 0.5);
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

        // Create light beams
        const createLightBeams = () => {
            const beamGroup = new THREE.Group()
            scene.add(beamGroup)

            const beamCount = 8
            const beams = []

            for (let i = 0; i < beamCount; i++) {
                const height = Math.random() * 10 + 5
                const width = Math.random() * 0.3 + 0.05

                const beamGeometry = new THREE.PlaneGeometry(width, height)
                const beamMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uColor: { value: new THREE.Color(i % 2 === 0 ? "#4263eb" : "#0047AB") },
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

            // Update waves
            if (waveMaterial.uniforms) {
                waveMaterial.uniforms.uTime.value = elapsedTime
            }

            // Update particles
            if (particlesMaterial.uniforms) {
                particlesMaterial.uniforms.uTime.value = elapsedTime
            }

            // Update light beams
            beams.forEach((beam) => {
                if (beam.material.uniforms) {
                    beam.material.uniforms.uTime.value = elapsedTime

                    // Pulse opacity
                    beam.material.uniforms.uOpacity.value =
                        beam.material.uniforms.uOpacity.value * 0.95 + (0.1 + 0.2 * Math.sin(elapsedTime + Math.random())) * 0.05
                }
            })

            // Subtle camera movement
            camera.position.y = Math.sin(elapsedTime * 0.2) * 0.2 + 1
            camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5

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
            waves.geometry.dispose()
            waveMaterial.dispose()

            if (particles.geometry) particles.geometry.dispose()
            if (particlesMaterial) particlesMaterial.dispose()

            beams.forEach((beam) => {
                if (beam.mesh.geometry) beam.mesh.geometry.dispose()
                if (beam.material) beam.material.dispose()
            })

            composer.dispose()
            renderer.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}
