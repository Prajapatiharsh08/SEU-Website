import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageSquare, Lightbulb, Paintbrush, Code, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function AboutProcess() {
    const sectionRef = useRef(null)
    const [activeStep, setActiveStep] = useState(0)

    // Process steps data
    const processSteps = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Discovery",
            description:
                "We begin by understanding your business, objectives, and target audience through in-depth consultations and research.",
            details: [
                "Stakeholder interviews",
                "Market research",
                "Competitive analysis",
                "Goal definition",
                "User persona development",
            ],
            color: "from-blue-600 to-blue-800",
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Strategy",
            description:
                "Based on our findings, we develop a comprehensive strategy that aligns with your goals and resonates with your audience.",
            details: [
                "Content strategy",
                "Technical planning",
                "User journey mapping",
                "KPI definition",
                "Resource allocation",
            ],
            color: "from-indigo-600 to-indigo-800",
        },
        {
            icon: <Paintbrush className="w-8 h-8" />,
            title: "Design",
            description:
                "Our designers create visually stunning concepts that embody your brand while ensuring optimal user experience.",
            details: ["Wireframing", "UI/UX design", "Prototype development", "Brand integration", "Design system creation"],
            color: "from-blue-700 to-indigo-900",
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: "Development",
            description:
                "Our development team brings designs to life with clean, efficient code and cutting-edge technologies.",
            details: [
                "Frontend development",
                "Backend integration",
                "Responsive implementation",
                "Performance optimization",
                "Security implementation",
            ],
            color: "from-blue-600 to-indigo-700",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Testing",
            description:
                "Rigorous testing ensures your digital product functions flawlessly across all devices and scenarios.",
            details: [
                "Functionality testing",
                "Compatibility testing",
                "Performance testing",
                "User testing",
                "Security auditing",
            ],
            color: "from-indigo-700 to-blue-900",
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Launch & Support",
            description:
                "We ensure a smooth launch and provide ongoing support to help your digital presence thrive and evolve.",
            details: ["Deployment", "Analytics setup", "Training & documentation", "Maintenance planning", "Growth strategy"],
            color: "from-blue-800 to-indigo-900",
        },
    ]

    // Auto-rotate process steps
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % processSteps.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [processSteps.length])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".process-title", {
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

            // Animate process steps
            gsap.from(".process-step", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-steps",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })

            // Animate process visualization
            gsap.from(".process-visualization", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-visualization",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="process" ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"></div>

            {/* Content */}
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Process
                    </div>
                    <h2 className="process-title text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        How We Bring Ideas to Life
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Our proven methodology ensures consistent results and exceptional quality across all projects. Each step is
                        carefully designed to maximize efficiency and creativity.
                    </p>
                </div>

                {/* <div className="process-steps flex flex-wrap justify-center gap-6 mb-16 px-4">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`process-step flex items-center justify-center gap-4 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 
                                    ${activeStep === index
                                    ? `bg-gradient-to-r ${step.color} text-white shadow-2xl`
                                    : "bg-blue-900/20 text-white/70 hover:bg-blue-900/30 hover:text-white"
                                }`}
                            onClick={() => setActiveStep(index)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="icon-container w-8 h-8 flex items-center justify-center rounded-full text-3xl text-white shadow-lg">
                                {step.icon}
                            </div>
                            <h4 className="font-medium text-center">{step.title}</h4>
                        </motion.div>
                    ))}
                </div> */}

                {/* Process visualization */}
                <div className="process-visualization relative max-w-5xl mx-auto">
                    {/* Connection lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 transform -translate-y-1/2 opacity-30"></div>

                    {/* Step indicators */}
                    <div className="relative flex justify-between mb-16">
                        {processSteps.map((_, index) => (
                            <div key={index} className="relative">
                                <motion.div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${index <= activeStep ? `bg-gradient-to-r ${processSteps[index].color}` : "bg-blue-900/30"
                                        }`}
                                    animate={{
                                        scale: index === activeStep ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: index === activeStep ? Number.POSITIVE_INFINITY : 0,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <span className="text-white text-sm font-bold">{index + 1}</span>
                                </motion.div>
                                {index < processSteps.length - 1 && (
                                    <motion.div
                                        className="absolute top-1/2 left-full h-0.5 bg-blue-600 transform -translate-y-1/2"
                                        style={{ width: `calc(100vw / ${processSteps.length} - 3rem)` }}
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: index < activeStep ? 1 : 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Active step details */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Step info */}
                                <div className="md:w-1/2">
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${processSteps[activeStep].color} flex items-center justify-center text-white mb-6`}
                                    >
                                        {processSteps[activeStep].icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">
                                        Step {activeStep + 1}: {processSteps[activeStep].title}
                                    </h3>
                                    <p className="text-white/80 text-lg mb-6">{processSteps[activeStep].description}</p>

                                    <div className="flex gap-4 mt-auto">
                                        <button
                                            onClick={() => setActiveStep(activeStep === 0 ? processSteps.length - 1 : activeStep - 1)}
                                            className="p-2 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5 transform rotate-180" />
                                        </button>
                                        <button
                                            onClick={() => setActiveStep((activeStep + 1) % processSteps.length)}
                                            className="p-2 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Step details */}
                                <div className="md:w-1/2">
                                    <h4 className="text-lg font-medium mb-4 text-white/90">What happens in this phase:</h4>
                                    <ul className="space-y-3">
                                        {processSteps[activeStep].details.map((detail, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div
                                                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${processSteps[activeStep].color} flex-shrink-0 flex items-center justify-center mt-0.5`}
                                                >
                                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-white/80">{detail}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
