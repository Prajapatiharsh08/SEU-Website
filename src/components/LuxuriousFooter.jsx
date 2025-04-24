import React from "react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    Send,
    ChevronRight,
    Twitter,
    Instagram,
    Linkedin,
    Facebook,
    Youtube,
    ArrowUp,
} from "lucide-react"

export default function LuxuriousFooter() {
    const footerRef = useRef(null)
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [activeLink, setActiveLink] = useState(null)

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, 0])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

    // Handle form submission
    const handleSubmit = (et) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setEmail("")

            // Reset after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000)
        }, 1500)
    }

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer
            ref={footerRef}
            className="relative pt-24 pb-8 overflow-hidden"
            style={{
                background: "linear-gradient(to bottom, #0f172a, #1e293b)",
            }}
        >
            {/* Decorative elements
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl"></div>
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div> */}

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div className="relative z-10 container mx-auto px-4" style={{ y, opacity }}>
                {/* Top section with logo and company name */}
                <div className="flex flex-col items-center justify-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="relative mb-6 flex items-center justify-center">
                            {/* Logo container */}
                            <div className="relative rounded-full">
                                <img
                                    src="/logo-transparent-svg.svg"
                                    alt="SEU Logo"
                                    className="h-32 sm:h-40 md:h-48 w-auto" // Increased height across breakpoints
                                />
                            </div>
                        </div>


                        {/* <h2 className="text-5xl font-bold text-center mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                Sudarsana Entrepreneurs Units
                            </span>
                        </h2> */}

                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="h-px w-12 bg-blue-500/50"></div>
                            <span className="text-blue-400 text-sm uppercase tracking-widest">Est. 2024</span>
                            <div className="h-px w-12 bg-blue-500/50"></div>
                        </div>

                        <p className="text-blue-200/70 text-center max-w-2xl mx-auto">
                            Transforming visions into digital reality with innovative technology solutions that drive business growth
                            and digital transformation.
                        </p>
                    </motion.div>
                </div>

                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                            About Us
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        </h3>

                        <p className="text-blue-200/70 mb-6">
                            SEU is a forward-thinking technology company specializing in innovative digital solutions for businesses
                            across various industries. Our mission is to empower organizations through cutting-edge technology.
                        </p>

                        <Link
                            to="/about"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                            onMouseEnter={() => setActiveLink("about")}
                            onMouseLeave={() => setActiveLink(null)}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span>Learn more about us</span>
                            <motion.span
                                animate={activeLink === "about" ? { x: 5 } : { x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Column 2: Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                            Our Services
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        </h3>

                        <ul className="space-y-3">
                            {[
                                { name: "Game Development", href: "/services/game-dev" },
                                { name: "Mobile Applications", href: "/services/mobile-app" },
                                { name: "Software Solutions", href: "/services/software-solutions" },
                                { name: "AR Reality", href: "/services/ar-solutions" },
                                { name: "VR Reality", href: "/services/vr-solutions" },
                                { name: "SAP Solutions", href: "/services/sap-solutions" },
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to={service.href}
                                        className="text-blue-200/70 hover:text-white flex items-center group transition-colors"
                                        onMouseEnter={() => setActiveLink(`service-${index}`)}
                                        onMouseLeave={() => setActiveLink(null)}
                                        onClick={() => {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        <ChevronRight className="mr-2 h-4 w-4 text-blue-500" />
                                        <span>{service.name}</span>
                                        <motion.span
                                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={activeLink === `service-${index}` ? { x: 5, opacity: 1 } : { x: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowUpRight className="h-3 w-3" />
                                        </motion.span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/services"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4 group"
                            onClick={() => {
                                setActiveLink("all-services");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            onMouseEnter={() => setActiveLink("all-services")}
                            onMouseLeave={() => setActiveLink(null)}
                        >
                            <span>View all services</span>
                            <motion.span
                                animate={activeLink === "all-services" ? { x: 5 } : { x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Column 3: Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About", href: "/about" },
                                { name: "Services", href: "/services" },
                                { name: "Careers", href: "/careers" },
                                { name: "Contact", href: "/contact" },
                            ].map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}  // Use 'to' instead of 'href' for react-router-dom links
                                    className="text-blue-200/70 hover:text-white transition-colors flex items-center group"
                                    onMouseEnter={() => setActiveLink(`link-${index}`)}
                                    onMouseLeave={() => setActiveLink(null)}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  // Scroll to top on click
                                >
                                    <ChevronRight className="mr-2 h-4 w-4 text-blue-500" />
                                    <span>{link.name}</span>
                                    <motion.span
                                        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        animate={activeLink === `link-${index}` ? { x: 5, opacity: 1 } : { x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ArrowUpRight className="h-3 w-3" />
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 4: Contact & Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                            Get In Touch
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        </h3>

                        <ul className="space-y-4 mb-6">
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/80 mr-3 mt-0.5">
                                    <MapPin className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white text-md">B-502, Ananta Square Near</p>
                                    <p className="text-blue-200/70 text-md">SP Ring Road, Ahmedabad – 382330 Gujarat</p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/80 mr-3">
                                    <Phone className="h-4 w-4 text-blue-400" />
                                </div>
                                <p className="text-white text-md">+91 63516 72568</p>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/80 mr-3">
                                    <Mail className="h-4 w-4 text-blue-400" />
                                </div>
                                <p className="text-white text-md">info@seunits.com</p>
                            </li>
                        </ul>


                    </motion.div>
                </div>

                {/* Social media */}
                <motion.div
                    className="flex flex-col items-center justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h4 className="text-blue-400 text-sm font-medium mb-4 tracking-wider">CONNECT WITH US</h4>
                    <div className="flex space-x-4">
                        {[
                            { icon: <Twitter className="h-5 w-5" />, color: "from-blue-500 to-blue-600", url: "https://x.com/SEUnits_Pvt_LTD" },
                            { icon: <Instagram className="h-5 w-5" />, color: "from-pink-500 to-purple-600", url: "https://www.instagram.com/seunits.official?igsh=ejZvdThzc3Mzcnpr" },
                            { icon: <Linkedin className="h-5 w-5" />, color: "from-blue-600 to-blue-800", url: "https://www.linkedin.com/company/sudarsana-entrepreneurs-units-pvt-ltd/?viewAsMember=true" },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${social.color} text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 transition-all duration-300`}
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom bar with copyright */}
                <div className="border-t border-blue-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <motion.div
                        className="mb-4 md:mb-0 flex flex-col sm:flex-row items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-2">
                                <span className="text-xs font-bold text-white">S</span>
                            </div>
                            <span className="text-white font-medium">Sudarsana Entrepreneurs Units</span>
                        </div>
                        <span className="text-blue-400/70 text-md">© {new Date().getFullYear()} All rights reserved</span>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Link href="#" className="text-blue-400/70 hover:text-blue-300 text-md transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-blue-400/70 hover:text-blue-300 text-md transition-colors duration-300">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-blue-400/70 hover:text-blue-300 text-md transition-colors duration-300">
                            Cookie Policy
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Back to top button */}
            <motion.button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-shadow duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Back to top</span>
            </motion.button>
        </footer>
    )
}
