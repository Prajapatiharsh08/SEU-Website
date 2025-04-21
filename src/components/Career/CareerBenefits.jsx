import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, Clock, Lightbulb, GraduationCap, Globe, Zap } from "lucide-react"

export default function CareerBenefits() {
    const sectionRef = useRef(null)

    // Benefits data
    const benefits = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Health & Wellness",
            description:
                "Comprehensive health insurance, wellness programs, and mental health support to keep you at your best.",
            color: "from-blue-600 to-blue-800",
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Flexible Work",
            description: "Flexible working hours and remote options to help you maintain the perfect work-life balance.",
            color: "from-indigo-600 to-indigo-800",
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Innovation Time",
            description: "Dedicated time to work on passion projects and innovative ideas that could shape our future.",
            color: "from-blue-700 to-indigo-900",
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Learning & Development",
            description: "Continuous learning opportunities, professional development budget, and career growth pathways.",
            color: "from-blue-600 to-indigo-700",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Opportunities",
            description: "Chances to work on international projects and collaborate with teams around the world.",
            color: "from-indigo-700 to-blue-900",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Cutting-Edge Tech",
            description:
                "Access to the latest technologies and tools to help you do your best work and stay ahead of the curve.",
            color: "from-blue-800 to-indigo-900",
        },
    ]

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // const ctx = gsap.context(() => {
        //     // Animate section title
        //     gsap.from(".benefits-title", {
        //         y: 50,
        //         opacity: 0,
        //         duration: 1,
        //         ease: "power3.out",
        //         scrollTrigger: {
        //             trigger: sectionRef.current,
        //             start: "top 80%",
        //             toggleActions: "play none none none",
        //         },
        //     })

        //     // Animate benefit cards
        //     gsap.from(".benefit-card", {
        //         y: 50,
        //         opacity: 0,
        //         duration: 0.8,
        //         stagger: 0.1,
        //         ease: "power3.out",
        //         scrollTrigger: {
        //             trigger: ".benefits-grid",
        //             start: "top 85%",
        //             toggleActions: "play none none none",
        //         },
        //     })
        // }, sectionRef)

        // return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 relative">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4"
                    >
                        Why Join Us
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="benefits-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-blue-200 bg-gradient-to-r from-white via-blue-300 to-white"
                    >
                        Benefits & Perks
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-white/70 max-w-2xl mx-auto"
                    >
                        At SEU, we believe in taking care of our team. Explore the benefits and perks that make working here
                        exceptional.
                    </motion.p>
                </div>

                {/* Benefits grid */}
                <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="benefit-card relative bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-900/30 p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.2)]"
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <div
                                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6`}
                            >
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                            <p className="text-white/80">{benefit.description}</p>

                            {/* Animated corner accent */}
                            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                                <motion.div
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-blue-400 to-transparent"></div>
                                    <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-400 to-transparent"></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
