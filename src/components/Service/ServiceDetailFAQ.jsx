"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// FAQ data for each service
const serviceFAQs = {
    "game-dev": [
        {
            question: "What game engines do you work with?",
            answer:
                "We primarily work with Unity and Unreal Engine, which are industry-leading game development platforms. However, we also have experience with custom engines and other platforms depending on project requirements.",
        },
        {
            question: "How long does it typically take to develop a game?",
            answer:
                "Development timelines vary significantly based on the scope, complexity, and platform. A simple mobile game might take 3-6 months, while a more complex title could take 12-24 months or more. We provide detailed timelines during the planning phase.",
        },
        {
            question: "Do you handle game publishing and marketing?",
            answer:
                "Yes, we offer end-to-end services including publishing support and marketing strategies. We can help with app store optimization, launch campaigns, community building, and ongoing user acquisition strategies.",
        },
        {
            question: "What platforms can you develop games for?",
            answer:
                "We develop games for all major platforms including mobile (iOS and Android), PC (Steam, Epic Games Store), consoles (PlayStation, Xbox, Nintendo Switch), and VR/AR platforms (Oculus, HTC Vive, ARKit, ARCore).",
        },
        {
            question: "Do you offer game maintenance and updates after launch?",
            answer:
                "Absolutely. We provide ongoing support, maintenance, and updates to ensure your game remains engaging, bug-free, and compatible with the latest devices and platforms.",
        },
    ],
    "mobile-app": [
        {
            question: "What platforms do you develop for?",
            answer:
                "We develop native applications for both iOS and Android, as well as cross-platform solutions using technologies like React Native and Flutter.",
        },
        {
            question: "How do you ensure the security of mobile applications?",
            answer:
                "We implement robust security measures including secure data storage, encryption, secure authentication, and regular security audits.",
        },
        {
            question: "Can you integrate my app with existing systems?",
            answer:
                "Yes, we have extensive experience integrating mobile applications with various backend systems, APIs, and third-party services.",
        },
        {
            question: "What is the cost of developing a mobile app?",
            answer:
                "The cost varies depending on the complexity, features, and platform. We provide detailed cost estimates after the initial consultation and requirements analysis.",
        },
        {
            question: "Do you offer app maintenance and support?",
            answer:
                "Yes, we provide ongoing maintenance, updates, and support services to ensure your app remains functional, secure, and up-to-date.",
        },
    ],
    "software-solutions": [
        {
            question: "What types of software solutions do you offer?",
            answer:
                "We offer custom enterprise applications, cloud-native solutions, microservices architecture, legacy system modernization, and API development.",
        },
        {
            question: "How do you ensure scalability and reliability?",
            answer:
                "We design our solutions with scalability and reliability in mind, leveraging cloud technologies and best practices for system architecture.",
        },
        {
            question: "Can you integrate with my existing systems?",
            answer:
                "Yes, we have extensive experience integrating with various third-party systems and services using APIs and other integration methods.",
        },
        {
            question: "What is the development process?",
            answer:
                "Our process includes requirements analysis, architecture planning, design, development, testing, deployment, and ongoing support.",
        },
        {
            question: "Do you offer ongoing support and maintenance?",
            answer:
                "Yes, we provide comprehensive support and maintenance services to ensure your software solutions remain functional and up-to-date.",
        },
    ],
    default: [
        {
            question: "What is your approach to technology services?",
            answer:
                "We take a client-centric approach, focusing on understanding your unique needs and delivering tailored solutions that drive results.",
        },
        {
            question: "How do you ensure the quality of your services?",
            answer:
                "We adhere to industry best practices and employ rigorous testing and quality assurance processes throughout the project lifecycle.",
        },
        {
            question: "What is the typical timeline for a project?",
            answer:
                "Project timelines vary depending on the scope and complexity. We provide detailed timelines during the planning phase.",
        },
        {
            question: "Do you offer ongoing support and maintenance?",
            answer:
                "Yes, we provide comprehensive support and maintenance services to ensure the long-term success of your solutions.",
        },
    ],
}

export default function ServiceDetailFAQ({ serviceId }) {
    const faqs = serviceFAQs[serviceId] || serviceFAQs.default
    const [openIndex, setOpenIndex] = useState(null)

    const sectionRef = useRef(null)
    const headingRef = useRef(null)

    useEffect(() => {
        if (!sectionRef.current || !headingRef.current) return

        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-12 md:py-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-12">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        FAQ
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        Find answers to common questions about our services and processes.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-sm border border-blue-900/30 rounded-xl mb-4 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <h4 className="text-lg md:text-xl font-semibold text-white">{faq.question}</h4>
                                <ChevronDown
                                    className={`w-5 h-5 md:w-6 md:h-6 text-blue-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: { ease: "easeOut", duration: 0.4 },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: { ease: "easeIn", duration: 0.3 },
                                        }}
                                        className="px-6 pb-6"
                                    >
                                        <p className="text-white/70 text-sm md:text-base">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}