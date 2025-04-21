import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Process steps
const processSteps = [
    {
        number: "01",
        title: "Discovery & Analysis",
        description:
            "We begin by understanding your business objectives, challenges, and requirements through in-depth consultations and research.",
        color: "#4361ee",
    },
    {
        number: "02",
        title: "Strategy & Planning",
        description:
            "Our experts develop a comprehensive strategy and detailed project plan tailored to your specific needs and goals.",
        color: "#4cc9f0",
    },
    {
        number: "03",
        title: "Design & Development",
        description:
            "We create innovative designs and develop robust solutions using cutting-edge technologies and industry best practices.",
        color: "#3a0ca3",
    },
    {
        number: "04",
        title: "Testing & Refinement",
        description:
            "Rigorous testing and quality assurance processes ensure that all deliverables meet the highest standards of performance and reliability.",
        color: "#4361ee",
    },
    {
        number: "05",
        title: "Deployment & Integration",
        description:
            "We seamlessly deploy solutions and integrate them with your existing systems, ensuring minimal disruption to your operations.",
        color: "#4cc9f0",
    },
    {
        number: "06",
        title: "Support & Optimization",
        description:
            "Our ongoing support and continuous optimization services ensure that your solutions evolve with your business needs and technological advancements.",
        color: "#3a0ca3",
    },
]

export default function ServiceProcess() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const stepsRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !stepsRef.current) return

        const ctx = gsap.context(() => {
            // Animate section heading
            gsap.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            // Animate process steps
            const steps = stepsRef.current.querySelectorAll(".process-step")
            gsap.from(steps, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            })

            // Animate process line
            gsap.from(".process-line", {
                height: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        How We Deliver Excellence
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Our structured approach ensures consistent quality, timely delivery, and exceptional results for every
                        project.
                    </p>
                </div>

                {/* Process steps */}
                <div ref={stepsRef} className="relative max-w-5xl mx-auto">
                    {/* Vertical line connecting steps */}
                    <div className="process-line absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 transform md:-translate-x-1/2 rounded-full"></div>

                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"
                                }`}
                        >
                            {/* Step number */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-blue-900/30 backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/20"
                            >
                                <div className="text-xl font-bold" style={{ color: step.color }}>
                                    {step.number}
                                </div>
                            </motion.div>

                            {/* Step content */}
                            <div
                                className={`flex-1 bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 ${index % 2 === 0 ? "md:mr-[7%]" : "md:ml-[7%]"
                                    }`}
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-white/70">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
