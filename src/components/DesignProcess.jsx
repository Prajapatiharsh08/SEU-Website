import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Star, Paintbrush, Code, Rocket } from "lucide-react"
import * as THREE from "three"

export default function DesignProcess() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const canvasRef = useRef(null)
    const cardsRef = useRef(null)

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

        // Create grid
        const gridSize = 20
        const gridDivisions = 20
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x0a1128, 0x0a1128)
        gridHelper.position.y = -5
        gridHelper.rotation.x = Math.PI / 2
        scene.add(gridHelper)

        // Create stars
        const starGeometry = new THREE.BufferGeometry()
        const starCount = 500
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

        // Create a glowing circle
        const circleGeometry = new THREE.CircleGeometry(3, 32)
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: 0x0a1128,
            transparent: true,
            opacity: 0.5,
        })
        const circle = new THREE.Mesh(circleGeometry, circleMaterial)
        circle.position.z = -2
        scene.add(circle)

        // Add a glow effect around the circle
        const glowGeometry = new THREE.RingGeometry(3, 4, 32)
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0x4361ee) },
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
          float strength = 1.0 - (abs(vUv.x - 0.5) * 2.0);
          strength *= 1.0 - vUv.y;
          
          vec3 color = uColor;
          float alpha = strength * (0.5 + 0.5 * sin(uTime));
          
          gl_FragColor = vec4(color, alpha * 0.5);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        glow.position.z = -1.9
        scene.add(glow)

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update shader uniforms
            if (glowMaterial.uniforms) {
                glowMaterial.uniforms.uTime.value = elapsedTime
            }

            // Rotate stars slowly
            stars.rotation.y = elapsedTime * 0.05
            stars.rotation.x = elapsedTime * 0.03

            // Rotate grid
            gridHelper.rotation.z = elapsedTime * 0.05

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
            circleGeometry.dispose()
            circleMaterial.dispose()
            glowGeometry.dispose()
            glowMaterial.dispose()
        }
    }, [])

    // Animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate heading
            gsap.from(headingRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            // Animate process cards
            const cards = document.querySelectorAll(".process-card")
            gsap.from(cards, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    // Process steps data
    const processSteps = [
        {
            step: "01",
            title: "Ideation & Strategy",
            description: "We dive deep into your vision to craft a tailored roadmap that aligns with your goals and audience.",
            icon: <Star className="w-8 h-8" />,
        },
        {
            step: "02",
            title: "Creative Direction",
            description: "We bring ideas to life with stunning visuals, UI/UX wireframes, and moodboards to set the creative tone.",
            icon: <Paintbrush className="w-8 h-8" />,
        },
        {
            step: "03",
            title: "Development Magic",
            description: "Using modern tech and smooth animations, we build responsive, high-performance digital experiences.",
            icon: <Code className="w-8 h-8" />,
        },
        {
            step: "04",
            title: "Launch & Elevate",
            description: "Your project goes live — but we don’t stop there. We monitor, refine, and help you scale for growth.",
            icon: <Rocket className="w-8 h-8" />,
        },
    ];

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* 3D background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Design Process</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Explore our streamlined approach to creating bespoke websites that align with your goals.
                    </p>
                </div>

                {/* Process cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="process-card relative bg-[#050a1c]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 overflow-hidden"
                            whileHover={{
                                y: -10,
                                boxShadow: "0 0 20px rgba(66, 99, 235, 0.2)",
                                borderColor: "rgba(66, 99, 235, 0.5)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            {/* Grid background */}
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="w-full h-full border-[0.5px] border-blue-500/20"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, rgba(66, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(66, 99, 235, 0.1) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                ></div>
                            </div>

                            {/* Step number */}
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-900/50 text-blue-400 text-xs font-medium">
                                Step {step.step}
                            </div>

                            {/* Icon */}
                            <div className="text-blue-500 mb-6 relative">
                                {step.icon}
                                <div className="absolute -inset-2 rounded-full bg-blue-500/10 animate-pulse"></div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-white/70">{step.description}</p>

                            {/* Animated corner accent */}
                            <motion.div
                                className="absolute bottom-0 right-0 w-16 h-16"
                                initial={{ opacity: 0.5 }}
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                    rotate: [0, 90, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                                <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-500 to-transparent"></div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Animated connection lines between cards (visible on desktop) */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[60%] pointer-events-none">
                    <motion.svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <motion.path
                            d="M 20,20 L 80,20 L 80,80 L 20,80 Z"
                            fill="none"
                            stroke="rgba(66, 99, 235, 0.3)"
                            strokeWidth="0.5"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="20"
                            cy="20"
                            r="2"
                            fill="#4263eb"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                        />
                        <motion.circle
                            cx="80"
                            cy="20"
                            r="2"
                            fill="#4263eb"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="2"
                            fill="#4263eb"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                        />
                        <motion.circle
                            cx="20"
                            cy="80"
                            r="2"
                            fill="#4263eb"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                        />
                    </motion.svg>
                </div>
            </div>
        </section>
    )
}
