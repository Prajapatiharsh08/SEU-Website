import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CareerValues() {
    const sectionRef = useRef(null)
    const [activeValue, setActiveValue] = useState(0)

    // Values data
    const values = [
        {
            title: "Innovation",
            description:
                "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.",
            image: "https://img.freepik.com/free-photo/business-concept-with-graphic-holography_23-2149160929.jpg?w=740",
            color: "from-blue-600 to-blue-800",
        },
        {
            title: "Collaboration",
            description:
                "We believe in the power of teamwork, both within our organization and with our clients, fostering partnerships that lead to exceptional results.",
            image: "https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?w=740",
            color: "from-indigo-600 to-indigo-800",
        },
        {
            title: "Excellence",
            description:
                "We hold ourselves to the highest standards, meticulously refining every detail to ensure flawless execution and premium quality.",
            image: "https://img.freepik.com/free-photo/trophy-award-winner-success-concept_53876-127483.jpg?w=740",
            color: "from-blue-700 to-indigo-900",
        },
        {
            title: "Growth",
            description:
                "We're committed to continuous learning and development, both as individuals and as an organization, always striving to be better tomorrow than we are today.",
            image: "https://img.freepik.com/free-photo/business-growth-success-increase-concept_53876-127698.jpg?w=740",
            color: "from-blue-600 to-indigo-700",
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

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".values-title", {
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

            // Animate values container
            gsap.from(".values-container", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".values-container",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 relative">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Culture
                    </div>
                    <h2 className="values-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Core Values
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Our values define who we are and guide everything we do. They're the foundation of our culture and the
                        principles we live by.
                    </p>
                </div>

                {/* Values showcase */}
                <div className="values-container max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeValue}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Value image */}
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(66,99,235,0.2)] aspect-[4/3]">
                                    <img
                                        src={values[activeValue].image || "/placeholder.svg"}
                                        alt={values[activeValue].title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* Decorative corner accents */}
                                    <div className="absolute top-0 left-0 w-16 h-16">
                                        <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                        <div className="absolute top-0 left-0 h-[1px] w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-16 h-16">
                                        <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                        <div className="absolute top-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-500 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16">
                                        <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 h-[1px] w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-16 h-16">
                                        <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                                        <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-500 to-transparent"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Value details */}
                            <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${values[activeValue].color} flex items-center justify-center text-white mb-6`}
                                    >
                                        <span className="text-2xl font-bold">{values[activeValue].title.charAt(0)}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white">{values[activeValue].title}</h3>
                                    <p className="text-white/80 text-lg leading-relaxed">{values[activeValue].description}</p>

                                    <div className="mt-8">
                                        <p className="text-white/60 italic">
                                            "Our {values[activeValue].title.toLowerCase()} mindset drives us to deliver exceptional results
                                            for our clients and create an inspiring workplace for our team."
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Value indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        {values.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeValue === index ? "bg-blue-500 w-6" : "bg-blue-900/50 hover:bg-blue-700/50"
                                    }`}
                                onClick={() => setActiveValue(index)}
                                aria-label={`View ${values[index].title}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
