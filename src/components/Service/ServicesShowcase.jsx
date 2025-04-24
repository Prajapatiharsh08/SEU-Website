import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Gamepad2,
    Smartphone,
    Code2,
    Glasses,
    HeadsetIcon as VrHeadset,
    Database,
    Cpu,
    Globe,
    BarChart3,
    ChevronRight,
} from "lucide-react"
import gamedevelop from '../../../public/Images/Services/gamedevelop.png'
import mobileapp from '../../../public/Images/Services/mobileapp.png'
import software from '../../../public/Images/Services/software.png'
import augmented from '../../../public/Images/Services/augmented.png'
import virtual from '../../../public/Images/Services/virtual.png'
import sap from '../../../public/Images/Services/sap.png'
import hardwaredesign from '../../../public/Images/Services/hardwaredesign.png'
import technology from '../../../public/Images/Services/technology.png'
import marketing from '../../../public/Images/Services/marketing.png'
import { Link } from "react-router-dom"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Service data
const services = [
    {
        id: "game-dev",
        title: "Game Development",
        icon: <Gamepad2 className="w-8 h-8" />,
        shortDesc: "Immersive gaming experiences across platforms",
        description:
            "Our game development team creates captivating, high-performance games for mobile, console, and PC platforms. We specialize in Unity and Unreal Engine development, delivering engaging gameplay, stunning visuals, and seamless performance.",
        color: "#4361ee",
        image: gamedevelop,
        features: [
            "AAA-quality game development",
            "Cross-platform compatibility",
            "Unity & Unreal Engine expertise",
            "3D modeling and animation",
            "Game physics and mechanics",
            "Multiplayer infrastructure",
        ],
    },
    {
        id: "mobile-app",
        title: "Mobile Application",
        icon: <Smartphone className="w-8 h-8" />,
        shortDesc: "Native & cross-platform mobile solutions",
        description:
            "We develop cutting-edge mobile applications for iOS and Android platforms, focusing on intuitive user experiences, performance optimization, and scalable architectures. Our mobile solutions leverage the latest technologies to deliver exceptional results.",
        color: "#4cc9f0",
        image: mobileapp,
        features: [
            "Native iOS & Android development",
            "Cross-platform solutions (React Native, Flutter)",
            "UI/UX design excellence",
            "Performance optimization",
            "Secure authentication systems",
            "Offline functionality",
        ],
    },
    {
        id: "software-solutions",
        title: "Software Solutions",
        icon: <Code2 className="w-8 h-8" />,
        shortDesc: "Custom enterprise software development",
        description:
            "Our software solutions address complex business challenges with tailored applications built on robust, scalable architectures. We specialize in enterprise-grade systems that optimize operations, enhance productivity, and drive digital transformation.",
        color: "#3a0ca3",
        image: software,
        features: [
            "Custom enterprise applications",
            "Cloud-native architecture",
            "Microservices implementation",
            "Legacy system modernization",
            "API development & integration",
            "DevOps & CI/CD pipelines",
        ],
    },
    {
        id: "ar-solutions",
        title: "Augmented Reality",
        icon: <Glasses className="w-8 h-8" />,
        shortDesc: "Blending digital content with the real world",
        description:
            "Our AR solutions create immersive experiences that blend digital content with the physical world. From interactive marketing campaigns to industrial applications, we leverage cutting-edge AR technologies to deliver innovative solutions across sectors.",
        color: "#4361ee",
        image: augmented,
        features: [
            "AR app development (iOS/Android)",
            "WebAR solutions",
            "3D object recognition & tracking",
            "Location-based AR experiences",
            "AR for marketing & advertising",
            "Industrial AR applications",
        ],
    },
    {
        id: "vr-solutions",
        title: "Virtual Reality",
        icon: <VrHeadset className="w-8 h-8" />,
        shortDesc: "Immersive virtual environments & experiences",
        description:
            "We create immersive VR experiences that transport users to fully interactive virtual environments. Our VR solutions span entertainment, training, education, and enterprise applications, delivering high-fidelity experiences with intuitive interactions.",
        color: "#4cc9f0",
        image: virtual,
        features: [
            "VR application development",
            "360° immersive experiences",
            "Interactive VR environments",
            "Multi-user VR capabilities",
            "VR for training & simulation",
            "Enterprise VR solutions",
        ],
    },
    {
        id: "sap-solutions",
        title: "SAP Solutions",
        icon: <Database className="w-8 h-8" />,
        shortDesc: "Enterprise resource planning & integration",
        description:
            "Our SAP expertise enables businesses to optimize operations, enhance decision-making, and drive digital transformation. We provide end-to-end SAP services including implementation, customization, integration, and support for the complete SAP ecosystem.",
        color: "#3a0ca3",
        image: sap,
        features: [
            "SAP S/4HANA implementation",
            "SAP Cloud Platform solutions",
            "SAP integration services",
            "SAP analytics & reporting",
            "SAP security & compliance",
            "SAP support & maintenance",
        ],
    },
    {
        id: "hardware-design",
        title: "Technology Hardware Design",
        icon: <Cpu className="w-8 h-8" />,
        shortDesc: "Custom hardware solutions & prototyping",
        description:
            "We design and develop custom hardware solutions that address specific technological challenges. Our hardware design services encompass conceptualization, prototyping, testing, and production support for innovative technology products across industries.",
        color: "#4361ee",
        image: hardwaredesign,
        features: [
            "Custom hardware design",
            "PCB design & development",
            "IoT device engineering",
            "Embedded systems",
            "Hardware prototyping",
            "Production support",
        ],
    },
    {
        id: "import-export",
        title: "Import & Export of Technology",
        icon: <Globe className="w-8 h-8" />,
        shortDesc: "Global technology procurement & distribution",
        description:
            "Our import and export services facilitate the global movement of technology hardware and solutions. We navigate international regulations, logistics, and supply chain challenges to ensure seamless procurement and distribution of technology products worldwide.",
        color: "#4cc9f0",
        image: technology,
        features: [
            "International technology procurement",
            "Export compliance management",
            "Global logistics coordination",
            "Supply chain optimization",
            "Customs documentation & clearance",
            "International trade consulting",
        ],
    },
    {
        id: "marketing",
        title: "Marketing",
        icon: <BarChart3 className="w-8 h-8" />,
        shortDesc: "Strategic digital marketing & brand development",
        description:
            "Our marketing services combine creative strategy with data-driven execution to build powerful brands and generate measurable results. We deliver comprehensive marketing solutions across digital channels, traditional media, and emerging platforms.",
        color: "#3a0ca3",
        image: marketing,
        features: [
            "Digital marketing strategy",
            "Brand development & positioning",
            "Content marketing & SEO",
            "Social media management",
            "PPC & performance marketing",
            "Marketing analytics & reporting",
        ],
    },
]

