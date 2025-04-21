"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {Link} from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function CareerCTA() {
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
        <section ref={sectionRef} className="py-24 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="cta-content max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Ready to Join Our Team?
                    </h2>

                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Take the next step in your career journey. Explore our open positions and become part of a team that's
                        shaping the future of digital experiences.
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/careers/apply"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-medium text-lg items-center gap-2 group inline-flex transition-all duration-300 hover:shadow-[0_0_30px_rgba(66,99,235,0.5)]"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <p className="mt-6 text-white/50">
                        Don't see a perfect fit? We're always looking for talented individuals.{" "}
                        <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Contact us
                        </Link>{" "}
                        to start a conversation.
                    </p>
                </div>
            </div>
        </section>
    )
}
