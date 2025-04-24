import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Users, Rocket, Heart, Globe, Shield, Zap, Sparkles } from "lucide-react"

const values = [
    {
        icon: <Lightbulb className="h-8 w-8" />,
        title: "Innovation",
        description: "We push boundaries and challenge the status quo to create breakthrough solutions.",
        color: "from-blue-500 to-indigo-500",
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: "Collaboration",
        description: "We believe in the power of diverse teams working together toward common goals.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: <Rocket className="h-8 w-8" />,
        title: "Excellence",
        description: "We strive for excellence in everything we do, setting high standards for our work.",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: <Heart className="h-8 w-8" />,
        title: "Empathy",
        description: "We put people first, understanding and valuing different perspectives and needs.",
        color: "from-green-500 to-teal-500",
    },
    {
        icon: <Globe className="h-8 w-8" />,
        title: "Impact",
        description: "We focus on creating meaningful impact that transforms industries and improves lives.",
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: <Shield className="h-8 w-8" />,
        title: "Integrity",
        description: "We act with honesty, transparency, and ethical responsibility in all our decisions.",
        color: "from-violet-500 to-purple-500",
    },
    {
        icon: <Zap className="h-8 w-8" />,
        title: "Agility",
        description: "We embrace change, adapt quickly, and continuously evolve our approach.",
        color: "from-amber-500 to-yellow-500",
    },
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "Creativity",
        description: "We encourage creative thinking and novel approaches to solving complex problems.",
        color: "from-pink-500 to-rose-500",
    },
]

export default function CompanyCulture() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Our Culture & Values</h2>
                </div>

                <p className="text-center text-blue-200 max-w-2xl mx-auto mb-16">
                    At Quantum Nexus, our culture is built on a foundation of core values that guide everything we do. These
                    principles shape our work environment and drive our success.
                </p>

                <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color}`}></div>
                            <div className="mb-4">
                                <div
                                    className={`p-3 inline-flex rounded-lg bg-gradient-to-br ${value.color} text-white transform group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {value.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-blue-100">{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30 rounded-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">Life at Quantum Nexus</h3>
                            <p className="text-blue-100 mb-4">
                                Our culture is built on collaboration, innovation, and a shared passion for solving complex problems. We
                                believe in creating an environment where everyone can thrive, contribute, and grow.
                            </p>
                            <p className="text-blue-100 mb-4">
                                From team-building events and hackathons to community service and continuous learning opportunities,
                                life at Quantum Nexus is about more than just work—it's about being part of a community that values your
                                unique contributions and supports your growth.
                            </p>
                            <p className="text-blue-100">
                                We celebrate diversity of thought, background, and experience, knowing that our differences make us
                                stronger and more innovative as a team.
                            </p>
                        </div>
                        <div className="relative h-64 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black/60"></div>
                            <img
                                src="/placeholder.svg?height=400&width=600"
                                alt="Team at Quantum Nexus"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                                    </svg>
                                    Watch Team Video
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
