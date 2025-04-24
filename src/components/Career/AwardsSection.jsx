import { motion } from "framer-motion"
import { Award, Star } from "lucide-react"

const awards = [
    {
        title: "Best Place to Work",
        organization: "Tech Excellence Awards",
        year: "2023",
        description: "Recognized for exceptional workplace culture and employee satisfaction.",
        icon: <Award className="h-8 w-8" />,
    },
    {
        title: "Most Innovative Company",
        organization: "Global Innovation Summit",
        year: "2023",
        description: "Awarded for groundbreaking advancements in quantum computing technology.",
        icon: <Star className="h-8 w-8" />,
    },
    {
        title: "Top Tech Employer",
        organization: "Industry Leaders Association",
        year: "2022",
        description: "Named one of the top employers in the technology sector.",
        icon: <Award className="h-8 w-8" />,
    },
    {
        title: "Diversity & Inclusion Champion",
        organization: "Workplace Equity Foundation",
        year: "2022",
        description: "Recognized for commitment to creating an inclusive and diverse workplace.",
        icon: <Star className="h-8 w-8" />,
    },
]

export default function AwardsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Awards & Recognition</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-900/50 rounded-lg text-blue-300 group-hover:scale-110 transition-transform duration-300">
                                    {award.icon}
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-medium text-blue-400">{award.year}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-blue-300 mb-1">{award.title}</h3>
                            <p className="text-sm text-blue-400 mb-3">{award.organization}</p>
                            <p className="text-blue-100 text-sm">{award.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/about/awards"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                        View all awards and recognition
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            /> 
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
