import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function AboutTimeline() {
    const sectionRef = useRef(null)
    const timelineRef = useRef(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    // Timeline events
    const timelineEvents = [
        {
            year: "2024",
            title: "SEU Founded",
            description:
                "SEU was established with a vision to transform digital experiences through innovative design and technology.",
        },
        {
            year: "2024 Q2",
            title: "First Major Client",
            description:
                "Secured our first enterprise client and delivered a project that exceeded expectations, setting the foundation for our reputation.",
        },
        {
            year: "2024 Q3",
            title: "Team Expansion",
            description:
                "Grew our team to 10 talented professionals and moved to a larger office space to accommodate our growth.",
        },
        {
            year: "2024 Q4",
            title: "International Recognition",
            description: "Received multiple industry awards for our innovative approach to digital design and development.",
        },
        {
            year: "2025",
            title: "Global Expansion",
            description:
                "Opening our first international office and expanding our client base to include companies from across the globe.",
        },
        {
            year: "2025+",
            title: "The Future",
            description:
                "Continuing to push boundaries and set new standards in digital excellence as we look toward the future.",
        },
    ]

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".timeline-title", {
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

            // Animate timeline line
            gsap.from(".timeline-line", {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
            })

            // Animate timeline events
            gsap.from(".timeline-event", {
                x: (index) => (index % 2 === 0 ? -50 : 50),
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"></div>

            {/* Floating elements */}
            <motion.div
                style={{ y }}
                className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"
            ></motion.div>
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-xl"
            ></motion.div>

            {/* Content */}
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Our Journey
                    </div>
                    <h2 className="timeline-title text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        The SEU Story
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        From our humble beginnings to our current success, explore the key milestones that have shaped our journey.
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative max-w-5xl mx-auto">
                    {/* Timeline line */}
                    <div className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-600 transform md:-translate-x-1/2"></div>

                    {/* Timeline events */}
                    <div className="relative">
                        {timelineEvents.map((event, index) => (
                            <div
                                key={index}
                                className={`timeline-event relative mb-16 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                {/* Event content */}
                                <div className={`md:w-5/12 w-full ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} text-left`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-900/30 p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.2)]"
                                    >
                                        <div className="text-blue-400 text-sm font-medium mb-2">{event.year}</div>
                                        <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                                        <p className="text-white/80">{event.description}</p>
                                    </motion.div>
                                </div>

                                {/* Center dot */}
                                <div className="absolute md:left-1/2 left-6 md:top-6 top-0 transform md:-translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.5, type: "spring" }}
                                        viewport={{ once: true }}
                                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 border-2 border-white flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </motion.div>
                                </div>

                                {/* Spacer for layout on desktop */}
                                <div className="md:w-5/12 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
