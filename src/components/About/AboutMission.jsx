import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function AboutMission() {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const imageRef = useRef(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate text content
            gsap.from(textRef.current, {
                x: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            // Animate image
            gsap.from(imageRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            // Animate stats
            const stats = document.querySelectorAll(".stat-item")
            gsap.from(stats, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: stats[0],
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
                onComplete: () => {
                    // Animate stat numbers counting up
                    document.querySelectorAll(".stat-number").forEach((stat) => {
                        const target = stat.getAttribute("data-target")
                        if (target) {
                            const targetNum = Number.parseInt(target.replace(/\D/g, ""))
                            gsap.fromTo(
                                stat,
                                { innerText: "0" },
                                {
                                    innerText: targetNum,
                                    duration: 2,
                                    ease: "power2.out",
                                    snap: { innerText: 1 },
                                    onComplete: () => {
                                        stat.innerHTML = target // Set final text with "+" if needed
                                    },
                                },
                            )
                        }
                    })
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="mission" ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Floating elements */}
            <motion.div
                style={{ y, opacity }}
                className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"
            ></motion.div>
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-xl"
            ></motion.div>

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left column - Text content */}
                    <div ref={textRef} className="relative">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                            Our Mission
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Transforming Ideas Into Digital Reality
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>

                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                            Founded in 2020, SEU began with a vision to transform how brands connect with their audiences in the
                            digital realm. What started as a small team of passionate designers and developers has evolved into a
                            full-service digital agency with a global clientele.
                        </p>

                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                            Our mission is to create digital solutions that not only meet but exceed client expectations. We believe
                            in pushing boundaries, challenging conventions, and delivering results that drive real business growth.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            {["Innovation", "Excellence", "Integrity", "Collaboration"].map((value, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 bg-blue-900/20 rounded-full text-white/80 text-sm border border-blue-900/50"
                                >
                                    {value}
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-medium flex items-center gap-2 group"
                        >
                            <span>Learn More About Our Values</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </motion.button>
                    </div>

                    {/* Right column - Image and stats */}
                    <div ref={imageRef} className="relative">
                        {/* Image with overlay */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(66,99,235,0.2)]">
                            <img
                                src="/Images/aboutMission.jpg"
                                alt="SEU Team Meeting"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-16 h-16">
                                <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                <div className="absolute top-0 left-0 h-[1px] w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
                            </div>
                            <div className="absolute top-0 right-0 w-16 h-16">
                                <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                                <div className="absolute top-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-500 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-16 h-16">
                                <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 h-[1px] w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-16 h-16">
                                <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                                <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-gradient-to-l from-blue-500 to-transparent"></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="stat-item bg-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-transform hover:scale-105 duration-300">
                                <div className="text-3xl font-bold text-white mb-2 stat-number" data-target="200+">
                                    0
                                </div>
                                <div className="text-white/60">Projects Completed</div>
                            </div>
                            <div className="stat-item bg-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-transform hover:scale-105 duration-300">
                                <div className="text-3xl font-bold text-white mb-2 stat-number" data-target="150+">
                                    0
                                </div>
                                <div className="text-white/60">Happy Clients</div>
                            </div>
                            <div className="stat-item bg-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-transform hover:scale-105 duration-300">
                                <div className="text-3xl font-bold text-white mb-2 stat-number" data-target="50+">
                                    0
                                </div>
                                <div className="text-white/60">Team Members</div>
                            </div>
                            <div className="stat-item bg-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-transform hover:scale-105 duration-300">
                                <div className="text-3xl font-bold text-white mb-2 stat-number" data-target="5+">
                                    0
                                </div>
                                <div className="text-white/60">Years of Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
