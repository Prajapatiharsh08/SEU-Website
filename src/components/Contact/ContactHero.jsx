"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function ContactHero() {
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

        // Create floating 3D objects
        const createFloatingObjects = () => {
            const group = new THREE.Group()
            scene.add(group)

            // Create envelope shape
            const envelopeGeometry = new THREE.BoxGeometry(1.5, 1, 0.2)
            const envelopeMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color("#4263eb") },
                    uColor2: { value: new THREE.Color("#0a1128") },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            // Add subtle movement
            vec3 pos = position;
            pos.y += sin(uTime * 0.5 + position.x) * 0.05;
            pos.x += cos(uTime * 0.5 + position.y) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            // Create gradient effect
            float gradient = smoothstep(0.0, 1.0, vUv.y);
            
            // Add pulsing effect
            float pulse = 0.5 + 0.5 * sin(uTime);
            
            // Mix colors
            vec3 color = mix(uColor1, uColor2, gradient + pulse * 0.2);
            
            // Add edge highlight
            float edge = max(
              smoothstep(0.95, 1.0, vUv.x),
              max(
                smoothstep(0.0, 0.05, vUv.x),
                max(
                  smoothstep(0.95, 1.0, vUv.y),
                  smoothstep(0.0, 0.05, vUv.y)
                )
              )
            );
            color = mix(color, vec3(1.0), edge * 0.5);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
            })

            const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial)
            envelope.position.set(-2, 0, 0)
            envelope.rotation.z = -0.2
            group.add(envelope)

            // Create phone shape
            const phoneGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.1)
            const phoneMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color("#0a1128") },
                    uColor2: { value: new THREE.Color("#4263eb") },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            
            // Add subtle movement
            vec3 pos = position;
            pos.y += sin(uTime * 0.6 + position.x) * 0.05;
            pos.x += cos(uTime * 0.6 + position.y) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          
          void main() {
            // Create gradient effect
            float gradient = smoothstep(0.0, 1.0, vUv.x);
            
            // Add pulsing effect
            float pulse = 0.5 + 0.5 * sin(uTime * 0.8);
            
            // Mix colors
            vec3 color = mix(uColor1, uColor2, gradient + pulse * 0.2);
            
            // Add screen effect
            if (vUv.x > 0.1 && vUv.x < 0.9 && vUv.y > 0.1 && vUv.y < 0.8) {
              color = mix(color, vec3(0.1, 0.1, 0.3), 0.8);
              
              // Add pulsing glow on screen
              float screenPulse = 0.5 + 0.5 * sin(uTime * 2.0 + vUv.y * 10.0);
              color += vec3(0.0, 0.1, 0.3) * screenPulse * 0.2;
            }
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
            })

            const phone = new THREE.Mesh(phoneGeometry, phoneMaterial)
            phone.position.set(0, -0.5, 0)
            phone.rotation.z = 0.1
            group.add(phone)

            // Create message bubble
            const bubbleGeometry = new THREE.CircleGeometry(1, 32)
            const bubbleMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color("#4263eb") },
                    uColor2: { value: new THREE.Color("#8a2be2") },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            
            // Add subtle movement
            vec3 pos = position;
            float angle = uTime * 0.5;
            pos.x += sin(angle + position.y * 2.0) * 0.05;
            pos.y += cos(angle + position.x * 2.0) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          
          void main() {
            // Create radial gradient
            float dist = length(vUv - vec2(0.5));
            
            // Add pulsing effect
            float pulse = 0.5 + 0.5 * sin(uTime);
            
            // Mix colors
            vec3 color = mix(uColor1, uColor2, dist + pulse * 0.2);
            
            // Add edge glow
            float edge = smoothstep(0.45, 0.5, dist);
            color = mix(color, vec3(1.0), edge * 0.5);
            
            // Create bubble shape with alpha
            float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
            })

            const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
            bubble.position.set(2, 0.5, 0)
            bubble.rotation.z = -0.1
            group.add(bubble)

            return {
                group,
                objects: [
                    { mesh: envelope, material: envelopeMaterial },
                    { mesh: phone, material: phoneMaterial },
                    { mesh: bubble, material: bubbleMaterial },
                ],
            }
        }

        const { group, objects } = createFloatingObjects()

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update shader uniforms
            objects.forEach((object) => {
                if (object.material.uniforms) {
                    object.material.uniforms.uTime.value = elapsedTime
                }
            })

            // Rotate group slowly
            group.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2
            group.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1

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
            objects.forEach((object) => {
                if (object.mesh.geometry) object.mesh.geometry.dispose()
                if (object.material) object.material.dispose()
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

            // Animate contact cards
            gsap.from(".contact-card", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
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
                    Connect With Us
                </motion.div>

                <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-blue-200 bg-gradient-to-r from-white via-blue-300 to-white">
                    <span>Contact</span> SEU
                </h1>

                <p className="hero-subtitle text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                    We're ready to bring your vision to life. Reach out to discuss how we can help transform your digital
                    presence.
                </p>

                {/* Contact cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <motion.div
                        className="contact-card bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 flex flex-col items-center"
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
                        <p className="text-white/80 mb-4">info@seunits.com</p>
                        <a href="mailto:info@seunits.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Send an email →
                        </a>
                    </motion.div>

                    <motion.div
                        className="contact-card bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 flex flex-col items-center"
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center mb-4">
                            <Phone className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
                        <p className="text-white/80 mb-4">+91 63516 72568</p>
                        <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Make a call →
                        </a>
                    </motion.div>

                    <motion.div
                        className="contact-card bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-900/30 flex flex-col items-center"
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Live Chat</h3>
                        <p className="text-white/80 mb-4">Available 24/7</p>
                        {/* <button className="text-blue-400 hover:text-blue-300 transition-colors">Start chatting →</button> */}
                        <a
                            href="https://wa.me/6351672568?text=Hi%20SEU%2C%20I%20am%20interested%20in%20your%20services.%20Can%20we%20chat%3F
"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Start chatting →
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
