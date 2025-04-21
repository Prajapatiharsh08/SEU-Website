import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, Lightbulb, Users, Target, Zap, Award } from "lucide-react"

export default function AboutValues() {
    const sectionRef = useRef(null)
    const [activeValue, setActiveValue] = useState(0)

    // Values data
    const values = [
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Innovation",
            description:
                "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.",
            color: "from-blue-600 to-blue-800",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Passion",
            description:
                "Our team brings genuine enthusiasm to every project, infusing creativity and dedication into every pixel and line of code we craft.",
            color: "from-indigo-600 to-indigo-800",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Collaboration",
            description:
                "We believe in the power of teamwork, both within our organization and with our clients, fostering partnerships that lead to exceptional results.",
            color: "from-blue-700 to-indigo-900",
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Excellence",
            description:
                "We hold ourselves to the highest standards, meticulously refining every detail to ensure flawless execution and premium quality.",
            color: "from-blue-600 to-indigo-700",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Agility",
            description:
                "We adapt quickly to changing technologies and market demands, ensuring our solutions remain relevant and effective in a dynamic digital landscape.",
            color: "from-indigo-700 to-blue-900",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Integrity",
            description:
                "We operate with transparency and honesty, building trust through ethical practices and delivering on our promises without compromise.",
            color: "from-blue-800 to-indigo-900",
        },
    ]

    // Auto-rotate values
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % values.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [values.length])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // const ctx = gsap.context(() => {
        //     // Animate section title
        //     gsap.from(".values-title", {
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

        //     // Animate values cards
        //     gsap.from(".value-card", {
        //         y: 80,
        //         opacity: 0,
        //         duration: 0.8,
        //         stagger: 0.1,
        //         ease: "power3.out",
        //         scrollTrigger: {
        //             trigger: ".values-grid",
        //             start: "top 85%",
        //             toggleActions: "play none none none",
        //         },
        //     })
        // }, sectionRef)

        // return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"></div>

            {/* Content */}
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Core Values
                    </div>
                    <h2 className="values-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        What Drives Us Forward
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Our values form the foundation of everything we do at SEU. They guide our decisions, shape our culture, and
                        define our approach to creating exceptional digital experiences.
                    </p>
                </div>

                {/* Values grid */}
                <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className={`value-card relative overflow-hidden rounded-2xl ${activeValue === index ? "ring-2 ring-blue-500 shadow-[0_0_20px_rgba(66,99,235,0.3)]" : ""
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            onMouseEnter={() => setActiveValue(index)}
                        >
                            {/* Card background with gradient */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-${activeValue === index ? "100" : "80"
                                    } transition-opacity duration-300`}
                            ></div>

                            {/* Glass overlay */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                            {/* Content */}
                            <div className="relative p-8 h-full flex flex-col">
                                <div className="mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                                        {value.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                                <p className="text-white/80">{value.description}</p>

                                {/* Animated corner accent */}
                                <motion.div
                                    className="absolute bottom-0 right-0 w-16 h-16"
                                    initial={{ opacity: 0.5 }}
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                        rotate: [0, 90, 0],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-white/60 to-transparent"></div>
                                    <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-gradient-to-l from-white/60 to-transparent"></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured value */}
                <div className="mt-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeValue}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8 max-w-4xl mx-auto"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${values[activeValue].color} flex items-center justify-center text-white`}
                                    >
                                        {values[activeValue].icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">{values[activeValue].title}</h3>
                                    <p className="text-white/80 text-lg">{values[activeValue].description}</p>
                                    <p className="mt-4 text-white/70">
                                        This core value shapes how we approach every project and interaction, ensuring we deliver
                                        exceptional results that align with our mission and vision.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
