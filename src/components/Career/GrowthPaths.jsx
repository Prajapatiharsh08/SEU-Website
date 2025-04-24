import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Code, LineChart, Lightbulb, Users, Database, Cpu } from "lucide-react"

const careerPaths = [
    {
        id: "engineering",
        title: "Engineering",
        icon: <Code className="h-6 w-6" />,
        color: "from-blue-500 to-indigo-500",
        levels: [
            {
                title: "Associate Engineer",
                skills: ["Core programming skills", "Basic problem solving", "Team collaboration"],
                responsibilities: ["Implement features with guidance", "Fix bugs", "Write tests"],
            },
            {
                title: "Software Engineer", 
                skills: ["Strong programming fundamentals", "System design basics", "Code review"],
                responsibilities: [
                    "Implement complex features",
                    "Contribute to technical decisions",
                    "Mentor junior engineers",
                ],
            },
            {
                title: "Senior Engineer",
                skills: ["Advanced system design", "Technical leadership", "Cross-team collaboration"],
                responsibilities: ["Lead technical initiatives", "Architect solutions", "Drive engineering excellence"],
            },
            {
                title: "Staff Engineer",
                skills: ["System architecture", "Technical strategy", "Organizational influence"],
                responsibilities: ["Define technical direction", "Solve complex technical challenges", "Drive innovation"],
            },
            {
                title: "Principal Engineer",
                skills: ["Technical vision", "Strategic thinking", "Organizational leadership"],
                responsibilities: [
                    "Set technical vision",
                    "Drive company-wide initiatives",
                    "Represent engineering externally",
                ],
            },
        ],
    },
    {
        id: "data-science",
        title: "Data Science",
        icon: <LineChart className="h-6 w-6" />,
        color: "from-green-500 to-teal-500",
        levels: [
            {
                title: "Junior Data Scientist",
                skills: ["Statistical analysis", "Data visualization", "Basic ML algorithms"],
                responsibilities: ["Clean and prepare data", "Build simple models", "Create reports"],
            },
            {
                title: "Data Scientist",
                skills: ["Advanced ML techniques", "Feature engineering", "Model evaluation"],
                responsibilities: ["Develop ML models", "Extract insights from data", "Present findings to stakeholders"],
            },
            {
                title: "Senior Data Scientist",
                skills: ["Deep learning", "Experimental design", "Model deployment"],
                responsibilities: ["Lead data science projects", "Define metrics and KPIs", "Mentor junior data scientists"],
            },
            {
                title: "Lead Data Scientist",
                skills: ["ML system design", "Research direction", "Cross-functional leadership"],
                responsibilities: ["Set data science strategy", "Drive innovation in ML", "Lead multiple teams"],
            },
            {
                title: "Principal Data Scientist",
                skills: ["Research leadership", "Strategic vision", "Industry thought leadership"],
                responsibilities: ["Define company-wide data strategy", "Drive cutting-edge research", "Represent externally"],
            },
        ],
    },
    {
        id: "product",
        title: "Product",
        icon: <Lightbulb className="h-6 w-6" />,
        color: "from-purple-500 to-pink-500",
        levels: [
            {
                title: "Associate Product Manager",
                skills: ["User empathy", "Basic product thinking", "Communication"],
                responsibilities: ["Support product initiatives", "Gather user feedback", "Document requirements"],
            },
            {
                title: "Product Manager",
                skills: ["Product strategy", "User research", "Stakeholder management"],
                responsibilities: ["Define product requirements", "Work with engineering teams", "Drive product launches"],
            },
            {
                title: "Senior Product Manager",
                skills: ["Strategic thinking", "Market analysis", "Cross-functional leadership"],
                responsibilities: ["Lead product strategy", "Define roadmaps", "Drive business outcomes"],
            },
            {
                title: "Product Director",
                skills: ["Product vision", "Business strategy", "Team leadership"],
                responsibilities: ["Set product direction", "Lead product teams", "Drive company growth"],
            },
            {
                title: "VP of Product",
                skills: ["Executive leadership", "Strategic vision", "Organizational design"],
                responsibilities: ["Define product vision", "Lead product organization", "Drive company strategy"],
            },
        ],
    },
    {
        id: "design",
        title: "Design",
        icon: <Lightbulb className="h-6 w-6" />,
        color: "from-orange-500 to-red-500",
        levels: [
            {
                title: "Junior Designer",
                skills: ["Visual design", "UI fundamentals", "Design tools"],
                responsibilities: ["Create UI elements", "Support design projects", "Implement design systems"],
            },
            {
                title: "Product Designer",
                skills: ["UX design", "User research", "Interaction design"],
                responsibilities: ["Design user flows", "Create prototypes", "Collaborate with product and engineering"],
            },
            {
                title: "Senior Designer",
                skills: ["Design strategy", "Design systems", "Cross-functional collaboration"],
                responsibilities: ["Lead design projects", "Define design patterns", "Mentor junior designers"],
            },
            {
                title: "Design Lead",
                skills: ["Design leadership", "Strategic thinking", "Team management"],
                responsibilities: ["Set design direction", "Lead design teams", "Drive design excellence"],
            },
            {
                title: "Design Director",
                skills: ["Design vision", "Organizational leadership", "Business strategy"],
                responsibilities: ["Define design vision", "Lead design organization", "Drive company brand"],
            },
        ],
    },
    {
        id: "management",
        title: "Engineering Management",
        icon: <Users className="h-6 w-6" />,
        color: "from-cyan-500 to-blue-500",
        levels: [
            {
                title: "Team Lead",
                skills: ["Technical leadership", "Basic people management", "Project planning"],
                responsibilities: ["Lead small teams", "Provide technical guidance", "Manage team deliverables"],
            },
            {
                title: "Engineering Manager",
                skills: ["People management", "Project management", "Technical oversight"],
                responsibilities: ["Manage engineering teams", "Drive team performance", "Support career growth"],
            },
            {
                title: "Senior Engineering Manager",
                skills: ["Leadership development", "Strategic planning", "Cross-team collaboration"],
                responsibilities: ["Lead multiple teams", "Drive engineering initiatives", "Develop leaders"],
            },
            {
                title: "Director of Engineering",
                skills: ["Organizational leadership", "Strategic vision", "Executive communication"],
                responsibilities: ["Set engineering direction", "Lead engineering organization", "Drive technical strategy"],
            },
            {
                title: "VP of Engineering",
                skills: ["Executive leadership", "Organizational design", "Business strategy"],
                responsibilities: ["Define engineering vision", "Lead engineering division", "Drive company growth"],
            },
        ],
    },
    {
        id: "ai",
        title: "AI Research",
        icon: <Cpu className="h-6 w-6" />,
        color: "from-violet-500 to-purple-500",
        levels: [
            {
                title: "Research Assistant",
                skills: ["ML fundamentals", "Research methods", "Implementation skills"],
                responsibilities: ["Support research projects", "Implement algorithms", "Run experiments"],
            },
            {
                title: "Research Scientist",
                skills: ["Advanced ML", "Research design", "Scientific communication"],
                responsibilities: ["Conduct original research", "Publish papers", "Develop new algorithms"],
            },
            {
                title: "Senior Research Scientist",
                skills: ["Research leadership", "Novel approaches", "Cross-disciplinary thinking"],
                responsibilities: ["Lead research projects", "Define research questions", "Mentor junior researchers"],
            },
            {
                title: "Principal Researcher",
                skills: ["Research vision", "Strategic thinking", "Field leadership"],
                responsibilities: ["Set research direction", "Drive innovation", "Represent company in research community"],
            },
            {
                title: "Distinguished Researcher",
                skills: ["Pioneering research", "Thought leadership", "Strategic vision"],
                responsibilities: ["Define research vision", "Lead breakthrough innovations", "Shape industry direction"],
            },
        ],
    },
    {
        id: "devops",
        title: "DevOps & Infrastructure",
        icon: <Database className="h-6 w-6" />,
        color: "from-amber-500 to-yellow-500",
        levels: [
            {
                title: "DevOps Engineer",
                skills: ["Infrastructure as code", "CI/CD", "Cloud platforms"],
                responsibilities: ["Maintain infrastructure", "Implement automation", "Support development teams"],
            },
            {
                title: "Senior DevOps Engineer",
                skills: ["System architecture", "Performance optimization", "Security practices"],
                responsibilities: ["Design infrastructure", "Implement best practices", "Drive automation"],
            },
            {
                title: "DevOps Lead",
                skills: ["Infrastructure strategy", "Team leadership", "Cross-functional collaboration"],
                responsibilities: ["Lead DevOps teams", "Define infrastructure strategy", "Drive operational excellence"],
            },
            {
                title: "Infrastructure Architect",
                skills: ["System design", "Strategic planning", "Technical leadership"],
                responsibilities: ["Design scalable systems", "Set technical standards", "Drive infrastructure innovation"],
            },
            {
                title: "Director of Infrastructure",
                skills: ["Organizational leadership", "Strategic vision", "Business alignment"],
                responsibilities: ["Set infrastructure direction", "Lead infrastructure teams", "Drive technical strategy"],
            },
        ],
    },
]

