import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import * as THREE from "three"

export default function CareerHero() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const textRef = useRef(null)

    // 3D animation for the hero section
    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Create floating 3D objects representing career growth
        const createCareerObjects = () => {
            const group = new THREE.Group()
            scene.add(group)

            // Create ladder/staircase representing career growth
            const createLadder = () => {
                const ladderGroup = new THREE.Group()

                // Create steps
                const stepCount = 5
                const stepWidth = 3
                const stepHeight = 0.1
                const stepDepth = 0.5
                const stepSpacing = 0.5

                for (let i = 0; i < stepCount; i++) {
                    const stepGeometry = new THREE.BoxGeometry(stepWidth - i * 0.4, stepHeight, stepDepth)
                    const stepMaterial = new THREE.ShaderMaterial({
                        uniforms: {
                            uTime: { value: 0 },
                            uColor1: { value: new THREE.Color("#4263eb") },
                            uColor2: { value: new THREE.Color("#3a0ca3") },
                            uStep: { value: i / (stepCount - 1) },
                        },
                        vertexShader: `
              uniform float uTime;
              varying vec2 vUv;
              
              void main() {
                vUv = uv;
                
                // Add subtle movement
                vec3 pos = position;
                pos.y += sin(uTime * 0.5 + position.x) * 0.02;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
                        fragmentShader: `
              uniform float uTime;
              uniform vec3 uColor1;
              uniform vec3 uColor2;
              uniform float uStep;
              varying vec2 vUv;
              
              void main() {
                // Create gradient based on step position
                vec3 color = mix(uColor1, uColor2, uStep);
                
                // Add pulsing effect
                float pulse = 0.5 + 0.5 * sin(uTime * 0.5 + uStep * 10.0);
                color = mix(color, vec3(1.0, 1.0, 1.0), pulse * 0.1);
                
                // Add edge highlight
                float edge = max(
                  smoothstep(0.9, 1.0, vUv.x),
                  max(
                    smoothstep(0.0, 0.1, vUv.x),
                    max(
                      smoothstep(0.9, 1.0, vUv.y),
                      smoothstep(0.0, 0.1, vUv.y)
                    )
                  )
                );
                color = mix(color, vec3(1.0), edge * 0.5);
                
                gl_FragColor = vec4(color, 1.0);
              }
            `,
                    })

                    const step = new THREE.Mesh(stepGeometry, stepMaterial)
                    step.position.set(0, i * stepSpacing, 0)
                    ladderGroup.add(step)
                }

                // Add person climbing the ladder
                const personGeometry = new THREE.SphereGeometry(0.2, 16, 16)
                const personMaterial = new THREE.ShaderMaterial({
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
              // Create gradient
              float gradient = length(vUv - vec2(0.5));
              
              // Glow effect
              vec3 color = vec3(1.0, 1.0, 1.0);
              float alpha = 1.0 - gradient * 2.0;
              
              gl_FragColor = vec4(color, alpha);
            }
          `,
                    transparent: true,
                })

                const person = new THREE.Mesh(personGeometry, personMaterial)
                ladderGroup.add(person)

                // Center the ladder
                ladderGroup.position.set(0, -1, 0)

                return { group: ladderGroup, person, steps: ladderGroup.children.slice(0, stepCount) }
            }

            const { group: ladderGroup, person, steps } = createLadder()
            group.add(ladderGroup)

            // Create floating icons representing different careers
            const createCareerIcons = () => {
                const iconsGroup = new THREE.Group()

                const iconShapes = [
                    // Code icon (simplified)
                    () => {
                        const shape = new THREE.Shape()
                        shape.moveTo(-0.3, -0.3)
                        shape.lineTo(0.3, -0.3)
                        shape.lineTo(0.3, 0.3)
                        shape.lineTo(-0.3, 0.3)
                        shape.lineTo(-0.3, -0.3)

                        const hole = new THREE.Path()
                        hole.moveTo(-0.1, -0.1)
                        hole.lineTo(0.1, -0.1)
                        hole.lineTo(0.1, 0.1)
                        hole.lineTo(-0.1, 0.1)
                        hole.lineTo(-0.1, -0.1)

                        shape.holes.push(hole)

                        return shape
                    },
                    // Design icon (circle)
                    () => {
                        const shape = new THREE.Shape()
                        const radius = 0.3

                        shape.absarc(0, 0, radius, 0, Math.PI * 2, false)

                        return shape
                    },
                    // Marketing icon (triangle)
                    () => {
                        const shape = new THREE.Shape()

                        shape.moveTo(0, 0.3)
                        shape.lineTo(-0.3, -0.3)
                        shape.lineTo(0.3, -0.3)
                        shape.lineTo(0, 0.3)

                        return shape
                    },
                ]

                const iconPositions = [new THREE.Vector3(-2, 1, 0), new THREE.Vector3(2, 1, 0), new THREE.Vector3(0, 2, 0)]

                const icons = []

                for (let i = 0; i < iconShapes.length; i++) {
                    const shape = iconShapes[i]()
                    const geometry = new THREE.ShapeGeometry(shape)
                    const material = new THREE.ShaderMaterial({
                        uniforms: {
                            uTime: { value: 0 },
                            uColor: { value: new THREE.Color(i === 0 ? "#4263eb" : i === 1 ? "#4cc9f0" : "#3a0ca3") },
                        },
                        vertexShader: `
              uniform float uTime;
              varying vec2 vUv;
              
              void main() {
                vUv = uv;
                
                // Add subtle rotation
                vec3 pos = position;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
                        fragmentShader: `
              uniform float uTime;
              uniform vec3 uColor;
              varying vec2 vUv;
              
              void main() {
                // Create pulsing effect
                float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
                
                // Final color with pulse
                vec3 color = uColor * (1.0 + pulse * 0.2);
                
                gl_FragColor = vec4(color, 1.0);
              }
            `,
                    })

                    const icon = new THREE.Mesh(geometry, material)
                    icon.position.copy(iconPositions[i])

                    iconsGroup.add(icon)
                    icons.push({ mesh: icon, material })
                }

                return { group: iconsGroup, icons }
            }

            const { group: iconsGroup, icons } = createCareerIcons()
            group.add(iconsGroup)

            return { group, ladderGroup, person, steps, icons }
        }

        const { person, steps, icons } = createCareerObjects()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Animate person climbing the ladder
            const climbProgress = (Math.sin(elapsedTime * 0.5) + 1) / 2 // 0 to 1
            const stepIndex = Math.floor(climbProgress * (steps.length - 1))
            const currentStep = steps[stepIndex]

            if (currentStep && person) {
                person.position.copy(currentStep.position.clone().add(new THREE.Vector3(0, 0.3, 0.3)))
            }

            // Update shader uniforms
            steps.forEach((step, index) => {
                if (step instanceof THREE.Mesh && step.material instanceof THREE.ShaderMaterial && step.material.uniforms) {
                    step.material.uniforms.uTime.value = elapsedTime

                    // Highlight current step
                    if (index === stepIndex) {
                        step.scale.set(1.1, 1.1, 1.1)
                    } else {
                        step.scale.set(1, 1, 1)
                    }
                }
            })

            // Animate career icons
            icons.forEach((icon, index) => {
                if (icon.material.uniforms) {
                    icon.material.uniforms.uTime.value = elapsedTime
                }

                // Rotate icons
                icon.mesh.rotation.z = elapsedTime * (0.2 + index * 0.1) * (index % 2 === 0 ? 1 : -1)

                // Float icons
                icon.mesh.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002
            })

            // Render
            renderer.render(scene, camera)
            window.requestAnimationFrame(animate)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)

            // Dispose resources
            steps.forEach((step) => {
                if (step instanceof THREE.Mesh) {
                    if (step.geometry) step.geometry.dispose()
                    if (step.material) step.material.dispose()
                }
            })

            if (person instanceof THREE.Mesh) {
                if (person.geometry) person.geometry.dispose()
                if (person.material) person.material.dispose()
            }

            icons.forEach((icon) => {
                if (icon.mesh.geometry) icon.mesh.geometry.dispose()
                if (icon.material) icon.material.dispose()
            })

            renderer.dispose()
        }
    }, [])

    // Text animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Split text animation
            const titleElement = textRef.current?.querySelector(".hero-title")
            if (titleElement) {
                const titleText = titleElement.textContent || ""
                titleElement.innerHTML = ""

                // Split text into spans
                titleText.split(" ").forEach((word, index) => {
                    const wordSpan = document.createElement("span")
                    wordSpan.className = "inline-block mr-[0.25em]"

                    word.split("").forEach((char) => {
                        const charSpan = document.createElement("span")
                        charSpan.className = "inline-block opacity-0 translate-y-[20px]"
                        charSpan.textContent = char
                        wordSpan.appendChild(charSpan)
                    })

                    titleElement.appendChild(wordSpan)
                })

                // Animate each character
                gsap.to(".hero-title span span", {
                    opacity: 1,
                    y: 0,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.5,
                })
            }

            // Animate subtitle
            gsap.from(".hero-subtitle", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                delay: 1.2,
            })

            // Animate CTA button
            gsap.from(".hero-cta", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                delay: 1.5,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
        >
            {/* 3D canvas background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Content */}
            <div ref={textRef} className="container mx-auto px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="inline-block px-6 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm"
                >
                    Join Our Team
                </motion.div>

                <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-blue-200 bg-gradient-to-r from-white via-blue-300 to-white">
                    <span>Build</span> <span>Your</span> <span>Career</span> <span>With</span> Us
                </h1>

                <p className="hero-subtitle text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Join a team of innovators and creators who are passionate about pushing the boundaries of digital excellence.
                    Discover exciting opportunities to grow, learn, and make an impact.
                </p>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <Link
                        href="/careers/apply"
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-full text-white font-medium text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.5)]"
                    >
                        Explore Opportunities
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
