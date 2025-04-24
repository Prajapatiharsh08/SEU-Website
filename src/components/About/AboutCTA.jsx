import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function AboutCTA() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate CTA content
            gsap.from(".cta-content", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="cta-content max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl p-2 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Ready to Transform Your Digital Presence?
                    </h2>

                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Let's create something extraordinary together. Reach out to discuss how we can help bring your vision to
                        life.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-medium text-lg flex items-center gap-2 group transition-all duration-300 hover:shadow-[0_0_30px_rgba(66,99,235,0.5)]"
                            >
                                <span>Start a Project</span>
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                            <Link
                                to="/services"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-8 py-4 bg-transparent border border-blue-600 hover:border-blue-500 rounded-full text-white font-medium text-lg transition-all duration-300 hover:bg-blue-900/20"
                            >
                                Explore Our Services
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
