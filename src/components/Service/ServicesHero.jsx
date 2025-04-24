import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function ServicesHero() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const textRef = useRef(null)
    const glowRef = useRef(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !textRef.current || !glowRef.current) return

        const ctx = gsap.context(() => {
            // Animate heading
            gsap.from(headingRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            })

            // Animate text
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out",
            })

            // Animate glow
            gsap.from(glowRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1.5,
                delay: 0.5,
                ease: "power2.out",
            })

            // Parallax effect on scroll
            // gsap.to(headingRef.current, {
            //     y: -50,
            //     scrollTrigger: {
            //         trigger: sectionRef.current,
            //         start: "top top",
            //         end: "bottom top",
            //         scrub: true,
            //     },
            // })

            gsap.to(glowRef.current, {
                y: -100,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32"
        >
            {/* Background glow */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(66, 99, 235, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Decorative elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </motion.div>

                    {/* Main heading */}
                    <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                        <span className="block p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                            Cutting-Edge
                        </span>
                        <span className="block p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            Technology Services
                        </span>
                    </h1>

                    {/* Description */}
                    <p ref={textRef} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                        SEU Company delivers comprehensive technology solutions that transform businesses through innovation,
                        expertise, and unparalleled service quality.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <motion.a
                            href="#services"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-full text-white font-medium text-lg shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 min-w-[200px]"
                        >
                            <span>Explore Services</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </motion.a>

                        <motion.a
                            href="/contact"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setTimeout(() => {
                                    window.location.href = "/contact";
                                }, 300); // Optional: Adjust timing if needed
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/40 rounded-full text-white font-medium text-lg flex items-center justify-center gap-2 min-w-[200px] transition-colors"
                        >
                            <span>Contact Us</span>
                        </motion.a>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
                    >
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-4xl font-bold text-blue-400 mb-2">12+</div>
                            <div className="text-white/70">Years Experience</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
                            <div className="text-white/70">Projects Completed</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                            <div className="text-white/70">Tech Experts</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                            <div className="text-white/70">Client Satisfaction</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
