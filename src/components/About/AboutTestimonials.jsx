import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ArrowLeft, ArrowRight } from "lucide-react"

export default function AboutTestimonials() {
    const sectionRef = useRef(null)
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    // Testimonials data
    const testimonials = [
        {
            quote:
                "SEU transformed our digital presence completely. Their team's attention to detail and innovative approach resulted in a website that not only looks stunning but also performs exceptionally well.",
            author: "Jennifer Martinez",
            position: "CEO, TechVision Inc.",
            image: "/Images/testimonial1.jpg",
            company: "TechVision Inc.",
        },
        {
            quote:
                "Working with SEU was a game-changer for our brand. They understood our vision perfectly and delivered a digital experience that exceeded our expectations in every way.",
            author: "Robert Chen",
            position: "Marketing Director",
            image: "/Images/testimonial2.jpg",
            company: "Innovate Solutions",
        },
        {
            quote:
                "The team at SEU doesn't just create websites; they craft digital experiences that truly connect with users. Their strategic approach and technical expertise are unmatched in the industry.",
            author: "Kunal Sharma",
            position: "Product Manager",
            image:
                "/Images/testimonial3.jpg",
            company: "Global Reach",
        },
    ]

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [testimonials.length])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".testimonials-title", {
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

            // Animate testimonials container
            gsap.from(".testimonials-container", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonials-container",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"></div>

            {/* Content */}
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Client Testimonials
                    </div>
                    <h2 className="testimonials-title text-4xl md:text-5xl p-2 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        What Our Clients Say
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from the clients who have experienced the SEU difference firsthand.
                    </p>
                </div>

                {/* Testimonials showcase */}
                <div className="testimonials-container relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTestimonial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8 md:p-12"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-8 left-8 text-blue-500/30">
                                <Quote className="w-16 h-16" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {/* Author image */}
                                <div className="md:w-1/4 flex-shrink-0">
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-900/50 shadow-[0_0_20px_rgba(66,99,235,0.3)]">
                                        <img
                                            src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                                            alt={testimonials[activeTestimonial].author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Testimonial content */}
                                <div className="md:w-3/4">
                                    <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6 relative z-10">
                                        "{testimonials[activeTestimonial].quote}"
                                    </blockquote>

                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-white font-bold">{testimonials[activeTestimonial].author}</div>
                                            <div className="text-blue-400">{testimonials[activeTestimonial].position}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company logo/name */}
                            <div className="absolute bottom-8 right-8">
                                <div className="px-4 py-2 bg-blue-900/40 rounded-lg border border-blue-900/60 text-white/80">
                                    {testimonials[activeTestimonial].company}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation controls */}
                    <div className="flex justify-center mt-8 gap-4">
                        <button
                            onClick={() =>
                                setActiveTestimonial(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)
                            }
                            className="p-3 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? "bg-blue-500 w-6" : "bg-blue-900/50 hover:bg-blue-700/50"
                                        }`}
                                    onClick={() => setActiveTestimonial(index)}
                                    aria-label={`View testimonial from ${testimonials[index].author}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                            className="p-3 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
