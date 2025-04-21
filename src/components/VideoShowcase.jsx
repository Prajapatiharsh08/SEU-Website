"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Play, ChevronRight, Layers, Zap, Search, Star } from "lucide-react"
import AboutTestimonials from "./About/AboutTestimonials"

export default function VideoShowcase() {
    const containerRef = useRef(null)
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate title with staggered letters
            const titleChars = gsap.utils.toArray(".title-char")
            gsap.from(titleChars, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".title-container",
                    start: "top 85%",
                },
            })

            // Animate video showcase with 3D effect
            gsap.from(videoRef.current, {
                y: 100,
                opacity: 0,
                rotationX: 10,
                scale: 0.9,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: videoRef.current,
                    start: "top 85%",
                },
            })

            // Animate feature cards with staggered 3D effect
            const cards = gsap.utils.toArray(".feature-card")
            gsap.from(cards, {
                y: 80,
                opacity: 0,
                rotationY: 15,
                rotationX: 10,
                scale: 0.9,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".features-container",
                    start: "top 85%",
                },
            })

            // Animate stats counters - fixed to ensure they're visible by default
            const statItems = gsap.utils.toArray(".stat-item")
            statItems.forEach((item) => {
                // Make sure items are visible by default
                gsap.set(item, { opacity: 1, y: 0 })

                // Then animate them when they come into view
                gsap.from(item, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    },
                })
            })

            // Animate particles
            gsap.to(".particle", {
                y: -20,
                opacity: 0.2,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                stagger: 0.1,
                ease: "sine.inOut",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 3000) // Change testimonial every 3 seconds

        return () => clearInterval(interval)
    }, [])

    const handlePlayVideo = () => {
        setIsPlaying(true)
    }

    // Split title into characters for animation
    const titleText = "Unleash Bold Possibilities with SEU"
    const titleChars = titleText.split("")

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "CEO, TechVision Inc.",
            image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            text: "SEU transformed our digital presence completely. Their innovative approach and attention to detail resulted in a 200% increase in user engagement and a significant boost in our conversion rates.",
            stars: 5,
        },
        {
            name: "Michael Chen",
            role: "Marketing Director, Innovate Solutions",
            image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            text: "Working with SEU has been a game-changer for our brand. Their strategic insights and technical expertise helped us reach new markets and establish ourselves as industry leaders.",
            stars: 5,
        },
        {
            name: "Emma Rodriguez",
            role: "Founder, GrowthLab",
            image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            text: "The team at SEU delivered beyond our expectations. Their attention to detail and commitment to excellence resulted in a platform that perfectly captures our vision and resonates with our audience.",
            stars: 5,
        },
        {
            name: "David Thompson",
            role: "CTO, FutureTech",
            image: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            text: "SEU's technical prowess is unmatched. They built us a robust, scalable solution that handles our growing user base with ease. Their ongoing support has been exceptional.",
            stars: 5,
        },
    ]

    return (
        <section
            ref={containerRef}
            className="relative py-24 overflow-hidden"
            style={{
                background: "radial-gradient(circle at 50% 50%, rgba(10, 21, 53, 0.7) 0%, rgba(5, 10, 28, 0.5) 70%, rgba(10, 17, 40, 0.3) 100%)"
            }}
        >
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="particle absolute w-2 h-2 rounded-full bg-blue-500/30"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}

            {/* Glowing orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px]"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="title-container text-center mb-16">
                    <div className="inline-block mb-3 px-4 py-1.5 bg-blue-900/30 rounded-full backdrop-blur-sm border border-blue-500/20">
                        <span className="text-blue-400 font-medium text-sm">Premium Digital Solutions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        {titleChars.map((char, index) => (
                            <span
                                key={index}
                                className="title-char inline-block bg-gradient-to-br from-white via-blue-100 to-blue-300 bg-clip-text text-transparent"
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <p className="text-blue-100/70 text-lg max-w-3xl mx-auto mb-8">
                        Elevate your digital presence with our cutting-edge solutions designed to transform your vision into an
                        immersive reality.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto" />
                </div>

                {/* Video showcase */}
                <div
                    ref={videoRef}
                    className="relative mx-auto max-w-5xl mb-24 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,50,255,0.15)] transform-gpu"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative aspect-video bg-gradient-to-tr from-[#050a1c] to-[#0a1535] overflow-hidden rounded-2xl shadow-lg">
                        {/* Background image with slight zoom on hover */}
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                            style={{
                                backgroundImage:
                                    "url('/Images/imageshowcase.jpg')",
                            }}
                            whileHover={{ scale: 1.05 }}
                        />

                        {/* Gradient overlays for better contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050a1c] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050a1c] via-transparent to-[#050a1c] opacity-40"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">SEU Innovation Showcase</h3>
                            <p className="text-blue-100/70 mb-4 max-w-lg">
                                Explore our innovations, solutions, and services that shape the future of digital transformation.
                            </p>

                            {/* Download Brochure Button */}
                            <a
                                href="/seuBrochure.pdf" // <-- Replace this with your actual file path
                                download
                                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors duration-300 shadow-md"
                            >
                                Download Brochure
                            </a>
                        </div>
                    </div>
                </div>

                {/* Feature cards */}
                <h3 className="text-2xl font-bold text-center text-white mb-12">
                    Bespoke. Fast. <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Visible.</span>
                </h3>
                <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Bespoke Creations */}
                    <motion.div
                        className="feature-card relative bg-[#050a1c]/80 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm group"
                        whileHover={{
                            y: -10,
                            transition: { duration: 0.3 },
                            boxShadow: "0 20px 40px rgba(0, 50, 255, 0.1)",
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <div className="w-16 h-16 mb-6 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <Layers className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                            Bespoke Creations
                        </h3>
                        <p className="text-blue-100/70 mb-6">
                            Immersive digital experiences crafted with precision to reflect your brand's elite vision and captivate
                            your audience.
                        </p>
                        <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                            <span>Learn more</span>
                            <ChevronRight className="w-4 h-4 ml-1 mt-1" />
                        </div>
                    </motion.div>

                    {/* Ultra-Fast Excellence */}
                    <motion.div
                        className="feature-card relative bg-[#050a1c]/80 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm group"
                        whileHover={{
                            y: -10,
                            transition: { duration: 0.3 },
                            boxShadow: "0 20px 40px rgba(0, 50, 255, 0.1)",
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <div className="w-16 h-16 mb-6 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                            Ultra-Fast Excellence
                        </h3>
                        <p className="text-blue-100/70 mb-6">
                            Next-level performance engineered for fluid experiences and instant gratification that keeps users
                            engaged.
                        </p>
                        <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                            <span>Learn more</span>
                            <ChevronRight className="w-4 h-4 ml-1 mt-1" />
                        </div>
                    </motion.div>

                    {/* Elite Visibility */}
                    <motion.div
                        className="feature-card relative bg-[#050a1c]/80 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm group"
                        whileHover={{
                            y: -10,
                            transition: { duration: 0.3 },
                            boxShadow: "0 20px 40px rgba(0, 50, 255, 0.1)",
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <div className="w-16 h-16 mb-6 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                            Elite Visibility
                        </h3>
                        <p className="text-blue-100/70 mb-6">
                            Strategically enhanced SEO to elevate your brand's presence in the digital spotlight and drive qualified
                            traffic.
                        </p>
                        <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                            <span>Learn more</span>
                            <ChevronRight className="w-4 h-4 ml-1 mt-1" />
                        </div>
                    </motion.div>
                </div>

                {/* Testimonial Section - Fixed with proper positioning */}
                {/* <div className="mb-24">
                    <h3 className="text-2xl font-bold text-center text-white mb-12">
                        What Our{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Clients</span>{" "}
                        Say
                    </h3>

                    <div className="relative max-w-4xl px-4 mx-auto">
                        <div className="relative h-[380px] sm:h-[300px] md:h-[240px] mb-20 sm:mb-16">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="testimonial bg-[#050a1c]/80 p-6 sm:p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm absolute w-full"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{
                                        opacity: index === currentTestimonial ? 1 : 0,
                                        x: index === currentTestimonial ? 0 : 50,
                                        zIndex: index === currentTestimonial ? 10 : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                                        <div className="mb-4 sm:mb-0 sm:mr-6 shrink-0">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto sm:mx-0">
                                                <img
                                                    src={testimonial.image || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-center sm:justify-start mb-3">
                                                {[...Array(testimonial.stars)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="text-blue-100 italic mb-3 px-1 sm:px-0">"{testimonial.text}"</p>
                                            <div>
                                                <p className="font-semibold text-white">{testimonial.name}</p>
                                                <p className="text-blue-300/70 text-sm">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4 space-x-3 relative z-20">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial
                                        ? "bg-blue-500 scale-125"
                                        : "bg-blue-500/30 hover:bg-blue-500/50"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div> */}
                <AboutTestimonials />
            </div>
        </section>
    )
}
