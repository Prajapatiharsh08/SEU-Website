import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import testimonial1 from '../../../public/Images/testimonial1.jpg'
import testimonial2 from '../../../public/Images/testimonial2.jpg'
import testimonial3 from '../../../public/Images/testimonial3.jpg'
import testimonial4 from '../../../public/Images/testimonial4.jpg'
import men from '../../../public/Images/Team/men2.png'

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        position: "CTO, TechVision Inc.",
        company: "TechVision Inc.",
        image: testimonial1,
        quote:
            "SEU Company's game development services exceeded our expectations. Their team delivered a high-quality product that has significantly increased our user engagement and revenue.",
        service: "Game Development",
    },
    {
        id: 2,
        name: "Michael Chen",
        position: "Director of Innovation",
        company: "Global Solutions Ltd.",
        image: testimonial2,
        quote:
            "The AR solution developed by SEU Company has transformed our customer experience. Their expertise and innovative approach have given us a competitive edge in our industry.",
        service: "Augmented Reality",
    },
    {
        id: 3,
        name: "Kunal Sharma",
        position: "Product Manager",
        company: "Enterprise Systems",
        image: testimonial3,
        quote:
            "Implementing SAP solutions with SEU Company was seamless. Their team's deep knowledge and professional approach ensured a smooth transition and significant operational improvements.",
        service: "SAP Solutions",
    },
    {
        id: 4,
        name: "David Kim",
        position: "Marketing Director",
        company: "Innovative Brands",
        image: testimonial4,
        quote:
            "SEU Company's marketing services have dramatically improved our digital presence and lead generation. Their data-driven approach and creative strategies have delivered exceptional ROI.",
        service: "Marketing",
    },
]

export default function ServiceTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const testimonialRef = useRef(null)

    // Handle navigation
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }

    // Auto-advance testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    // GSAP animations
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!sectionRef.current || !headingRef.current || !testimonialRef.current) return

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

            // Animate testimonial
            gsap.from(testimonialRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: testimonialRef.current,
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
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Client Success Stories
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        What Our Clients Say
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Discover how our services have helped businesses achieve their goals and transform their operations.
                    </p>
                </div>

                {/* Testimonials carousel */}
                <div ref={testimonialRef} className="max-w-5xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={testimonials[currentIndex].id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm rounded-2xl border border-blue-900/30 overflow-hidden p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {/* Client image */}
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-500/30 flex-shrink-0">
                                    <img
                                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                                        alt={testimonials[currentIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Testimonial content */}
                                <div className="flex-1">
                                    <div className="mb-6 text-blue-400">
                                        <Quote className="w-12 h-12 opacity-50" />
                                    </div>
                                    <p className="text-xl md:text-2xl text-white/90 italic mb-6 leading-relaxed">
                                        "{testimonials[currentIndex].quote}"
                                    </p>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                                            <p className="text-white/70">
                                                {testimonials[currentIndex].position}
                                            </p>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <span className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm">
                                                {testimonials[currentIndex].service}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
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

                    {/* Pagination dots */}
                    <div className="flex justify-center mt-6 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-500 w-6" : "bg-blue-900/50 hover:bg-blue-800"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
