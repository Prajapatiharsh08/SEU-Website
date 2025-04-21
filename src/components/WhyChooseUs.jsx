import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Star, Users, Award, Clock, Smartphone, MessageCircle } from "lucide-react"

export default function WhyChooseUs() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const headingRef = useRef(null)

    // Setup 3D background
    useEffect(() => {
        if (!canvasRef.current) return

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

        // Stars
        const starGeometry = new THREE.BufferGeometry()
        const starCount = 1200
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

        // Light beams
        const beamGeometry = new THREE.PlaneGeometry(0.3, 20)
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        })

        const leftBeam = new THREE.Mesh(beamGeometry, beamMaterial.clone())
        leftBeam.position.set(-6, 0, -4)
        leftBeam.rotation.z = Math.PI / 4
        scene.add(leftBeam)

        const rightBeam = new THREE.Mesh(beamGeometry, beamMaterial.clone())
        rightBeam.position.set(6, 0, -4)
        rightBeam.rotation.z = -Math.PI / 4
        scene.add(rightBeam)

        const clock = new THREE.Clock()
        const animate = () => {
            const elapsed = clock.getElapsedTime()
            stars.rotation.y = elapsed * 0.05
            stars.rotation.x = elapsed * 0.02

            leftBeam.material.opacity = 0.1 + Math.sin(elapsed * 0.5) * 0.1
            rightBeam.material.opacity = 0.1 + Math.sin(elapsed * 0.5 + 1) * 0.1

            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

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

    // Scroll Animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative py-20 overflow-hidden">
            {/* 3D background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Why SEU?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Built Different. Designed to Lead.</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        At SEU, we don't just build digital experiences — we engineer impact. Here's what sets us apart in a world full of sameness.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {}
                    }}
                >
                    {[
                        {
                            icon: <Star className="w-8 h-8" />,
                            title: "Vision-Driven Execution",
                            desc: "We turn bold ideas into living, breathing experiences that move businesses forward."
                        },
                        {
                            icon: <Users className="w-8 h-8" />,
                            title: "Tech-Savvy + Human-Centric",
                            desc: "We blend advanced tech with human-first design to build solutions users actually love."
                        },
                        {
                            icon: <Award className="w-8 h-8" />,
                            title: "Battle-Tested Creativity",
                            desc: "Our creativity isn't random. It's refined through strategy, results, and relentless iteration."
                        },
                        {
                            icon: <Clock className="w-8 h-8" />,
                            title: "Velocity with Precision",
                            desc: "Fast is good. But fast + flawless? That’s SEU. We deliver speed without skipping the soul."
                        },
                        {
                            icon: <Smartphone className="w-8 h-8" />,
                            title: "Cross-Platform Impact",
                            desc: "From mobile to desktop to XR — we craft cohesive brand experiences everywhere your users are."
                        },
                        {
                            icon: <MessageCircle className="w-8 h-8" />,
                            title: "Radical Transparency",
                            desc: "No filters. No fluff. Just real conversations, honest timelines, and shared success metrics."
                        }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            className="why-us-card bg-[#050a1c]/80 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30"
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="text-blue-500 mb-4">{card.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                            <p className="text-white/70">{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