export default function GrowthPaths() {
    const [activePath, setActivePath] = useState(careerPaths[0].id)
    const [expandedLevel, setExpandedLevel] = useState(null)

    const activeCareerPath = careerPaths.find((path) => path.id === activePath)

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Career Growth Paths</h2>
                </div>

                <p className="text-center text-blue-200 max-w-2xl mx-auto mb-12">
                    At Quantum Nexus, we believe in providing clear paths for growth and advancement. Explore the various career
                    trajectories available across our organization.
                </p>

                <div className="grid md:grid-cols-7 gap-6 mb-8">
                    {careerPaths.map((path) => (
                        <button
                            key={path.id}
                            onClick={() => {
                                setActivePath(path.id)
                                setExpandedLevel(null)
                            }}
                            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${activePath === path.id ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20" : "hover:bg-blue-900/30"
                                }`}
                        >
                            {activePath === path.id && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-10`}></div>
                            )}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div
                                    className={`p-3 rounded-full mb-3 ${activePath === path.id
                                            ? `bg-gradient-to-br ${path.color} text-white`
                                            : "bg-blue-900/50 text-blue-400"
                                        }`}
                                >
                                    {path.icon}
                                </div>
                                <h3 className={`text-sm font-medium ${activePath === path.id ? "text-white" : "text-blue-300"}`}>
                                    {path.title}
                                </h3>
                            </div>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeCareerPath && (
                        <motion.div
                            key={activeCareerPath.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-xl p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/30`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 rounded-full bg-gradient-to-br ${activeCareerPath.color} text-white`}>
                                    {activeCareerPath.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{activeCareerPath.title} Career Path</h3>
                            </div>

                            <div className="space-y-4">
                                {activeCareerPath.levels.map((level, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={() => setExpandedLevel(expandedLevel === index ? null : index)}
                                            className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center justify-between ${expandedLevel === index
                                                    ? `bg-gradient-to-r from-blue-900/50 to-purple-900/30 border-l-4 border-blue-500`
                                                    : "hover:bg-blue-900/30 border-l-4 border-transparent"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-900/70 flex items-center justify-center text-blue-300 font-medium">
                                                    {index + 1}
                                                </div>
                                                <h4 className="font-bold text-white">{level.title}</h4>
                                            </div>
                                            <ChevronRight
                                                className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${expandedLevel === index ? "rotate-90" : ""
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {expandedLevel === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 pl-16 space-y-4">
                                                        <div>
                                                            <h5 className="text-blue-300 font-medium mb-2">Key Skills:</h5>
                                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {level.skills.map((skill, skillIndex) => (
                                                                    <li key={skillIndex} className="flex items-center gap-2 text-blue-100">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                                        {skill}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <h5 className="text-blue-300 font-medium mb-2">Responsibilities:</h5>
                                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {level.responsibilities.map((resp, respIndex) => (
                                                                    <li key={respIndex} className="flex items-center gap-2 text-blue-100">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                                        {resp}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
