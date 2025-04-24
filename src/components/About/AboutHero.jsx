import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function AboutHero() {
    const containerRef = useRef(null)
    const textRef = useRef(null)

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

            // Animate decorative elements
            gsap.from(".hero-decoration", {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "elastic.out(1, 0.5)",
                delay: 1,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
        >
            {/* Decorative elements */}
            <div className="hero-decoration absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-blue-500/20 animate-pulse"></div>
            <div
                className="hero-decoration absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-blue-500/10 animate-pulse"
                style={{ animationDelay: "1s" }}
            ></div>
            <div
                className="hero-decoration absolute top-1/3 right-1/3 w-40 h-40 rounded-full border border-blue-500/30 animate-pulse"
                style={{ animationDelay: "2s" }}
            ></div>

            {/* Content */}
            <div ref={textRef} className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="inline-block px-6 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm"
                >
                    About SEU
                </motion.div>

                <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl text-blue-200 font-bold mb-8 bg-clip-text bg-gradient-to-r from-white via-blue-300 to-white">
                    <span>Crafting</span> <span>Digital</span> <span>Excellence</span>
                </h1>

                <p className="hero-subtitle text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                    At SEU, we blend innovation with artistry to create digital experiences that captivate, engage, and convert.
                    Discover the story behind our passion for digital excellence.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    <a
                        href="#mission"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-full text-white font-medium text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.5)]"
                    >
                        Our Mission
                    </a>
                    <a
                        href="#process"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-8 py-4 bg-transparent border border-blue-600 hover:border-blue-500 rounded-full text-white font-medium text-lg transition-all duration-300 hover:bg-blue-900/20"
                    >
                        How We Work
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
