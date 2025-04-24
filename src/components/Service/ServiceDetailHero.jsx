import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
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

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}


// Service data
const services = {
    "game-dev": {
        title: "Game Development",
        icon: <Gamepad2 className="w-12 h-12" />,
        description:
            "SEU's game development team specializes in creating engaging, high-performance games for mobile, PC, and web platforms. Our focus is on developing games that combine innovative gameplay with stunning visuals, leveraging the latest in Unity and web-based game technologies.",
        color: "#4361ee",
        image: gamedevelop,
        shortDesc: "Innovative gaming experiences for modern platforms",
    },
    "mobile-app": {
        title: "Mobile Application",
        icon: <Smartphone className="w-12 h-12" />,
        description:
            "Our mobile application team creates cutting-edge apps for iOS and Android platforms. We focus on developing user-friendly, performance-optimized applications that solve real business problems and enhance user engagement through intuitive design and seamless functionality.",
        color: "#4cc9f0",
        image: mobileapp,
        shortDesc: "User-centric mobile solutions for business growth",
    },
    "software-solutions": {
        title: "Software Solutions",
        icon: <Code2 className="w-12 h-12" />,
        description:
            "SEU delivers custom software solutions designed to address specific business challenges. Our team specializes in developing scalable, secure applications that streamline operations, enhance productivity, and provide valuable insights through data analytics and reporting.",
        color: "#3a0ca3",
        image: software,
        shortDesc: "Tailored software for operational excellence",
    },
    "ar-solutions": {
        title: "Augmented Reality",
        icon: <Glasses className="w-12 h-12" />,
        description:
            "Our AR solutions team creates immersive experiences that blend digital content with the physical world. We're focused on developing practical AR applications for marketing, education, and industrial use cases that enhance engagement and provide innovative ways to interact with information.",
        color: "#4361ee",
        image: augmented,
        shortDesc: "Interactive AR experiences for practical applications",
    },
    "vr-solutions": {
        title: "Virtual Reality",
        icon: <VrHeadset className="w-12 h-12" />,
        description:
            "SEU's VR team specializes in creating immersive virtual environments for training, education, and entertainment. We develop VR experiences that provide realistic simulations, interactive learning environments, and engaging entertainment options using the latest VR technologies.",
        color: "#4cc9f0",
        image: virtual,
        shortDesc: "Immersive VR for training and entertainment",
    },
    "sap-solutions": {
        title: "SAP Solutions",
        icon: <Database className="w-12 h-12" />,
        description:
            "Our SAP solutions team provides implementation, customization, and support services for businesses looking to optimize their operations with SAP. We focus on delivering tailored SAP solutions that align with business objectives and streamline processes across departments.",
        color: "#3a0ca3",
        image: sap,
        shortDesc: "Optimized SAP implementation and support",
    },
    "hardware-design": {
        title: "Technology Hardware Design",
        icon: <Cpu className="w-12 h-12" />,
        description:
            "SEU's hardware design team creates custom technology solutions for specific business needs. We specialize in developing IoT devices, embedded systems, and specialized hardware that integrates seamlessly with software solutions to provide comprehensive technology ecosystems.",
        color: "#4361ee",
        image: hardwaredesign,
        shortDesc: "Custom hardware for specialized applications",
    },
    "import-export": {
        title: "Import & Export of Technology",
        icon: <Globe className="w-12 h-12" />,
        description:
            "Our import and export services facilitate the global movement of technology products and solutions. We navigate international regulations and logistics to ensure businesses can access the latest technology hardware and software from around the world.",
        color: "#4cc9f0",
        image: technology,
        shortDesc: "Global technology procurement solutions",
    },
    marketing: {
        title: "Marketing",
        icon: <BarChart3 className="w-12 h-12" />,
        description:
            "SEU's marketing team delivers data-driven strategies that build brand awareness and generate measurable results. We specialize in digital marketing, content creation, and campaign management that connects businesses with their target audiences through compelling messaging and strategic placement.",
        color: "#3a0ca3",
        image: marketing,
        shortDesc: "Results-oriented digital marketing strategies",
    },
    // Add fallback for unknown service IDs
    default: {
        title: "Technology Services",
        icon: <Code2 className="w-12 h-12" />,
        description: "Comprehensive technology services tailored to your business needs.",
        color: "#4361ee",
        image: "/placeholder.svg?height=800&width=1200",
        shortDesc: "Innovative technology solutions",
    },
}

export default function ServiceDetailHero({ serviceId }) {
    const service = services[serviceId] || services.default

    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const imageRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !contentRef.current || !imageRef.current) return

        const ctx = gsap.context(() => {
            // Animate content
            gsap.from(contentRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })

            // Animate image
            gsap.from(imageRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })

            // Parallax effect on scroll
            gsap.to(imageRef.current, {
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="min-h-[80vh] flex items-center relative overflow-hidden py-20 md:py-32">
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${service.color}20 0%, rgba(0, 0, 0, 0) 70%)`,
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div ref={contentRef}>
                        {/* Service category */}
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6">
                            SEU Technology Services
                        </div>

                        {/* Service icon */}
                        <div
                            className="w-20 h-20 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-blue-900/40 to-blue-900/20 backdrop-blur-sm border border-blue-500/30"
                            style={{ color: service.color }}
                        >
                            {service.icon}
                        </div>

                        {/* Service title */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                                {service.title}
                            </span>
                        </h1>

                        {/* Service description */}
                        <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">{service.description}</p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                            <motion.a
                                href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-full text-white font-medium text-lg shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                            >
                                <span>Explore Features</span>
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </motion.a>

                            <motion.a
                                href="/contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                    setTimeout(() => {
                                        window.location.href = "/contact";
                                    }, 300); // Adjust this delay if needed
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/40 rounded-full text-white font-medium text-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <span>Request Quote</span>
                            </motion.a>
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10">
                            <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
