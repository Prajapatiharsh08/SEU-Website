import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Service features data
const serviceFeatures = {
    "game-dev": [
        {
            title: "Web & Mobile Game Development",
            description: "We create engaging games optimized for web browsers and mobile devices with responsive design.",
            icon: "🎮",
        },
        {
            title: "Unity Game Development",
            description: "Our team leverages Unity to create cross-platform games with impressive visuals and performance.",
            icon: "🔄",
        },
        {
            title: "HTML5 & WebGL Games",
            description: "We develop browser-based games using modern web technologies for wide accessibility.",
            icon: "⚙️",
        },
        {
            title: "2D & 3D Game Design",
            description: "Our designers create appealing game assets and environments in both 2D and 3D styles.",
            icon: "🎭",
        },
        {
            title: "Game Mechanics & Systems",
            description: "We implement engaging gameplay mechanics and progression systems that keep players coming back.",
            icon: "🧪",
        },
        {
            title: "Multiplayer Functionality",
            description: "Our games can include real-time multiplayer features for competitive or cooperative play.",
            icon: "🌐",
        },
    ],
    "mobile-app": [
        {
            title: "Native iOS & Android Apps",
            description:
                "We build high-performance native applications optimized specifically for iOS and Android platforms.",
            icon: "📱",
        },
        {
            title: "Cross-Platform Development",
            description: "Our expertise in React Native and Flutter enables efficient development across multiple platforms.",
            icon: "🔄",
        },
        {
            title: "User-Centered Design",
            description: "We create intuitive, engaging interfaces that prioritize user experience and accessibility.",
            icon: "🎨",
        },
        {
            title: "Performance Optimization",
            description: "Our applications are optimized for speed, responsiveness, and efficient battery usage.",
            icon: "⚡",
        },
        {
            title: "Secure Data Management",
            description: "We implement robust security measures to protect user data and ensure privacy compliance.",
            icon: "🔒",
        },
        {
            title: "Offline Functionality",
            description:
                "Our applications provide essential functionality even when network connectivity is limited or unavailable.",
            icon: "📶",
        },
    ],
    "software-solutions": [
        {
            title: "Custom Business Applications",
            description: "We develop tailored software solutions that address specific operational challenges.",
            icon: "💼",
        },
        {
            title: "Cloud-Based Solutions",
            description: "Our applications leverage cloud technologies for scalability, reliability, and accessibility.",
            icon: "☁️",
        },
        {
            title: "API Development & Integration",
            description: "We create robust APIs and seamlessly integrate with third-party systems and services.",
            icon: "🔌",
        },
        {
            title: "Data Analytics & Reporting",
            description: "Our solutions include powerful analytics and reporting tools to drive data-informed decisions.",
            icon: "📊",
        },
        {
            title: "Workflow Automation",
            description: "We streamline business processes through intelligent automation and task management.",
            icon: "⚙️",
        },
        {
            title: "Scalable Architecture",
            description: "Our software is built on flexible architectures that can grow with your business needs.",
            icon: "📈",
        },
    ],
    "ar-solutions": [
        {
            title: "AR for Marketing & Advertising",
            description: "We create interactive AR experiences that enhance brand engagement and product visualization.",
            icon: "📱",
        },
        {
            title: "Educational AR Applications",
            description: "Our AR solutions make learning more engaging through interactive 3D visualizations.",
            icon: "🎓",
        },
        {
            title: "AR for Retail & E-commerce",
            description: "We develop virtual try-on and product visualization tools to enhance the shopping experience.",
            icon: "🛍️",
        },
        {
            title: "Industrial AR Applications",
            description: "Our AR solutions assist with maintenance, training, and operations in industrial settings.",
            icon: "🏭",
        },
        {
            title: "Mobile AR Experiences",
            description: "We create accessible AR applications that work on standard smartphones and tablets.",
            icon: "📲",
        },
        {
            title: "WebAR Development",
            description: "Our browser-based AR solutions eliminate the need for app downloads, increasing accessibility.",
            icon: "🌐",
        },
    ],
    "vr-solutions": [
        {
            title: "VR Training Simulations",
            description: "We create immersive training environments for skills development in a safe virtual space.",
            icon: "🎓",
        },
        {
            title: "Virtual Showrooms & Tours",
            description: "Our VR solutions allow customers to explore products and spaces from anywhere.",
            icon: "🏢",
        },
        {
            title: "Educational VR Experiences",
            description: "We develop interactive learning environments that make complex concepts tangible.",
            icon: "📚",
        },
        {
            title: "VR for Entertainment",
            description: "Our team creates engaging VR experiences for gaming and interactive storytelling.",
            icon: "🎭",
        },
        {
            title: "Collaborative VR Environments",
            description: "We build virtual spaces where teams can meet, collaborate, and visualize projects together.",
            icon: "👥",
        },
        {
            title: "WebVR Applications",
            description: "Our browser-based VR solutions provide accessible experiences without specialized hardware.",
            icon: "🌐",
        },
    ],
    "sap-solutions": [
        {
            title: "SAP Implementation",
            description: "We provide end-to-end SAP implementation services tailored to your business requirements.",
            icon: "🚀",
        },
        {
            title: "SAP Integration",
            description: "Our team connects SAP with other business systems for seamless data flow and operations.",
            icon: "🔄",
        },
        {
            title: "SAP Customization",
            description: "We adapt SAP modules to match your specific business processes and requirements.",
            icon: "⚙️",
        },
        {
            title: "SAP Support & Maintenance",
            description: "Our ongoing support ensures your SAP systems run smoothly and efficiently.",
            icon: "🛠️",
        },
        {
            title: "SAP Training",
            description: "We provide comprehensive training to ensure your team can effectively use SAP systems.",
            icon: "👨‍🏫",
        },
        {
            title: "SAP Analytics",
            description: "Our solutions leverage SAP's analytics capabilities to provide actionable business insights.",
            icon: "📊",
        },
    ],
    "hardware-design": [
        {
            title: "IoT Device Development",
            description: "We design and develop Internet of Things devices for various business applications.",
            icon: "📡",
        },
        {
            title: "Embedded Systems",
            description: "Our team creates specialized embedded systems for specific technological needs.",
            icon: "🔌",
        },
        {
            title: "Prototype Development",
            description: "We build functional prototypes to test and validate hardware concepts before full production.",
            icon: "🔬",
        },
        {
            title: "Hardware-Software Integration",
            description: "Our solutions seamlessly connect custom hardware with software systems for complete solutions.",
            icon: "🔄",
        },
        {
            title: "Sensor Networks",
            description: "We design networks of sensors for data collection and environmental monitoring.",
            icon: "📊",
        },
        {
            title: "Custom Control Systems",
            description: "Our team develops specialized control systems for automation and process management.",
            icon: "🎛️",
        },
    ],
    "import-export": [
        {
            title: "Technology Procurement",
            description: "We source and import specialized technology products from global manufacturers.",
            icon: "🌐",
        },
        {
            title: "Supply Chain Management",
            description: "Our team manages the complete supply chain for technology hardware and components.",
            icon: "📦",
        },
        {
            title: "Regulatory Compliance",
            description: "We navigate international regulations and ensure all imported technology meets local standards.",
            icon: "📜",
        },
        {
            title: "Logistics Coordination",
            description: "Our services include managing shipping, customs clearance, and delivery of technology products.",
            icon: "🚢",
        },
        {
            title: "Technology Distribution",
            description: "We help businesses export and distribute their technology products to international markets.",
            icon: "🏭",
        },
        {
            title: "Market Entry Strategy",
            description: "Our team provides guidance on entering new markets with technology products and services.",
            icon: "📈",
        },
    ],
    marketing: [
        {
            title: "Digital Marketing Strategy",
            description: "We develop comprehensive digital marketing strategies aligned with business objectives.",
            icon: "📊",
        },
        {
            title: "Content Creation & Management",
            description: "Our team creates engaging content across various formats and platforms.",
            icon: "✍️",
        },
        {
            title: "Social Media Marketing",
            description: "We build and manage effective social media campaigns to increase brand awareness.",
            icon: "📱",
        },
        {
            title: "SEO & SEM",
            description: "Our experts optimize online presence to improve search visibility and drive qualified traffic.",
            icon: "🔍",
        },
        {
            title: "Email Marketing",
            description: "We design and implement targeted email campaigns that nurture leads and drive conversions.",
            icon: "📧",
        },
        {
            title: "Analytics & Performance Tracking",
            description: "Our solutions include comprehensive analytics to measure and optimize marketing performance.",
            icon: "📈",
        },
    ],
    default: [
        {
            title: "Custom Solutions",
            description: "We develop tailored technology solutions to address your specific business needs.",
            icon: "💡",
        },
        {
            title: "Expert Consultation",
            description: "Our team of experts provides strategic guidance and technical expertise.",
            icon: "👨‍💼",
        },
        {
            title: "Quality Assurance",
            description: "We ensure the highest quality standards through rigorous testing and validation.",
            icon: "✅",
        },
        {
            title: "Ongoing Support",
            description: "We provide comprehensive support and maintenance services for all our solutions.",
            icon: "🛠️",
        },
    ],
}

export default function ServiceDetailFeatures({ serviceId }) {
    const features = serviceFeatures[serviceId] || serviceFeatures.default

    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const featuresRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !featuresRef.current) return

        // const ctx = gsap.context(() => {
        //     // Animate section heading
        //     gsap.from(headingRef.current, {
        //         y: 50,
        //         opacity: 0,
        //         duration: 1,
        //         scrollTrigger: {
        //             trigger: headingRef.current,
        //             start: "top 80%",
        //             toggleActions: "play none none none",
        //         },
        //     })

        //     // Animate features
        //     const featureItems = featuresRef.current.querySelectorAll(".feature-item")
        //     gsap.from(featureItems, {
        //         y: 50,
        //         opacity: 0,
        //         duration: 0.8,
        //         stagger: 0.15,
        //         scrollTrigger: {
        //             trigger: featuresRef.current,
        //             start: "top 75%",
        //             toggleActions: "play none none none",
        //         },
        //     })
        // })

        // return () => ctx.revert()
    }, [])

    return (
        <section id="features" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Key Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        What We Offer
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Discover the comprehensive features and capabilities that set our services apart.
                    </p>
                </div>

                {/* Features grid */}
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-item bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm border border-blue-900/30 rounded-xl p-8 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
