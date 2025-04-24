import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function ServiceDetailCTA() {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            // Animate content
            gsap.from(contentRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 relative overflow-hidden"
            style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,24,39,1) 100%)",
            }}
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div
                    ref={contentRef}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/30 to-blue-900/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 md:p-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Ready to Transform Your Business with SEU Technology?
                    </h2>
                    <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                        As a new company founded in 2024, we're eager to collaborate with forward-thinking businesses. Let's discuss
                        how our innovative solutions can address your unique challenges.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-full text-white font-medium text-lg shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Scroll to top on click
                        >
                            <span>Get in Touch</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="/services"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/40 rounded-full text-white font-medium text-lg flex items-center justify-center gap-2 transition-colors"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Scroll to top on click
                        >
                            <span>Explore All Services</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    )
}
