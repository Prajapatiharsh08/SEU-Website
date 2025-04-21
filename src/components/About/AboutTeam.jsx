import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Linkedin, Twitter, Mail, ArrowRight, ArrowLeft } from "lucide-react"
import women from '../../../public/Images/Team/women1.png'
import men from '../../../public/Images/Team/men2.png'

export default function AboutTeam() {
    const sectionRef = useRef(null)
    const [activeTeamMember, setActiveTeamMember] = useState(0)

    // Team members data
    const teamMembers = [
        {
            name: "Suveesh Panickar",
            role: "Founder & CEO",
            bio: "As the visionary behind SEU, Suveesh Panickar brings a wealth of experience in leadership, innovation, and business strategy. With a passion for pushing the boundaries of technology, Suveesh guides our company towards achieving new heights of success.",
            image: men, 
            skills: ["Business Strategy", "Leadership", "Innovation", "Strategic Partnerships"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "suveesh@seucompany.com",
            },
        },
        {
            name: "Vijayasree Panickar",
            role: "Co-Founder & Chief Operating Officer",
            bio: "With a keen eye for operational excellence, Vijayasree Panickar leads SEU’s daily operations and ensures the seamless execution of every project. Her commitment to quality and efficiency drives our team’s success in delivering outstanding results.",
            image: women, 
            skills: ["Operations Management", "Project Execution", "Team Leadership", "Quality Assurance"],
            social: {
                linkedin: "#",
                twitter: "#",
                email: "vijayasree@seucompany.com",
            },
        }
    ]

    // Auto-rotate team members
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTeamMember((prev) => (prev + 1) % teamMembers.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [teamMembers.length])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from(".team-title", {
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

            // Animate team showcase
            gsap.from(".team-showcase", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".team-showcase",
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
                        Our Team
                    </div>
                    <h2 className="team-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Meet the Experts Behind SEU
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Our talented team brings together diverse expertise and perspectives, united by a shared passion for
                        creating exceptional digital experiences.
                    </p>
                </div>

                {/* Team showcase */}
                <div className="team-showcase relative max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTeamMember}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Team member image */}
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(66,99,235,0.2)] aspect-[4/5]">
                                    <img
                                        src={teamMembers[activeTeamMember].image || "/placeholder.svg"}
                                        alt={teamMembers[activeTeamMember].name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

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

                                {/* Name and role overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <h3 className="text-2xl font-bold text-white">{teamMembers[activeTeamMember].name}</h3>
                                        <p className="text-blue-400">{teamMembers[activeTeamMember].role}</p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Team member details */}
                            <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-white">{teamMembers[activeTeamMember].name}</h3>
                                    <p className="text-blue-400 mb-6">{teamMembers[activeTeamMember].role}</p>

                                    <p className="text-white/80 mb-6 leading-relaxed">{teamMembers[activeTeamMember].bio}</p>

                                    <h4 className="text-lg font-medium mb-3 text-white/90">Expertise</h4>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {teamMembers[activeTeamMember].skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-900/30 rounded-full text-white/80 text-sm border border-blue-900/50"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <a
                                                href={teamMembers[activeTeamMember].social.linkedin}
                                                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-white/80 hover:bg-blue-800/50 hover:text-white transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={teamMembers[activeTeamMember].social.twitter}
                                                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-white/80 hover:bg-blue-800/50 hover:text-white transition-colors"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={`mailto:${teamMembers[activeTeamMember].social.email}`}
                                                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-white/80 hover:bg-blue-800/50 hover:text-white transition-colors"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    setActiveTeamMember(activeTeamMember === 0 ? teamMembers.length - 1 : activeTeamMember - 1)
                                                }
                                                className="p-2 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setActiveTeamMember((activeTeamMember + 1) % teamMembers.length)}
                                                className="p-2 rounded-full bg-blue-900/30 text-white/70 hover:bg-blue-900/50 hover:text-white transition-colors"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Team member indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        {teamMembers.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTeamMember === index ? "bg-blue-500 w-6" : "bg-blue-900/50 hover:bg-blue-700/50"
                                    }`}
                                onClick={() => setActiveTeamMember(index)}
                                aria-label={`View ${teamMembers[index].name}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Team CTA */}
                {/* <div className="text-center mt-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-medium text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,99,235,0.5)]"
                    >
                        Join Our Team
                    </motion.button>
                    <p className="text-white/60 mt-4">Interested in working with us? Check out our open positions.</p>
                </div> */}
            </div>
        </section>
    )
}
