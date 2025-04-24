import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Mail, Globe, Linkedin, Twitter, Instagram, Facebook } from "lucide-react"

export default function ContactInfo() {
    const contactDetails = [
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Our Location",
            details: ["B-502, Ananta Square Opp 108 Head Quoters Near", "SP Ring Road, Ahmedabad – 382330 Gujarat"],
            color: "from-blue-600 to-blue-800",
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Business Hours",
            details: ["Monday - Friday : 9AM - 6PM", "Saturday: 10AM - 2PM", "Sunday: Closed"],
            color: "from-indigo-600 to-indigo-800",
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Phone",
            details: ["+91 63516 72568"],
            color: "from-blue-700 to-indigo-900",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            details: ["info@seunits.com"],
            color: "from-blue-600 to-indigo-700",
        },
    ]

    const socialLinks = [
        { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/company/sudarsana-entrepreneurs-units-pvt-ltd/?viewAsMember=true", color: "bg-[#0077B5]" },
        { icon: <Twitter className="w-5 h-5" />, url: "https://x.com/SEUnits_Pvt_LTD", color: "bg-[#1DA1F2]" },
        {
            icon: <Instagram className="w-5 h-5" />,
            url: "https://www.instagram.com/seunits.official?igsh=ejZvdThzc3Mzcnpr",
            color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8"
        >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Contact Information
            </h2>

            <div className="space-y-6 mb-8">
                {contactDetails.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div
                            className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}
                        >
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                            <div className="text-white/70">
                                {item.details.map((detail, i) => (
                                    <p key={i}>{detail}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.url}
                            target="_blank"
                            className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white`}
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
