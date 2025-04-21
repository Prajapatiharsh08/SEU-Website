import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

export default function MissionSection() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const textRef = useRef(null)
    const subtextRef = useRef(null)

    // Setup 3D background
    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize Three.js scene
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

        // Create stars
        const starGeometry = new THREE.BufferGeometry()
        const starCount = 1000
        const posArray = new Float32Array(starCount * 3)

        for (let i = 0; i < starCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 20
            posArray[i + 1] = (Math.random() - 0.5) * 20
            posArray[i + 2] = (Math.random() - 0.5) * 20
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

        const starMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        })

        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // Add light beams
        const beamGeometry = new THREE.PlaneGeometry(0.1, 10)
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x4361ee,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
        })

        // Create multiple light beams
        const beams = []
        for (let i = 0; i < 5; i++) {
            const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone())
            beam.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, -2)
            beam.rotation.z = Math.random() * Math.PI
            scene.add(beam)
            beams.push(beam)
        }

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Rotate stars slowly
            stars.rotation.y = elapsedTime * 0.05
            stars.rotation.x = elapsedTime * 0.03

            // Animate beams
            beams.forEach((beam, i) => {
                beam.rotation.z = elapsedTime * 0.1 + i * 0.5
                beam.material.opacity = 0.2 + Math.sin(elapsedTime * 0.5 + i) * 0.1
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
            renderer.dispose()
            starGeometry.dispose()
            starMaterial.dispose()
            beamGeometry.dispose()
            beamMaterial.dispose()
        }
    }, [])

    // Text animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate heading from top
            gsap.from(textRef.current, {
                y: -80,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            // Animate subtext from bottom
            gsap.from(subtextRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })

            // Animate container from left (slight horizontal movement)
            gsap.from(containerRef.current, {
                x: -100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* 3D background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Content container with border */}
            <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl border border-white/10 rounded-3xl bg-black/30 backdrop-blur-sm">
                <div className="text-center">
                    <h2
                        ref={textRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                    >
                        Welcome to Sudarsana Entrepreneurs Units
                    </h2>
                    <p
                        ref={subtextRef}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
                    >
                        At <span className="text-white font-semibold">SEU</span>, we fuse innovation, artistry, and strategy to deliver extraordinary digital, branding, and tech-driven experiences — tailored to empower startups, scale-ups, and visionaries.
                    </p>
                </div>
            </div>
        </section>
    )
}
