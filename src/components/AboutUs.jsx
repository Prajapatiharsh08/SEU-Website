import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronRight, Users, Target, Award, Zap } from "lucide-react"

export default function AboutUs() {
    const sectionRef = useRef(null)
    const [activeTab, setActiveTab] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const canvasRef = useRef(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // Intersection observer to trigger animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    // 3D background animation
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        let particles
        let animationFrameId

        canvas.width = width
        canvas.height = height

        class Particle {
            x
            y
            size
            speedX
            speedY
            color

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.size = Math.random() * 5 + 1
                this.speedX = Math.random() * 3 - 1.5
                this.speedY = Math.random() * 3 - 1.5
                this.color = `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
                    Math.random() * 100 + 155,
                )}, ${Math.random() * 0.5 + 0.1})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > width || this.x < 0) {
                    this.speedX = -this.speedX
                }
                if (this.y > height || this.y < 0) {
                    this.speedY = -this.speedY
                }
            }

            draw(ctx) {
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        function createParticles() {
            particles = []
            const numberOfParticles = Math.min(Math.floor((width * height) / 15000), 100)
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        function connectParticles(ctx) {
            const maxDistance = 200
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance
                        ctx.strokeStyle = `rgba(65, 105, 225, ${opacity * 0.5})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw(ctx)
            }

            connectParticles(ctx)

            animationFrameId = requestAnimationFrame(animate)
        }

        function handleResize() {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            createParticles()
        }

        window.addEventListener("resize", handleResize)
        createParticles()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    // Tab content
    const tabContent = [
        {
            title: "Our Story",
            icon: <Users className="w-5 h-5" />,
            content:
                "Founded in 2024, SEU began with a vision to transform digital experiences. What started as a small team of passionate designers and developers has grown into a full-service digital agency with a global clientele. Our journey has been defined by continuous innovation and an unwavering commitment to excellence.",
        },
        {
            title: "Our Mission",
            icon: <Target className="w-5 h-5" />,
            content:
                "At SEU, our mission is to create digital solutions that not only meet but exceed client expectations. We believe in pushing boundaries, challenging conventions, and delivering results that drive real business growth. Every project we undertake is an opportunity to redefine what's possible in the digital realm.",
        },
        {
            title: "Our Values",
            icon: <Award className="w-5 h-5" />,
            content:
                "Innovation, integrity, and client satisfaction form the cornerstone of our values. We approach each project with fresh perspective, maintain transparency throughout the process, and measure our success by the success of our clients. These principles guide every decision we make and every line of code we write.",
        },
    ]

    // Stats data
    const stats = [
        { value: "200+", label: "Projects Completed", icon: <Zap className="w-5 h-5" /> },
        { value: "150+", label: "Happy Clients", icon: <Users className="w-5 h-5" /> },
        { value: "50+", label: "Team Members", icon: <Users className="w-5 h-5" /> },
        { value: "24/7", label: "Premium Support", icon: <Award className="w-5 h-5" /> },
    ]

    return (
        <section ref={sectionRef}
            style={{
                background: "radial-gradient(circle at 50% 50%, rgba(10, 21, 53, 0.7) 0%, rgba(5, 10, 28, 0.5) 70%, rgba(10, 17, 40, 0.3) 100%)"
            }}
            className="relative py-24 md:py-32 overflow-hidden">
            {/* Canvas background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4 border border-blue-800/30">
                        <span className="mr-2">About SEU</span>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 p-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/90">
                        Pioneering Digital Excellence
                    </h2>
                    <p className="text-lg text-blue-100/80 max-w-3xl mx-auto">
                        We combine cutting-edge technology with creative design to deliver exceptional digital experiences that
                        drive business growth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left column - Image showcase with 3D effect */}
                    <motion.div className="relative flex justify-center items-center min-h-[400px]" style={{ y, opacity }}>
                        {/* Animated rings */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-blue-500/20">
                            <div
                                className="absolute inset-0 rounded-full animate-pulse-slow"
                                style={{
                                    background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)",
                                }}
                            />
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-500/10"
                            style={{ animation: "pulse 4s infinite" }}
                        />
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-blue-500/5"
                            style={{ animation: "pulse 6s infinite" }}
                        />

                        {/* Team image with overlay */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10 w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent z-10" />
                            <div className="absolute inset-0 bg-black/20 z-[5]" />

                            <img
                                src="/Images/Aboutus.jpg"
                                alt="SEU Team"
                                className="object-cover w-full h-full scale-110 hover:scale-105 transition-transform duration-7000"
                            />

                            {/* Floating badge */}
                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <p className="text-white/90 text-sm">
                                        "Our team of experts is dedicated to delivering exceptional results for every client."
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-medium">SEU Leadership</p>
                                            <p className="text-white/60 text-xs">Executive Team</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl" />
                    </motion.div>

                    {/* Right column - Content */}
                    <div className="relative">
                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-10"
                        >
                            <div className="flex flex-wrap gap-2 mb-8">
                                {tabContent.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${activeTab === index
                                            ? "bg-blue-900/50 text-white border border-blue-700/50 shadow-lg shadow-blue-900/20"
                                            : "bg-blue-950/30 text-white/70 border border-blue-900/20 hover:bg-blue-900/30"
                                            }`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        <span className={`${activeTab === index ? "text-blue-400" : "text-blue-500/70"}`}>{tab.icon}</span>
                                        {tab.title}
                                    </button>
                                ))}
                            </div>

                            {/* Tab content */}
                            <div className="relative overflow-hidden bg-blue-950/20 rounded-xl border border-blue-900/30 p-6 min-h-[180px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-white/80 leading-relaxed"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center border border-blue-700/50">
                                                {tabContent[activeTab].icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{tabContent[activeTab].title}</h3>
                                        </div>
                                        <p className="text-white/70">{tabContent[activeTab].content}</p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Decorative corner */}
                                <div className="absolute -bottom-px -right-px w-16 h-16 overflow-hidden">
                                    <div className="absolute transform rotate-45 bg-blue-600/20 w-8 h-8 bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-xl border border-blue-800/30 p-4 text-center hover:shadow-lg hover:shadow-blue-900/10 hover:border-blue-700/40 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mx-auto mb-3 border border-blue-700/50">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-blue-200/60">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-10 flex justify-start"
                        >
                            <motion.a
                                href="contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40 transition-all duration-300"
                            >
                                <span>Work With Us</span>
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
