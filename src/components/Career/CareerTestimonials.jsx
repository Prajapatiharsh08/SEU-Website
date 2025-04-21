"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

export default function CareerTestimonials() {
    const sectionRef = useRef(null)
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    // Testimonials data
    const testimonials = [
        {
            quote:
                "Joining SEU was the best career decision I've made. The collaborative culture, cutting-edge projects, and growth opportunities have helped me develop both professionally and personally.",
            name: "Sarah Johnson",
            role: "Senior Frontend Developer",
            image:
                "https://img.freepik.com/free-photo/young-beautiful-woman-sitting-table-cafe-using-laptop-working_1303-29690.jpg?w=740",
            years: "3 years at SEU",
        },
        {
            quote:
                "What sets SEU apart is how they invest in their employees. The learning opportunities, mentorship programs, and innovation time have allowed me to stay at the forefront of design trends and technologies.",
            name: "Michael Chen",
            role: "UI/UX Designer",
            image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740",
            years: "2 years at SEU",
        },
        {
            quote:
                "The work-life balance at SEU is exceptional. Flexible hours and remote work options have allowed me to be productive while still having time for my family and personal interests.",
            name: "Aisha Patel",
            role: "Project Manager",
            image:
                "https://img.freepik.com/free-photo/young-beautiful-woman-smart-casual-wear-glasses-holding-laptop-while-sitting-desk-office_574295-5764.jpg?w=740",
            years: "4 years at SEU",
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
                y: 50,
                opacity: 0,
                duration: 1,
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
        <section ref={sectionRef} className="py-20 relative">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Team Voices
                    </div>
                    <h2 className="testimonials-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Hear From Our Team
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Discover what it's like to work at SEU from the people who know best - our team members.
                    </p>
                </div>

                {/* Testimonials showcase */}
                <div className="testimonials-container max-w-5xl mx-auto">
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
                                            alt={testimonials[activeTestimonial].name}
                                            fill
                                            className="object-cover"
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
                                            <div className="text-white font-bold">{testimonials[activeTestimonial].name}</div>
                                            <div className="text-blue-400">{testimonials[activeTestimonial].role}</div>
                                            <div className="text-white/60 text-sm mt-1">{testimonials[activeTestimonial].years}</div>
                                        </div>
                                    </div>
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
                                    aria-label={`View testimonial from ${testimonials[index].name}`}
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
