import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Process steps for each service
const serviceProcesses = {
    "game-dev": [
        {
            title: "Concept & Planning",
            description:
                "We collaborate with you to define game concept, target audience, core mechanics, and project scope.",
        },
        {
            title: "Design & Prototyping",
            description: "Our team creates game design documents and develops playable prototypes to validate core gameplay.",
        },
        {
            title: "Asset Creation",
            description:
                "We develop the visual and audio elements needed for your game, including graphics, animations, and sound.",
        },
        {
            title: "Development",
            description:
                "Our developers build the game using appropriate technologies, implementing mechanics, systems, and user interfaces.",
        },
        {
            title: "Testing & Refinement",
            description: "We conduct thorough testing to identify issues, optimize performance, and refine gameplay balance.",
        },
        {
            title: "Launch & Support",
            description: "We assist with deployment to appropriate platforms and provide ongoing updates and support.",
        },
    ],
    "mobile-app": [
        {
            title: "Discovery & Planning",
            description: "We analyze your business needs, target users, and technical requirements to define the app scope.",
        },
        {
            title: "UI/UX Design",
            description:
                "Our designers create intuitive, engaging interfaces and user flows optimized for mobile experiences.",
        },
        {
            title: "Architecture Planning",
            description: "We design a robust technical architecture that ensures scalability, security, and performance.",
        },
        {
            title: "Development",
            description:
                "Our developers build the application using native or cross-platform technologies based on requirements.",
        },
        {
            title: "Testing & QA",
            description: "We conduct comprehensive testing across devices, operating systems, and network conditions.",
        },
        {
            title: "Deployment & Maintenance",
            description: "We handle app store submission, launch, and provide ongoing updates and support services.",
        },
    ],
    "software-solutions": [
        {
            title: "Requirements Analysis",
            description: "We work with you to understand your business challenges and define solution requirements.",
        },
        {
            title: "Solution Design",
            description: "Our team creates detailed technical specifications and architecture for your custom solution.",
        },
        {
            title: "Development",
            description: "We build your solution using modern technologies and development practices.",
        },
        {
            title: "Integration",
            description: "Our experts ensure your new solution integrates seamlessly with existing systems and workflows.",
        },
        {
            title: "Testing & Quality Assurance",
            description: "We conduct thorough testing to ensure reliability, security, and performance.",
        },
        {
            title: "Deployment & Support",
            description: "We implement your solution and provide training, documentation, and ongoing support.",
        },
    ],
    "ar-solutions": [
        {
            title: "Concept Development",
            description: "We work with you to define AR experience goals, target audience, and technical requirements.",
        },
        {
            title: "Experience Design",
            description: "Our team creates storyboards and interaction designs for engaging AR experiences.",
        },
        {
            title: "3D Asset Creation",
            description: "We develop optimized 3D models, animations, and visual effects for AR applications.",
        },
        {
            title: "AR Development",
            description: "Our developers build the AR experience using appropriate platforms and technologies.",
        },
        {
            title: "Testing & Optimization",
            description: "We test across devices to ensure consistent performance, tracking stability, and user experience.",
        },
        {
            title: "Deployment & Analytics",
            description: "We assist with launch and implement analytics to measure engagement and performance.",
        },
    ],
    "vr-solutions": [
        {
            title: "Concept & Planning",
            description: "We define VR experience objectives, user interactions, and technical requirements.",
        },
        {
            title: "Environment Design",
            description: "Our team creates immersive virtual environments and interaction systems.",
        },
        {
            title: "Asset Development",
            description: "We create optimized 3D models, textures, animations, and audio for VR experiences.",
        },
        {
            title: "VR Development",
            description: "Our developers build the VR application using appropriate platforms and technologies.",
        },
        {
            title: "User Testing",
            description: "We conduct usability testing to ensure comfort, intuitive interactions, and performance.",
        },
        {
            title: "Deployment & Support",
            description: "We assist with platform submission and provide ongoing updates and enhancements.",
        },
    ],
    "sap-solutions": [
        {
            title: "Business Analysis",
            description: "We analyze your business processes and requirements to determine optimal SAP implementation.",
        },
        {
            title: "Solution Design",
            description: "Our team designs SAP configuration and customization to match your business needs.",
        },
        {
            title: "Implementation",
            description: "We configure and customize SAP modules according to the approved design.",
        },
        {
            title: "Integration",
            description: "Our experts integrate SAP with existing systems and data sources for seamless operations.",
        },
        {
            title: "Testing & Validation",
            description: "We conduct thorough testing to ensure all processes work correctly and efficiently.",
        },
        {
            title: "Training & Go-Live",
            description: "We provide comprehensive training and support during system launch and transition.",
        },
    ],
    "hardware-design": [
        {
            title: "Requirements Analysis",
            description: "We work with you to define hardware specifications, functionality, and performance requirements.",
        },
        {
            title: "Conceptual Design",
            description: "Our team creates initial designs and selects appropriate components and technologies.",
        },
        {
            title: "Detailed Design",
            description: "We develop detailed schematics, PCB layouts, and mechanical designs.",
        },
        {
            title: "Prototype Development",
            description: "Our engineers build functional prototypes for testing and validation.",
        },
        {
            title: "Testing & Refinement",
            description: "We conduct thorough testing and make necessary refinements to ensure reliability.",
        },
        {
            title: "Production Support",
            description: "We provide documentation and support for manufacturing and quality assurance.",
        },
    ],
    "import-export": [
        {
            title: "Needs Assessment",
            description: "We analyze your technology requirements and identify appropriate global sourcing options.",
        },
        {
            title: "Supplier Selection",
            description: "Our team identifies and evaluates potential suppliers based on quality, reliability, and cost.",
        },
        {
            title: "Regulatory Compliance",
            description: "We ensure all technology imports comply with relevant regulations and standards.",
        },
        {
            title: "Logistics Planning",
            description: "Our experts coordinate shipping, customs clearance, and delivery logistics.",
        },
        {
            title: "Quality Assurance",
            description: "We implement quality control processes to ensure products meet specifications.",
        },
        {
            title: "Delivery & Support",
            description: "We manage final delivery and provide ongoing support for imported technology.",
        },
    ],
    marketing: [
        {
            title: "Strategy Development",
            description: "We create comprehensive marketing strategies aligned with your business objectives.",
        },
        {
            title: "Content Creation",
            description: "Our team develops engaging content across various formats and channels.",
        },
        {
            title: "Campaign Implementation",
            description: "We execute marketing campaigns across digital and traditional channels.",
        },
        {
            title: "Performance Monitoring",
            description: "Our experts track campaign performance using advanced analytics tools.",
        },
        {
            title: "Optimization",
            description: "We continuously refine strategies and tactics based on performance data.",
        },
        {
            title: "Reporting & Analysis",
            description: "We provide detailed reports and insights to measure ROI and inform future strategies.",
        },
    ],
    default: [
        {
            title: "Discovery",
            description: "We analyze your requirements and objectives to define the project scope and deliverables.",
        },
        {
            title: "Planning",
            description: "Our team develops a comprehensive strategy and project plan tailored to your needs.",
        },
        {
            title: "Design",
            description: "We create detailed designs and specifications for your solution.",
        },
        {
            title: "Development",
            description: "Our experts build your solution using cutting-edge technologies and best practices.",
        },
        {
            title: "Testing",
            description: "We conduct thorough testing to ensure quality, performance, and reliability.",
        },
        {
            title: "Deployment",
            description: "We implement your solution and provide comprehensive training and documentation.",
        },
    ],
}

export default function ServiceDetailProcess({ serviceId }) {
    const process = serviceProcesses[serviceId] || serviceProcesses.default

    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const processRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !processRef.current) return

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
            const steps = processRef.current.querySelectorAll(".process-step")
            gsap.from(steps, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            })

            // Animate process line
            gsap.from(".process-line", {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-black/50">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Approach
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Development Process
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Our structured methodology ensures consistent quality, timely delivery, and exceptional results.
                    </p>
                </div>

                {/* Process timeline */}
                <div ref={processRef} className="max-w-4xl mx-auto relative">
                    <div className="process-line absolute left-[28px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full"></div>

                    {process.map((step, index) => (
                        <div key={index} className="process-step relative flex items-start gap-6 mb-12">
                            {/* Step number */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-blue-900/30 backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/20 flex-shrink-0"
                            >
                                <div className="text-xl font-bold text-blue-400">{(index + 1).toString().padStart(2, "0")}</div>
                            </motion.div>

                            {/* Step content */}
                            <div className="flex-1 bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6">
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
