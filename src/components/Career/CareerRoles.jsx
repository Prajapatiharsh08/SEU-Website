import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { Code, Paintbrush, TrendingUp, Database, Smartphone, ChevronRight } from "lucide-react"

export default function CareerRoles() {
    const [activeCategory, setActiveCategory] = useState("development")
    const sectionRef = useRef(null)

    // Role categories
    const categories = [
        { id: "development", name: "Development", icon: <Code className="w-5 h-5" /> },
        { id: "design", name: "Design", icon: <Paintbrush className="w-5 h-5" /> },
        { id: "marketing", name: "Marketing", icon: <TrendingUp className="w-5 h-5" /> },
        { id: "data", name: "Data", icon: <Database className="w-5 h-5" /> },
    ]

    // Roles data
    const roles = {
        development: [
            {
                title: "Senior Frontend Developer",
                type: "Full-time",
                location: "Remote / On-site",
                description:
                    "Lead the development of responsive, high-performance web applications using React, Next.js, and modern frontend technologies.",
                requirements: [
                    "5+ years of frontend development experience",
                    "Expertise in React and Next.js",
                    "Strong TypeScript skills",
                    "Experience with 3D libraries like Three.js",
                ],
            },
            {
                title: "Backend Developer",
                type: "Full-time",
                location: "On-site",
                description:
                    "Design and implement scalable backend systems and APIs to power our digital products and services.",
                requirements: [
                    "3+ years of backend development experience",
                    "Proficiency in Node.js",
                    "Experience with databases (SQL and NoSQL)",
                    "Knowledge of cloud services (AWS/Azure/GCP)",
                ],
            },
            {
                title: "Full Stack Developer",
                type: "Full-time",
                location: "Remote / On-site",
                description:
                    "Work across the entire stack to build and maintain feature-rich web applications from database to frontend.",
                requirements: [
                    "4+ years of full stack development experience",
                    "Strong JavaScript/TypeScript skills",
                    "Experience with React and Node.js",
                    "Database design and optimization",
                ],
            },
        ],
        design: [
            {
                title: "UI/UX Designer",
                type: "Full-time",
                location: "Remote / On-site",
                description: "Create intuitive, engaging user interfaces and experiences for web and mobile applications.",
                requirements: [
                    "3+ years of UI/UX design experience",
                    "Proficiency in Figma and Adobe Creative Suite",
                    "Strong portfolio demonstrating UI/UX projects",
                    "Understanding of design systems",
                ],
            },
            {
                title: "Motion Designer",
                type: "Full-time",
                location: "On-site",
                description:
                    "Develop engaging animations and motion graphics to enhance user experiences across digital platforms.",
                requirements: [
                    "3+ years of motion design experience",
                    "Expertise in After Effects",
                    "Knowledge of web animation technologies",
                    "Understanding of UX principles",
                ],
            },
        ],
        marketing: [
            {
                title: "Digital Marketing Specialist",
                type: "Full-time",
                location: "On-site",
                description:
                    "Plan and execute digital marketing campaigns to drive growth and engagement across multiple channels.",
                requirements: [
                    "3+ years of digital marketing experience",
                    "Experience with SEO/SEM",
                    "Social media marketing expertise",
                    "Analytics and data-driven approach",
                ],
            },
            {
                title: "Content Strategist",
                type: "Full-time",
                location: "Remote / On-site",
                description:
                    "Develop and implement content strategies that align with business goals and resonate with target audiences.",
                requirements: [
                    "3+ years of content strategy experience",
                    "Excellent writing and editing skills",
                    "Experience with content management systems",
                    "Understanding of SEO principles",
                ],
            },
        ],
        data: [
            {
                title: "Data Analyst",
                type: "Full-time",
                location: "On-site",
                description: "Analyze data to extract insights that drive business decisions and optimize digital products.",
                requirements: [
                    "3+ years of data analysis experience",
                    "Proficiency in SQL and data visualization tools",
                    "Experience with statistical analysis",
                    "Strong problem-solving skills",
                ],
            },
            {
                title: "Machine Learning Engineer",
                type: "Full-time",
                location: "On-site",
                description: "Develop and implement machine learning models to enhance our products and services.",
                requirements: [
                    "3+ years of ML experience",
                    "Proficiency in Python and ML frameworks",
                    "Experience with data processing at scale",
                    "Understanding of ML deployment",
                ],
            },
        ],
    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".roles-title", {
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

            // Animate category tabs
            gsap.from(".category-tab", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".categories-container",
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
                        Open Positions
                    </div>
                    <h2 className="roles-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Explore Career Opportunities
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Discover exciting roles across various departments where you can apply your skills, grow professionally, and
                        make an impact.
                    </p>
                </div>

                {/* Category tabs */}
                <div className="categories-container mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                className={`category-tab px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${activeCategory === category.id
                                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                                    : "bg-blue-900/20 text-white/70 hover:bg-blue-900/30 hover:text-white"
                                    }`}
                                onClick={() => setActiveCategory(category.id)}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Roles list */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {roles[activeCategory].map((role, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-900/30 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.2)]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.1 },
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white">{role.title}</h3>
                                        <div className="px-3 py-1 bg-blue-900/40 rounded-full text-blue-300 text-xs font-medium">
                                            {role.type}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-white/60 text-sm mb-4">
                                        <Smartphone className="w-4 h-4 mr-2" />
                                        <span>{role.location}</span>
                                    </div>

                                    <p className="text-white/80 mb-4">{role.description}</p>

                                    <div className="mb-6">
                                        <h4 className="text-white/90 font-medium mb-2">Requirements:</h4>
                                        <ul className="space-y-1">
                                            {role.requirements.map((req, i) => (
                                                <li key={i} className="text-white/70 text-sm flex items-start">
                                                    <span className="text-blue-400 mr-2">•</span>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        to={`/careers/apply?role=${encodeURIComponent(role.title)}`}
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                                    >
                                        <span>Apply Now</span>
                                        <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* All positions CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/careers/apply"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                        <span>View All Positions</span>
                        <ChevronRight className="ml-1 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
