import { useRef, useEffect } from "react"
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
    ChevronRight,
} from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Category data
const categories = [
    {
        id: "digital-experiences",
        title: "Digital Experiences",
        description: "Immersive and interactive digital solutions that captivate users and drive engagement.",
        services: [
            {
                id: "game-dev",
                name: "Game Development",
                icon: <Gamepad2 className="w-5 h-5" />,
            },
            {
                id: "ar-solutions",
                name: "Augmented Reality",
                icon: <Glasses className="w-5 h-5" />,
            },
            {
                id: "vr-solutions",
                name: "Virtual Reality",
                icon: <VrHeadset className="w-5 h-5" />,
            },
        ],
        color: "#4361ee",
        image: "/placeholder.svg?height=600&width=800",
    },
    {
        id: "software-development",
        title: "Software Development",
        description: "Custom software solutions that solve complex business challenges and drive digital transformation.",
        services: [
            {
                id: "software-solutions",
                name: "Enterprise Software",
                icon: <Code2 className="w-5 h-5" />,
            },
            {
                id: "mobile-app",
                name: "Mobile Applications",
                icon: <Smartphone className="w-5 h-5" />,
            },
            {
                id: "sap-solutions",
                name: "SAP Solutions",
                icon: <Database className="w-5 h-5" />,
            },
        ],
        color: "#4cc9f0",
        image: "/placeholder.svg?height=600&width=800",
    },
    {
        id: "hardware-solutions",
        title: "Hardware Solutions",
        description: "Innovative hardware design and global technology procurement services.",
        services: [
            {
                id: "hardware-design",
                name: "Hardware Design",
                icon: <Cpu className="w-5 h-5" />,
            },
            {
                id: "import-export",
                name: "Import & Export",
                icon: <Globe className="w-5 h-5" />,
            },
        ],
        color: "#3a0ca3",
        image: "/placeholder.svg?height=600&width=800",
    },
    {
        id: "marketing-services",
        title: "Marketing Services",
        description: "Strategic marketing solutions that build brands and drive business growth.",
        services: [
            {
                id: "marketing",
                name: "Digital Marketing",
                icon: <BarChart3 className="w-5 h-5" />,
            },
        ],
        color: "#4361ee",
        image: "/placeholder.svg?height=600&width=800",
    },
]

export default function ServiceCategories() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const cardsRef = useRef(null)

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !cardsRef.current) return

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

            // Animate category cards
            const cards = cardsRef.current.querySelectorAll(".category-card")
            gsap.from(cards, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: cardsRef.current,
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
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Service Categories
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Explore Our Service Categories
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Our services are organized into specialized categories to address your specific business needs and
                        technological requirements.
                    </p>
                </div>

                {/* Categories grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="category-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm border border-blue-900/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Category image */}
                            <div className="relative h-48 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${category.image})` }}
                                ></div>
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))`,
                                    }}
                                ></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                                    <div
                                        className="w-16 h-1 rounded-full"
                                        style={{ background: `linear-gradient(to right, ${category.color}, #8a2be2)` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Category content */}
                            <div className="p-6">
                                <p className="text-white/80 mb-6">{category.description}</p>

                                {/* Services list */}
                                <div className="space-y-3 mb-6">
                                    {category.services.map((service) => (
                                        <div key={service.id} className="flex items-center">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                                style={{ backgroundColor: `${category.color}30` }}
                                            >
                                                <div style={{ color: category.color }}>{service.icon}</div>
                                            </div>
                                            <span className="text-white/90">{service.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* View all button */}
                                <a
                                    href={`/services/${category.id}`}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                >
                                    <span className="text-sm font-medium">View all services</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
