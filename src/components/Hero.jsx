import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const containerRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const heroText = "WE ARE SEU."
    const characters = heroText.split("")

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = gsap.utils.toArray(".hero-char")

            const introTimeline = gsap.from(chars, {
                opacity: 0,
                y: 30, // Just a clean fade-up
                scale: 0.9,
                duration: 1.1,
                ease: "power2.out",
                stagger: 0.04,
                delay: 0.2,
            })

            // Light float effect (reduced intensity for smoother render)
            const floatTimeline = gsap.to(chars, {
                y: "+=6",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    amount: 0.6,
                },
            })

            const st = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(containerRef.current, {
                    y: 80,
                    opacity: 0.9,
                    ease: "none",
                }),
            })

            return () => {
                introTimeline.kill()
                floatTimeline.kill()
                st.kill()
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const particleCount = 14
    const particles = Array.from({ length: particleCount })

    return (
        <div
            ref={containerRef}
            className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[90vh] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered &&
                particles.map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute w-2 h-2 rounded-full bg-white/60 mix-blend-screen"
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [0, 1, 0],
                            x: Math.sin(index) * 200,
                            y: Math.cos(index) * 100,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5 + index * 0.05,
                            repeat: Infinity,
                            delay: index * 0.05,
                            ease: "easeInOut",
                        }}
                        style={{
                            filter: "blur(1px)",
                            willChange: "transform, opacity",
                        }}
                    />
                ))}

            <div className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-purple-500/20 to-transparent blur-3xl animate-pulse pointer-events-none" />

            <h1
                className="text-[clamp(3rem,15vw,15rem)] font-bold leading-none tracking-tighter text-center"
                style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                    textShadow: "0 0 30px rgba(255,255,255,0.2)",
                }}
            >
                {characters.map((char, index) => (
                    <span
                        key={index}
                        className="hero-char inline-block"
                        style={{
                            display: char === " " ? "inline" : "inline-block",
                            width: char === " " ? "0.5em" : "auto",
                            willChange: "transform, opacity",
                            transformOrigin: "center",
                        }}
                    >
                        {char}
                    </span>
                ))}
            </h1>

            <motion.div
                className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full mt-8"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{
                    duration: 1.2,
                    delay: 2,
                    ease: "easeOut",
                }}
            />

            <motion.p
                className="mt-8 text-xl md:text-2xl text-white/70 text-center max-w-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.3 }}
            >
                Transforming ideas into extraordinary digital experiences
            </motion.p>

            <motion.button
                className="mt-12 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.7 }}
            >
                <Link
                    to="/services"
                    className="relative z-10 cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    Explore Our Work
                </Link>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                />
                <div className="absolute -inset-1 rounded-full blur-sm bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
        </div>
    )
}
