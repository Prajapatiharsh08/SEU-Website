import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Briefcase, GraduationCap, Plane, DollarSign, Coffee, Smile, Zap } from "lucide-react"

const benefitCategories = [
    {
        id: "health",
        title: "Health & Wellness",
        icon: <Heart className="h-6 w-6" />,
        color: "from-pink-500 to-red-500",
        benefits: [
            "Comprehensive health, dental, and vision insurance",
            "Mental health support and resources",
            "Gym membership or wellness stipend",
            "Meditation and mindfulness programs",
            "Ergonomic workstations",
        ],
    },
    {
        id: "work-life",
        title: "Work-Life Balance",
        icon: <Briefcase className="h-6 w-6" />,
        color: "from-blue-500 to-indigo-500",
        benefits: [
            "Flexible working hours",
            "Remote work options",
            "Unlimited PTO policy",
            "Paid parental leave",
            "Sabbatical program for long-term employees",
        ],
    },
    {
        id: "learning",
        title: "Learning & Development",
        icon: <GraduationCap className="h-6 w-6" />,
        color: "from-green-500 to-emerald-500",
        benefits: [
            "Professional development budget",
            "Conference attendance opportunities",
            "Internal mentorship programs",
            "Online learning platform subscriptions",
            "Technical certification reimbursement",
        ],
    },
    {
        id: "perks",
        title: "Perks & Benefits",
        icon: <Zap className="h-6 w-6" />,
        color: "from-yellow-500 to-amber-500",
        benefits: [
            "Competitive salary and equity packages",
            "401(k) matching program",
            "Catered lunches and snacks",
            "Company retreats and team-building events",
            "Employee referral bonuses",
        ],
    },
    {
        id: "travel",
        title: "Travel & Relocation",
        icon: <Plane className="h-6 w-6" />,
        color: "from-purple-500 to-violet-500",
        benefits: [
            "Relocation assistance",
            "International office exchange program",
            "Travel stipend for remote employees",
            "Visa and immigration support",
            "Housing assistance for relocating employees",
        ],
    },
    {
        id: "financial",
        title: "Financial Benefits",
        icon: <DollarSign className="h-6 w-6" />,
        color: "from-cyan-500 to-blue-500",
        benefits: [
            "Competitive base salary",
            "Performance-based bonuses",
            "Stock options and equity grants",
            "Retirement savings plans",
            "Financial planning resources",
        ],
    },
    {
        id: "office",
        title: "Office Experience",
        icon: <Coffee className="h-6 w-6" />,
        color: "from-orange-500 to-red-500",
        benefits: [
            "Modern, collaborative workspaces",
            "Game rooms and relaxation areas",
            "Free snacks and beverages",
            "Pet-friendly offices",
            "On-site fitness facilities",
        ],
    },
    {
        id: "community",
        title: "Community & Impact",
        icon: <Smile className="h-6 w-6" />,
        color: "from-teal-500 to-green-500",
        benefits: [
            "Volunteer time off",
            "Charitable donation matching",
            "Community service opportunities",
            "Sustainability initiatives",
            "Diversity and inclusion programs",
        ],
    },
]

export default function BenefitsShowcase() {
    const [activeCategory, setActiveCategory] = useState(benefitCategories[0].id)

    const activeBenefitCategory = benefitCategories.find((category) => category.id === activeCategory)

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Benefits & Perks</h2>
                </div>

                <p className="text-center text-blue-200 max-w-2xl mx-auto mb-12">
                    At Quantum Nexus, we believe in taking care of our team members with comprehensive benefits and perks that
                    support your well-being, growth, and work-life balance.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {benefitCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${activeCategory === category.id
                                    ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
                                    : "hover:bg-blue-900/30"
                                }`}
                        >
                            {activeCategory === category.id && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}></div>
                            )}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div
                                    className={`p-3 rounded-full mb-3 ${activeCategory === category.id
                                            ? `bg-gradient-to-br ${category.color} text-white`
                                            : "bg-blue-900/50 text-blue-400"
                                        }`}
                                >
                                    {category.icon}
                                </div>
                                <h3
                                    className={`text-sm font-medium ${activeCategory === category.id ? "text-white" : "text-blue-300"}`}
                                >
                                    {category.title}
                                </h3>
                            </div>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeBenefitCategory && (
                        <motion.div
                            key={activeBenefitCategory.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-xl p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-full bg-gradient-to-br ${activeBenefitCategory.color} text-white`}>
                                    {activeBenefitCategory.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{activeBenefitCategory.title}</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {activeBenefitCategory.benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-1 text-blue-400">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5 13L9 17L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-blue-100">{benefit}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
