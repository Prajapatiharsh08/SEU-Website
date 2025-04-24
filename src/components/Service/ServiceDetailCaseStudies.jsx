import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Case studies for each service - Updated for a company founded in 2024
const serviceCaseStudies = {
    "game-dev": [
        {
            title: "Educational Game Prototype",
            client: "Internal R&D Project",
            description:
                "Developed a prototype educational game that teaches programming concepts through interactive puzzles and challenges.",
            challenge:
                "Create an engaging learning experience that makes complex programming concepts accessible to beginners.",
            solution:
                "Designed a game with progressive difficulty levels, visual programming elements, and immediate feedback systems.",
            results: [
                "Successfully tested with focus group of 15 students",
                "95% of testers reported improved understanding of basic programming concepts",
                "Currently preparing for full development phase",
                "Potential partnership discussions with educational institutions",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Mobile Puzzle Game Concept",
            client: "SEU Game Studio",
            description: "Created a concept and playable demo for an innovative puzzle game targeting casual mobile gamers.",
            challenge: "Develop a unique puzzle mechanic that's easy to learn but offers depth for long-term engagement.",
            solution:
                "Designed a physics-based puzzle system with intuitive touch controls and progressively complex challenges.",
            results: [
                "Positive feedback from initial playtesting sessions",
                "Demo completed within 6 weeks from concept to playable prototype",
                "Currently refining core mechanics based on user feedback",
                "Scheduled for full development in Q3 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "mobile-app": [
        {
            title: "Retail Inventory Management App",
            client: "Internal Showcase Project",
            description: "Developed a prototype inventory management app for small retail businesses.",
            challenge:
                "Create an intuitive, affordable inventory solution for small businesses without extensive IT resources.",
            solution:
                "Built a cross-platform application with barcode scanning, inventory tracking, and simple analytics features.",
            results: [
                "Functional prototype completed in 8 weeks",
                "Successfully demonstrated at 2 local business networking events",
                "Currently gathering feedback from potential users",
                "Planning full development with additional features for Q3 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Fitness Tracking Concept",
            client: "SEU Mobile Lab",
            description: "Designed a fitness tracking app concept with social features and AI-powered recommendations.",
            challenge: "Create a fitness app that differentiates itself in a crowded market through innovative features.",
            solution:
                "Developed a concept featuring AI workout recommendations, social challenges, and integration with multiple wearable devices.",
            results: [
                "Completed UI/UX design and interactive prototype",
                "Positive feedback from initial user testing sessions",
                "Currently developing core functionality for MVP",
                "Exploring potential partnerships with fitness equipment manufacturers",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "software-solutions": [
        {
            title: "E-commerce Platform for Egglife Foods",
            client: "Egglife Foods",
            description: "Developed a feature-rich e-commerce website for Egglife Foods to improve online sales and customer engagement.",
            challenge:
                "Create a seamless, responsive online shopping experience for a growing food brand while supporting product customization and direct-to-consumer sales.",
            solution:
                "Built a robust e-commerce platform with an intuitive user interface, secure payment processing, and integration with the company’s inventory and order management systems.",
            results: [
                "Launched a fully functional, mobile-responsive e-commerce site",
                "Successfully integrated third-party shipping and payment gateways",
                "Enhanced customer experience with personalized product recommendations",
                "Achieved a 40% increase in online sales within the first 6 months",
            ],
            image: "/images/projects/egglife-foods.png",
        },
        {
            title: "Tech-Driven Learning Platform for Ready for Udaan",
            client: "Ready for Udaan",
            description: "Developed an interactive learning platform designed to offer personalized learning paths for career development and upskilling.",
            challenge:
                "Design an engaging and user-friendly platform that could handle personalized content delivery while being scalable for a growing user base.",
            solution:
                "Built a modular learning management system (LMS) that offers personalized courses, progress tracking, and interactive assessments for career development.",
            results: [
                "Successfully deployed platform with real-time analytics for learners",
                "Achieved strong user engagement with an interactive UI and rich media content",
                "Facilitated a 50% increase in student course completion rates",
                "Preparing for a major platform update to integrate AI-powered learning paths",
            ],
            image: "/images/projects/ready-for-udaan.png",
        },
    ],
    "ar-solutions": [
        {
            title: "AR Product Visualization Prototype",
            client: "Internal R&D Project",
            description: "Developed a prototype AR application for visualizing products in real-world environments.",
            challenge: "Create an accessible AR solution that allows users to accurately visualize products in their space.",
            solution: "Built a WebAR prototype with accurate 3D product rendering, scaling, and placement capabilities.",
            results: [
                "Functional prototype successfully demonstrating core concept",
                "Tested with 5 different product categories",
                "Currently enhancing tracking stability and visual quality",
                "Preparing for demonstrations with potential retail partners",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Educational AR Concept",
            client: "SEU AR Lab",
            description: "Designed an educational AR concept for interactive learning experiences.",
            challenge: "Develop AR experiences that make complex educational topics more engaging and comprehensible.",
            solution:
                "Created a concept for AR-enhanced learning materials with interactive 3D models and guided explorations.",
            results: [
                "Completed concept design and sample AR experiences",
                "Positive feedback from educational consultants",
                "Currently developing expanded content library",
                "Planning pilot program with local educational institutions",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "vr-solutions": [
        {
            title: "VR Training Simulation Prototype",
            client: "Internal Showcase Project",
            description: "Developed a prototype VR training simulation for workplace safety procedures.",
            challenge: "Create an immersive, effective training environment for potentially hazardous workplace scenarios.",
            solution: "Built a VR simulation with realistic interactions, guided procedures, and performance assessment.",
            results: [
                "Functional prototype demonstrating core training scenarios",
                "Successfully showcased at industry safety conference",
                "Currently expanding scenario library and assessment tools",
                "In discussions with potential industrial partners for customization",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Virtual Collaboration Space Concept",
            client: "SEU VR Lab",
            description: "Designed a concept for a virtual collaboration environment for remote teams.",
            challenge: "Create a VR space that enhances remote collaboration beyond traditional video conferencing.",
            solution: "Developed a concept featuring spatial audio, 3D document sharing, and interactive whiteboards.",
            results: [
                "Completed detailed design and interactive prototype",
                "Positive feedback from initial user testing",
                "Currently implementing core functionality",
                "Planning closed beta testing for Q3 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "sap-solutions": [
        {
            title: "SAP Implementation Framework",
            client: "Internal Methodology Project",
            description: "Developed a structured framework for efficient SAP implementations for mid-sized businesses.",
            challenge: "Create a streamlined approach to SAP implementation that reduces complexity and implementation time.",
            solution:
                "Designed a phased implementation methodology with pre-configured templates and industry-specific best practices.",
            results: [
                "Completed framework documentation and implementation guides",
                "Successfully validated through internal review process",
                "Currently developing training materials and support tools",
                "Preparing for first client implementation projects",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "SAP Integration Concept",
            client: "SEU SAP Team",
            description: "Designed a concept for seamless integration between SAP and legacy systems.",
            challenge: "Develop an approach to integrate SAP with existing business systems without disrupting operations.",
            solution: "Created a middleware concept with standardized connectors and data transformation capabilities.",
            results: [
                "Completed technical design and integration architecture",
                "Successfully tested with sample legacy system configurations",
                "Currently developing connector library",
                "Planning pilot implementation for Q4 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "hardware-design": [
        {
            title: "IoT Monitoring Device Prototype",
            client: "Internal R&D Project",
            description: "Developed a prototype IoT device for environmental monitoring in industrial settings.",
            challenge: "Create a robust, low-power monitoring solution that can operate in challenging environments.",
            solution:
                "Designed a sensor-equipped device with long battery life, wireless connectivity, and durable enclosure.",
            results: [
                "Functional prototype successfully demonstrating core capabilities",
                "Completed initial testing in simulated industrial environments",
                "Currently optimizing power consumption and connectivity",
                "Preparing for field testing with potential industrial partners",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Smart Retail Device Concept",
            client: "SEU Hardware Lab",
            description: "Designed a concept for an interactive retail display with customer analytics capabilities.",
            challenge:
                "Develop a retail technology solution that enhances customer experience while providing valuable data.",
            solution:
                "Created a concept for a smart display with touch interaction, product recognition, and anonymous analytics.",
            results: [
                "Completed design specifications and component selection",
                "Built initial proof-of-concept for core technologies",
                "Currently developing integrated prototype",
                "Planning demonstrations for retail industry partners in Q3 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    "import-export": [
        {
            title: "Technology Import Process Framework",
            client: "Internal Methodology Project",
            description: "Developed a structured framework for efficient technology importing operations.",
            challenge:
                "Create a streamlined approach to technology importing that navigates regulatory requirements efficiently.",
            solution:
                "Designed a comprehensive process with documentation templates, compliance checklists, and logistics guidelines.",
            results: [
                "Completed framework documentation and process guides",
                "Successfully validated through internal review process",
                "Currently establishing relationships with international suppliers",
                "Preparing for first client import projects",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
        {
            title: "Global Technology Sourcing Strategy",
            client: "SEU Import-Export Team",
            description: "Developed a strategic approach to global technology sourcing for various product categories.",
            challenge: "Create a methodology for identifying optimal global sources for different technology products.",
            solution:
                "Designed a multi-factor evaluation system considering quality, cost, reliability, and compliance factors.",
            results: [
                "Completed strategy documentation and evaluation tools",
                "Successfully applied to initial product categories",
                "Currently building supplier database and relationship network",
                "Planning first sourcing projects for Q3 2024",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
    marketing: [
        {
            title: "Real Estate Digital Presence Enhancement",
            client: "Shivalik Group",
            description: "Executed a comprehensive digital marketing initiative to elevate Shivalik Group’s online presence and brand perception.",
            challenge:
                "Position a reputed real estate brand prominently in a saturated digital landscape while preserving its legacy-driven image.",
            solution:
                "Devised and implemented an integrated campaign strategy combining SEO, performance marketing, content design, and lead generation.",
            results: [
                "Increased qualified web traffic by 60% within three months",
                "Achieved a 35% improvement in social media engagement rates",
                "Strengthened brand consistency across all digital platforms",
                "Generated substantial inbound inquiries through paid and organic channels",
            ],
            image: "/images/projects/shivalik.png",
        },
        {
            title: "Product-Focused Lead Generation Campaign",
            client: "Royale Touche Plywood",
            description: "Designed and launched a high-impact landing page and lead generation campaign for Royale Touche’s plywood division.",
            challenge:
                "Attract niche B2B buyers and distributors through a targeted digital funnel focused on product features and premium appeal.",
            solution:
                "Developed a performance-driven microsite paired with a paid ad campaign optimized for conversions and market education.",
            results: [
                "Built a responsive, SEO-optimized microsite in under 3 weeks",
                "Achieved 5x ROI through Meta and Google Ads in the first campaign cycle",
                "Generated over 1,200 qualified leads within the initial launch phase",
                "Enhanced the digital footprint of a legacy offline brand",
            ],
            image: "/images/projects/royale-touche.png",
        },
    ],
    default: [
        {
            title: "Technology Solution Framework",
            client: "Internal Methodology Project",
            description: "Developed a structured framework for delivering technology solutions across various domains.",
            challenge: "Create a flexible yet consistent approach to technology solution development and implementation.",
            solution:
                "Designed a modular methodology that can be tailored to different technology domains while maintaining quality standards.",
            results: [
                "Completed framework documentation and implementation guides",
                "Successfully validated through internal review process",
                "Currently developing training materials for implementation teams",
                "Preparing for application in upcoming client projects",
            ],
            image: "/placeholder.svg?height=600&width=800",
        },
    ],
}

export default function ServiceDetailCaseStudies({ serviceId }) {
    const caseStudies = serviceCaseStudies[serviceId] || serviceCaseStudies.default
    const [currentIndex, setCurrentIndex] = useState(0)

    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const caseStudyRef = useRef(null)

    // Handle navigation
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1))
    }

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !caseStudyRef.current) return

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

            // Animate case study
            gsap.from(caseStudyRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: caseStudyRef.current,
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
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Projects
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Current Initiatives
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Explore our current projects and initiatives that showcase our capabilities and innovative approach.
                    </p>
                </div>

                {/* Case studies carousel */}
                <div ref={caseStudyRef} className="max-w-6xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm rounded-2xl border border-blue-900/30 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                {/* Case study image */}
                                <div className="relative h-64 lg:h-auto overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${caseStudies[currentIndex].image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <div className="inline-block px-4 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm">
                                            Project {currentIndex + 1} of {caseStudies.length}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{caseStudies[currentIndex].title}</h3>
                                        <p className="text-white/70">Initiative: {caseStudies[currentIndex].client}</p>
                                    </div>
                                </div>

                                {/* Case study content */}
                                <div className="p-8">
                                    <h4 className="text-xl font-bold text-white mb-4">Overview</h4>
                                    <p className="text-white/80 mb-6">{caseStudies[currentIndex].description}</p>

                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-white mb-2">Challenge</h4>
                                        <p className="text-white/80">{caseStudies[currentIndex].challenge}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-white mb-2">Solution</h4>
                                        <p className="text-white/80">{caseStudies[currentIndex].solution}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Current Status</h4>
                                        <ul className="space-y-2">
                                            {caseStudies[currentIndex].results.map((result, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                    </div>
                                                    <span className="text-white/80">{result}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    {caseStudies.length > 1 && (
                        <div className="flex justify-center mt-8 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/40 hover:text-blue-300 flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/40 hover:text-blue-300 flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    )}

                    {/* Pagination dots */}
                    {caseStudies.length > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            {caseStudies.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-500 w-6" : "bg-blue-900/50 hover:bg-blue-800"
                                        }`}
                                    aria-label={`Go to case study ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
