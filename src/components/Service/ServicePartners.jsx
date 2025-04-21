import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const partners = [
    {
        name: "TechCorp",
        logo: "https://mntechcorp.com/wp-content/uploads/2022/08/mntech.png",
    },
    {
        name: "InnovateTech",
        logo: "https://innovatetech.com/wp-content/uploads/2016/03/ITLogoMed.jpg",
    },
    {
        name: "FutureSystems",
        logo: "https://future.systems/wp-content/themes/futuresystems_2022/inc/img/sticker/Sticker_07.png",
    },
    {
        name: "GlobalTech",
        logo: "https://thumbs.dreamstime.com/b/digital-sphere-global-link-technology-logo-concept-design-d-three-dimensional-style-symbol-graphic-template-element-vector-137558925.jpg",
    },
    {
        name: "NextGen Solutions",
        logo: "https://www.logomyway.com/logos_new/30927/2_753144724846.jpg",
    },
    {
        name: "DigitalInnovators",
        logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/uf5btl4nqa4em02pdyiu",
    },
    {
        name: "TechLeaders",
        logo: "https://www.buzzsprout.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSWFyVmdjPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--61f90f320e32050fef37c49c62235bdd17fb0e14/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDam9MWm05eWJXRjBPZ2hxY0djNkUzSmxjMmw2WlY5MGIxOW1hV3hzV3docEFuZ0ZhUUo0QlhzR09nbGpjbTl3T2d0alpXNTBjbVU2RUdSbFptRjFiSFJmZFhKc1NTSTVhSFIwY0hNNkx5OTNkM2N1WW5WNmVuTndjbTkxZEM1amIyMHZhVzFoWjJWekwyRnlkSGR2Y210elgyeGhjbWRsTG1wd1p3WTZCa1ZVT2dwellYWmxjbnNHT2d4eGRXRnNhWFI1YVVFNkVHTnZiRzkxY25Od1lXTmxTU0lKYzNKbllnWTdDMVE9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--2a89ede784d6e184500689d6dcbd55b204c8d4ad/TTLP%20logo%20with%20bedigital%20plug%202024.jpg",
    },
    {
        name: "FutureTech",
        logo: "https://cdn.dribbble.com/userupload/32871568/file/original-a3fa16dfacec853c11a1d506e7b056ef.jpg",
    },
]

export default function ServicePartners() {
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
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden text-white">
            {/* Background blur elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                        Technology Partners
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 p-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white">
                        Our Strategic Partnerships
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                        We collaborate with industry-leading technology providers to deliver cutting-edge solutions and services.
                    </p>
                </div>

                {/* Marquee wrapper */}
                <div className="overflow-hidden whitespace-nowrap mt-10">
                    <div className="flex items-center animate-marquee gap-6">
                        {partners.slice(0, 8).map((partner, index) => (
                            <motion.div
                                key={`partner-${index}`}
                                className="partner-logo min-w-[160px] bg-gradient-to-br from-blue-800/30 to-purple-900/10 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                                whileHover={{ scale: 1.08, rotateZ: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <div className="relative w-full flex justify-center items-center mb-3">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-16 max-w-[100px] object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-xl"
                                    />
                                </div>
                                <span className="text-white text-sm text-center font-semibold tracking-wide opacity-90">
                                    {partner.name}
                                </span>
                            </motion.div>
                        ))}

                        {/* Duplicate logos for smooth loop */}
                        {partners.slice(0, 8).map((partner, index) => (
                            <motion.div
                                key={`partner-${index}`}
                                className="partner-logo min-w-[160px] bg-gradient-to-br from-blue-800/30 to-purple-900/10 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                                whileHover={{ scale: 1.08, rotateZ: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <div className="relative w-full flex justify-center items-center mb-3">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-16 max-w-[100px] object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-xl"
                                    />
                                </div>
                                <span className="text-white text-sm text-center font-semibold tracking-wide opacity-90">
                                    {partner.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tailwind custom keyframe */}
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </section>
    )
}