export default function ServicesShowcase() {
    const [activeService, setActiveService] = useState(services[0])
    const [isAnimating, setIsAnimating] = useState(false)
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const cardsRef = useRef(null)
    const detailsRef = useRef(null)

    // Handle service selection
    const handleServiceClick = (service) => {
        if (isAnimating || service.id === activeService.id) return
        setIsAnimating(true)
        setActiveService(service)
        setTimeout(() => setIsAnimating(false), 600)
    }

    // GSAP animations
    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !sectionRef.current ||
            !headingRef.current ||
            !cardsRef.current ||
            !detailsRef.current
        )
            return

        const timeout = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Animate heading
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

                // Animate cards
                const cards = cardsRef.current.querySelectorAll(".service-card")
                if (cards.length > 0) {
                    gsap.from(cards, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    })
                }

                // Animate details
                gsap.from(detailsRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: detailsRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                })

                // Force ScrollTrigger to refresh after animation is set
                ScrollTrigger.refresh()
            }, sectionRef)

            return () => ctx.revert()
        }, 100) // delay to ensure DOM is fully ready

        return () => clearTimeout(timeout)
    }, [])

    return (
        <section id="services" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Expertise
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Comprehensive Technology Services
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        From concept to execution, we deliver end-to-end solutions that transform your digital presence and
                        technological capabilities.
                    </p>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" style={{ maxHeight: 'unset', overflow: 'visible' }}>
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            className={`service-card group relative overflow-hidden rounded-xl ${service.id === activeService.id
                                ? "bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/50"
                                : "bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-blue-900/30"
                                } backdrop-blur-sm border p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer`}
                            whileHover={{ y: -5, scale: 1.02 }}
                            onClick={() => handleServiceClick(service)}
                        >
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg"></div>

                            {/* Service icon */}
                            <div
                                className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${service.id === activeService.id ? "bg-blue-800/40 text-blue-300" : "bg-blue-900/30 text-blue-400"
                                    } group-hover:bg-blue-800/40 group-hover:text-blue-300 transition-all duration-300`}
                                style={{ color: service.color }}
                            >
                                {service.icon}
                            </div>

                            {/* Service content */}
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-white/70 mb-4">{service.shortDesc}</p>

                            {/* Learn more button */}
                            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                                <span className="text-sm font-medium">Learn more</span>
                                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>

                            {/* Active indicator */}
                            {service.id === activeService.id && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Service details */}
                <div ref={detailsRef} className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm rounded-2xl border border-blue-900/30 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                {/* Service image */}
                                <div className="relative h-64 lg:h-auto overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${activeService.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <div
                                            className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 bg-blue-900/50 backdrop-blur-sm"
                                            style={{ color: activeService.color }}
                                        >
                                            {activeService.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{activeService.title}</h3>
                                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Service content */}
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold text-white mb-4">Overview</h4>
                                    <p className="text-white/80 mb-8">{activeService.description}</p>

                                    <h4 className="text-xl font-bold text-white mb-4">Key Features</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {activeService.features.map((feature, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                </div>
                                                <span className="text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <motion.div
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                                        >
                                            <Link
                                                to={`/services/${activeService.id}`}
                                                className="flex items-center gap-2"
                                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  // Scroll to top smoothly
                                            >
                                                <span>View Details</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </motion.div>
                                        <motion.a
                                            href="/contact"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-transparent border border-white/20 hover:border-white/40 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <span>Request Service</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}