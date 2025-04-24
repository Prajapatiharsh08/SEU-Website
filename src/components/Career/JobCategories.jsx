import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
    Code,
    Cpu,
    Database,
    Globe,
    Lightbulb,
    LineChart,
    Smartphone,
    ArrowRight,
    Braces,
    Cloud,
    Shield,
    Layers,
} from "lucide-react"

const jobCategories = [
    {
        id: "web-dev",
        title: "Web Development",
        icon: <Globe className="h-8 w-8" />,
        roles: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "UI/UX Designer",
            "Web Accessibility Specialist",
        ],
        description: "Build and maintain cutting-edge web applications using the latest technologies and frameworks.",
        openPositions: 8,
    },
    {
        id: "mobile-dev",
        title: "Mobile Development",
        icon: <Smartphone className="h-8 w-8" />,
        roles: [
            "iOS Developer",
            "Android Developer",
            "React Native Developer",
            "Flutter Developer",
            "Mobile UI/UX Designer",
        ],
        description: "Create innovative mobile experiences that engage users and solve real-world problems.",
        openPositions: 5,
    },
    {
        id: "data-science",
        title: "Data Science",
        icon: <LineChart className="h-8 w-8" />,
        roles: [
            "Data Scientist",
            "Data Analyst",
            "Machine Learning Engineer",
            "Business Intelligence Analyst",
            "Data Engineer",
        ],
        description: "Extract insights from complex datasets and build models that drive business decisions.",
        openPositions: 6,
    },
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        icon: <Cpu className="h-8 w-8" />,
        roles: [
            "AI Research Scientist",
            "ML Engineer",
            "NLP Specialist",
            "Computer Vision Engineer",
            "AI Ethics Researcher",
        ],
        description: "Push the boundaries of artificial intelligence and create systems that learn and adapt.",
        openPositions: 7,
    },
    {
        id: "devops",
        title: "DevOps & Infrastructure",
        icon: <Database className="h-8 w-8" />,
        roles: [
            "DevOps Engineer",
            "Site Reliability Engineer",
            "Cloud Architect",
            "Infrastructure Engineer",
            "Security Engineer",
        ],
        description: "Build and maintain the infrastructure that powers our applications and ensures they run smoothly.",
        openPositions: 4,
    },
    {
        id: "product",
        title: "Product & Design",
        icon: <Lightbulb className="h-8 w-8" />,
        roles: ["Product Manager", "Product Designer", "UX Researcher", "Design Systems Engineer", "Creative Director"],
        description: "Shape the vision and direction of our products, ensuring they meet user needs and business goals.",
        openPositions: 3,
    },
    {
        id: "engineering",
        title: "Software Engineering",
        icon: <Code className="h-8 w-8" />,
        roles: [
            "Software Engineer",
            "Systems Architect",
            "Quality Assurance Engineer",
            "Technical Lead",
            "Engineering Manager",
        ],
        description: "Design, develop, and maintain software systems that power our core products and services.",
        openPositions: 9,
    },
    {
        id: "quantum-computing",
        title: "Quantum Computing",
        icon: <Braces className="h-8 w-8" />,
        roles: [
            "Quantum Algorithm Developer",
            "Quantum Hardware Engineer",
            "Quantum Research Scientist",
            "Quantum Software Engineer",
            "Quantum Systems Architect",
        ],
        description: "Develop next-generation quantum algorithms and applications that will revolutionize computing.",
        openPositions: 4,
    },
    {
        id: "cloud-solutions",
        title: "Cloud Solutions",
        icon: <Cloud className="h-8 w-8" />,
        roles: [
            "Cloud Solutions Architect",
            "Cloud Security Specialist",
            "Multi-Cloud Engineer",
            "Cloud Operations Engineer",
            "Cloud Migration Specialist",
        ],
        description: "Design and implement scalable cloud solutions that power modern digital experiences.",
        openPositions: 6,
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        icon: <Shield className="h-8 w-8" />,
        roles: [
            "Security Engineer",
            "Penetration Tester",
            "Security Analyst",
            "Security Architect",
            "Compliance Specialist",
        ],
        description: "Protect our systems and data from threats and ensure the security of our products.",
        openPositions: 5,
    },
    {
        id: "blockchain",
        title: "Blockchain",
        icon: <Layers className="h-8 w-8" />,
        roles: [
            "Blockchain Developer",
            "Smart Contract Engineer",
            "Blockchain Architect",
            "Cryptography Specialist",
            "Blockchain Researcher",
        ],
        description: "Build decentralized applications and blockchain solutions for the future of finance and beyond.",
        openPositions: 3,
    },
]

export default function JobCategories() {
    const [activeCategory, setActiveCategory] = useState(jobCategories[0].id)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCategories = jobCategories.filter(
        (category) =>
            category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.roles.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const activeJobCategory = jobCategories.find((category) => category.id === activeCategory)

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Explore Career Opportunities</h2>
                </div>

                <div className="mb-8">
                    <div className="relative max-w-md mx-auto md:mx-0">
                        <input
                            type="text"
                            placeholder="Search roles or departments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-10 rounded-lg bg-blue-950/30 border border-blue-800 focus:border-blue-500 focus:outline-none text-white"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-950/30">
                            {filteredCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${activeCategory === category.id
                                        ? "bg-gradient-to-r from-blue-900/50 to-purple-900/30 border-l-4 border-blue-500 text-white"
                                        : "hover:bg-blue-900/30 text-blue-200"
                                        }`}
                                >
                                    <div className={`${activeCategory === category.id ? "text-blue-400" : "text-blue-500/70"}`}>
                                        {category.icon}
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-medium">{category.title}</span>
                                        <div className="text-xs text-blue-400">{category.openPositions} open positions</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        {activeJobCategory && (
                            <motion.div
                                key={activeJobCategory.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/30 rounded-xl p-6 h-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-blue-900/50 rounded-lg text-blue-300">{activeJobCategory.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-blue-300">{activeJobCategory.title}</h3>
                                        <div className="text-sm text-blue-400">{activeJobCategory.openPositions} open positions</div>
                                    </div>
                                </div>

                                <p className="text-blue-100 mb-6">{activeJobCategory.description}</p>

                                <h4 className="text-lg font-semibold text-blue-300 mb-4">Available Roles:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {activeJobCategory.roles.map((role, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-900/30 transition-colors duration-300 group"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform duration-300"></div>
                                            <span className="text-blue-100">{role}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={`/careers/departments/${activeJobCategory.id}`}
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-300"
                                    >
                                        View All {activeJobCategory.title} Positions
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href={`/careers/apply?category=${activeJobCategory.id}`}
                                        className="inline-flex items-center gap-2 bg-transparent border border-blue-500/50 hover:border-blue-500 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-300"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/careers/all-jobs"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20"
                    >
                        View All Open Positions
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
