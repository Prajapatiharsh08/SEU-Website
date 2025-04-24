import { motion } from "framer-motion"
import { Award, BookOpen, Coffee, Heart, Rocket, Users, Globe, Zap, Briefcase, Clock } from "lucide-react"

const benefits = [
    {
        icon: <Rocket className="h-10 w-10 text-blue-400" />,
        title: "Innovation First",
        description: "Work on cutting-edge technologies and shape the future of digital experiences.",
    },
    {
        icon: <Users className="h-10 w-10 text-blue-400" />,
        title: "Collaborative Culture",
        description: "Join a diverse team of experts who support each other and share knowledge.",
    },
    {
        icon: <BookOpen className="h-10 w-10 text-blue-400" />,
        title: "Continuous Learning",
        description: "Access to learning resources, conferences, and professional development opportunities.",
    }, 
    {
        icon: <Award className="h-10 w-10 text-blue-400" />,
        title: "Recognition & Growth",
        description: "Your contributions are valued with clear paths for career advancement.",
    },
    {
        icon: <Heart className="h-10 w-10 text-blue-400" />,
        title: "Work-Life Balance",
        description: "Flexible working arrangements that respect your personal time and wellbeing.",
    },
    {
        icon: <Coffee className="h-10 w-10 text-blue-400" />,
        title: "Awesome Perks",
        description: "Competitive salary, health benefits, team events, and a vibrant office environment.",
    },
    {
        icon: <Globe className="h-10 w-10 text-blue-400" />,
        title: "Global Opportunities",
        description: "Work with teams across our global offices and explore international relocation.",
    },
    {
        icon: <Zap className="h-10 w-10 text-blue-400" />,
        title: "Cutting-Edge Tech",
        description: "Access to the latest tools and technologies to help you do your best work.",
    },
    {
        icon: <Briefcase className="h-10 w-10 text-blue-400" />,
        title: "Meaningful Work",
        description: "Solve real problems that impact millions of users around the world.",
    },
    {
        icon: <Clock className="h-10 w-10 text-blue-400" />,
        title: "Flexible Hours",
        description: "Work when you're most productive with our flexible scheduling options.",
    },
]

export default function WhyJoinUs() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Why Join Quantum Nexus?
                    </h2>
                </div>

                <p className="text-center text-blue-200 max-w-2xl mx-auto mb-16">
                    We're building a team of exceptional individuals who are passionate about technology and innovation. Here's
                    why you should be part of our journey:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
                        >
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-blue-300 mb-2">{benefit.title}</h3>
                            <p className="text-blue-100">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
