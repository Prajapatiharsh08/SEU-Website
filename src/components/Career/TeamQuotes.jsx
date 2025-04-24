import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const teamQuotes = [
    {
        quote:
            "Working at Quantum Nexus has been a transformative experience. The culture of innovation and collaboration has helped me grow both professionally and personally.",
        name: "Priya Sharma",
        role: "Senior Frontend Developer",
        image: "/placeholder.svg?height=100&width=100",
        years: "3 years at Quantum Nexus",
    },
    {
        quote:
            "What I love most about Quantum Nexus is the opportunity to work on cutting-edge technologies that are making a real impact. Every day brings new challenges and learning opportunities.",
        name: "Alex Johnson",
        role: "AI Research Scientist", 
        image: "/placeholder.svg?height=100&width=100",
        years: "2 years at Quantum Nexus",
    },
    {
        quote:
            "The supportive environment at Quantum Nexus allows me to take risks and push boundaries. It's a place where innovation is not just encouraged but expected.",
        name: "Mohammed Al-Farsi",
        role: "Product Manager",
        image: "/placeholder.svg?height=100&width=100",
        years: "4 years at Quantum Nexus",
    },
    {
        quote:
            "I joined Quantum Nexus as a fresh graduate, and the mentorship I've received has been incredible. The company truly invests in developing talent and helping people reach their potential.",
        name: "Sophia Chen",
        role: "Data Scientist",
        image: "/placeholder.svg?height=100&width=100",
        years: "1 year at Quantum Nexus",
    },
    {
        quote:
            "The work-life balance at Quantum Nexus is exceptional. I'm able to do my best work while still having time for my family and personal interests. It's truly a people-first company.",
        name: "David Rodriguez",
        role: "DevOps Engineer",
        image: "/placeholder.svg?height=100&width=100",
        years: "3 years at Quantum Nexus",
    },
    {
        quote:
            "Quantum Nexus has given me the opportunity to work with some of the brightest minds in the industry. The collaborative culture and focus on innovation make it an exciting place to work every day.",
        name: "Aisha Patel",
        role: "Quantum Computing Researcher",
        image: "/placeholder.svg?height=100&width=100",
        years: "2 years at Quantum Nexus",
    },
]

export default function TeamQuotes() {
    const [current, setCurrent] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const next = () => {
        setCurrent((current + 1) % teamQuotes.length)
        setAutoplay(false)
    }

    const prev = () => {
        setCurrent((current - 1 + teamQuotes.length) % teamQuotes.length)
        setAutoplay(false)
    }

    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(() => {
            setCurrent((current + 1) % teamQuotes.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [current, autoplay])

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-16">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Hear From Our Team</h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={prev}
                            className="bg-blue-900/50 hover:bg-blue-800 rounded-full p-2 text-white transition-colors duration-300 shadow-lg shadow-blue-900/20"
                            aria-label="Previous quote"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={next}
                            className="bg-blue-900/50 hover:bg-blue-800 rounded-full p-2 text-white transition-colors duration-300 shadow-lg shadow-blue-900/20"
                            aria-label="Next quote"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="overflow-hidden relative min-h-[350px] flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-center px-8"
                            >
                                <div className="relative inline-block mb-8">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
                                    <Quote className="h-12 w-12 text-blue-100 relative bg-black rounded-full p-2" />
                                </div>

                                <p className="text-xl text-blue-100 italic mb-8">"{teamQuotes[current].quote}"</p>

                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 mb-4 relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        <img
                                            src={teamQuotes[current].image || "/placeholder.svg"}
                                            alt={teamQuotes[current].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg text-white">{teamQuotes[current].name}</h3>
                                    <p className="text-blue-300">{teamQuotes[current].role}</p>
                                    <p className="text-sm text-blue-400 mt-1">{teamQuotes[current].years}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {teamQuotes.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrent(index)
                                    setAutoplay(false)
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6" : "bg-blue-500/30"
                                    }`}
                                aria-label={`Go to quote ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
