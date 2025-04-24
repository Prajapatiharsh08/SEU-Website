import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import JobCategories from "./JobCategories"
import CompanyCulture from "./CompanyCulture"
import BenefitsShowcase from "./BenefitsShowcase"
import WhyJoinUs from "./WhyJoinUs"
import GrowthPaths from "./GrowthPaths"
import OfficeLocations from "./OfficeLocations"
import AwardsSection from "./AwardsSection"
import TeamQuotes from "./TeamQuotes"
import ThreeScene from "./ThreeSceneCareer"

export default function CareerPage() {
    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* 3D Background */}
            <div className="fixed inset-0 z-0">
                <ThreeScene />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-block mb-4">
                            {/* <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                                <div className="relative px-6 py-3 bg-black rounded-lg leading-none">
                                    <span className="text-blue-400 font-medium">We're hiring • Join our team</span>
                                </div>
                            </div> */}
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Join Our Team at Quantum Nexus
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto">
                            Be part of a revolutionary tech community that's shaping the future. Discover exciting career
                            opportunities that match your skills and ambitions.
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/careers/apply"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[3px] transition-all duration-300"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl">
                                    Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <button
                                onClick={() => {
                                    const section = document.getElementById('job-categories');
                                    if (section) {
                                        section.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="inline-flex items-center gap-2 bg-transparent border border-blue-500/30 hover:border-blue-500 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 cursor-pointer"
                            >
                                Explore Roles
                            </button>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <Link to="#about" className="text-blue-400 flex flex-col items-center">
                            <span className="text-sm mb-2">Scroll to discover</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 5V19M12 19L5 12M12 19L19 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                            <div className="h-[2px] w-12 bg-blue-500"></div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">About Quantum Nexus</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-lg text-blue-100">
                                    Quantum Nexus is a pioneering technology company at the forefront of innovation. We specialize in
                                    developing cutting-edge solutions that transform industries and enhance user experiences through
                                    quantum computing, artificial intelligence, and immersive technologies.
                                </p>
                                <p className="text-lg text-blue-100">
                                    Our team consists of passionate professionals who are dedicated to pushing boundaries and creating
                                    impactful technology. We foster a collaborative environment where creativity thrives and ideas become
                                    reality.
                                </p>
                                <p className="text-lg text-blue-100">
                                    With a focus on continuous learning and growth, Quantum Nexus provides an ideal platform for tech
                                    enthusiasts to evolve their skills and contribute to groundbreaking projects that shape the future of
                                    technology.
                                </p>

                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
                                        <div className="text-sm text-blue-200">Employees</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">12</div>
                                        <div className="text-sm text-blue-200">Global Offices</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">8+</div>
                                        <div className="text-sm text-blue-200">Years of Innovation</div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black/60 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <img
                                    src="/placeholder.svg?height=400&width=600"
                                    alt="Quantum Nexus Office"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Link
                                        to="/about"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Categories */}
                <div id="job-categories">
                    <JobCategories />
                </div>

                {/* Company Culture */}
                <CompanyCulture />

                {/* Benefits Showcase */}
                <BenefitsShowcase />

                {/* Why Join Us */}
                <WhyJoinUs />

                {/* Growth Paths */}
                <GrowthPaths />

                {/* Office Locations */}
                <OfficeLocations />

                {/* Awards Section */}
                <AwardsSection />

                {/* Team Quotes */}
                <TeamQuotes />

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 text-center backdrop-blur-sm bg-black/40">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Ready to Shape the Future?
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Join our innovative team and be part of something extraordinary. We're looking for talented individuals
                            who are passionate about technology and eager to make an impact.
                        </p>
                        <div className="pt-6 flex flex-wrap gap-6 justify-center">
                            <Link
                                to="/careers/apply"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[3px] transition-all duration-300"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white backdrop-blur-3xl">
                                    Start Your Application{" "}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <Link
                                to="/careers/internships"
                                className="inline-flex items-center gap-2 bg-transparent border border-blue-500/30 hover:border-blue-500 px-8 py-4 rounded-full text-white font-medium transition-all duration-300"
                            >
                                Student & Internship Programs
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-blue-300 mb-4">Stay Updated</h3>
                                <p className="text-blue-100 mb-2">
                                    Subscribe to our careers newsletter to receive the latest job openings and company updates.
                                </p>
                                <p className="text-sm text-blue-300">We'll never share your email with anyone else.</p>
                            </div>
                            <div>
                                <form className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="flex-1 px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-800 focus:border-blue-500 focus:outline-none text-white"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="consent" className="rounded border-blue-800 bg-blue-950/50" required />
                                        <label htmlFor="consent" className="text-sm text-blue-200">
                                            I agree to receive career updates from Quantum Nexus
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
