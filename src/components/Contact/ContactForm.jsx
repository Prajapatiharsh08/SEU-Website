import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { submitContactFormRequest, resetContactForm } from "../../store/action/contactActions"

export default function ContactForm() {
    const dispatch = useDispatch()
    const { loading, success, error } = useSelector((state) => state.contact)

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Handle Redux state changes
    useEffect(() => {
        if (success) {
            setIsSubmitted(true)

            // Reset form after submission
            setFormState({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })

            // Reset submission status after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false)
                dispatch(resetContactForm())
            }, 5000)
        }
    }, [success, dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prev) => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formState.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formState.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formState.subject.trim()) {
            newErrors.subject = "Subject is required"
        }

        if (!formState.message.trim()) {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) return

        // Dispatch action to Redux Saga
        dispatch(submitContactFormRequest(formState))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-8"
        >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Send Us a Message
            </h2>

            {isSubmitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
                    <p className="text-white/70 max-w-md">
                        Thank you for reaching out. We've received your message and will get back to you shortly.
                    </p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg">{error}</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-white/80 mb-2">
                                Your Name <span className="text-blue-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                className={`w-full bg-blue-950/30 border ${errors.name ? "border-red-500" : "border-blue-900/50"
                                    } rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-white/80 mb-2">
                                Email Address <span className="text-blue-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                className={`w-full bg-blue-950/30 border ${errors.email ? "border-red-500" : "border-blue-900/50"
                                    } rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="phone" className="block text-white/80 mb-2">
                                Phone Number <span className="text-white/50">(Optional)</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full bg-blue-950/30 border border-blue-900/50 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-white/80 mb-2">
                                Subject <span className="text-blue-400">*</span>
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formState.subject}
                                onChange={handleChange}
                                className={`w-full bg-blue-950/30 border ${errors.subject ? "border-red-500" : "border-blue-900/50"
                                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                            >
                                <option value="" className="bg-blue-950">
                                    Select a subject
                                </option>
                                <option value="General Inquiry" className="bg-blue-950">
                                    General Inquiry
                                </option>
                                <option value="Project Request" className="bg-blue-950">
                                    Project Request
                                </option>
                                <option value="Partnership" className="bg-blue-950">
                                    Partnership
                                </option>
                                <option value="Career" className="bg-blue-950">
                                    Career Opportunity
                                </option>
                                <option value="Other" className="bg-blue-950">
                                    Other
                                </option>
                            </select>
                            {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-white/80 mb-2">
                            Your Message <span className="text-blue-400">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full bg-blue-950/30 border ${errors.message ? "border-red-500" : "border-blue-900/50"
                                } rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors`}
                            placeholder="Tell us about your project or inquiry..."
                        ></textarea>
                        {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="privacy"
                            className="w-4 h-4 rounded border-blue-900/50 bg-blue-950/30 text-blue-600 focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="privacy" className="ml-2 text-white/70 text-sm">
                            I agree to the{" "}
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                Privacy Policy
                            </a>{" "}
                            and consent to being contacted regarding my inquiry.
                        </label>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-500 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </motion.button>
                </form>
            )}
        </motion.div>
    )
}