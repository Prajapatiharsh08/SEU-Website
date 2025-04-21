import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Upload,
    GraduationCap,
    Building,
    Award,
    CheckCircle,
    X,
    FileText,
    Linkedin,
    Github,
    Globe,
    Star,
    Plus,
    ArrowLeft,
    ArrowRight,
} from "lucide-react"

export default function ApplicationForm({ currentStep=1, formData=()=>{}, updateFormData=()=>{}, nextStep=()=>{}, prevStep=()=>{} }) {
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [skillInput, setSkillInput] = useState("")
    const [focusedField, setFocusedField] = useState(null)

    // Populate role from URL query if available
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const roleParam = params.get("role");

            // Ensure formData is not undefined and roleParam exists
            if (roleParam && formData && !formData.role) {
                updateFormData({ ...formData, role: roleParam });
            }
        }
    }, [formData, updateFormData]);

    const validateStep = (step) => {
        const newErrors = {}

        if (step === 1) {
            // Validate basic information
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

            if (!formData.email.trim()) {
                newErrors.email = "Email is required"
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Email is invalid"
            }

            if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
            if (!formData.location.trim()) newErrors.location = "Location is required"
            if (!formData.role.trim()) newErrors.role = "Role is required"
            if (!formData.experience.trim()) newErrors.experience = "Experience level is required"
        } else if (step === 2) {
            // Validate professional details
            if (!formData.resume) newErrors.resume = "Resume is required"

            if (
                formData.portfolio &&
                !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.portfolio)
            ) {
                newErrors.portfolio = "Please enter a valid URL"
            }

            if (formData.linkedin && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(formData.linkedin)) {
                newErrors.linkedin = "Please enter a valid LinkedIn URL"
            }

            if (formData.github && !/^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/?$/.test(formData.github)) {
                newErrors.github = "Please enter a valid GitHub URL"
            }

            if (!formData.education.trim()) newErrors.education = "Education level is required"
            if (!formData.degree.trim()) newErrors.degree = "Degree/Field is required"
            if (!formData.institution.trim()) newErrors.institution = "Institution is required"
            if (!formData.graduationYear.trim()) newErrors.graduationYear = "Graduation year is required"
        } else if (step === 3) {
            // Validate experience details
            if (formData.experience !== "No experience") {
                if (!formData.previousCompany.trim()) newErrors.previousCompany = "Previous company is required"
                if (!formData.previousRole.trim()) newErrors.previousRole = "Previous role is required"
                if (!formData.workDuration.trim()) newErrors.workDuration = "Work duration is required"
                if (!formData.responsibilities.trim()) newErrors.responsibilities = "Responsibilities are required"
            }

            if (formData.skills.length === 0) newErrors.skills = "At least one skill is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            nextStep()
            window.scrollTo(0, 0)
        }
    }

    const handlePrev = () => {
        prevStep()
        window.scrollTo(0, 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateStep(currentStep)) {
            setIsSubmitting(true)   

            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false)
                setIsSubmitted(true)
            }, 2000)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null
        updateFormData({ resume: file })

        // Clear error when file is selected
        if (file && errors.resume) {
            const newErrors = { ...errors }
            delete newErrors.resume
            setErrors(newErrors)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateFormData({ [name]: value })

        // Clear error when user types
        if (errors[name]) {
            const newErrors = { ...errors }
            delete newErrors[name]
            setErrors(newErrors)
        }
    }

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            const updatedSkills = [...formData.skills, skillInput.trim()]
            updateFormData({ skills: updatedSkills })
            setSkillInput("")

            // Clear error when skill is added
            if (errors.skills) {
                const newErrors = { ...errors }
                delete newErrors.skills
                setErrors(newErrors)
            }
        }
    }

    const removeSkill = (skillToRemove) => {
        const updatedSkills = formData.skills.filter((skill) => skill !== skillToRemove)
        updateFormData({ skills: updatedSkills })
    }

    const handleSkillInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addSkill()
        }
    }

    // Custom input field component
    const InputField = ({
        type = "text",
        name,
        value,
        onChange,
        placeholder,
        icon,
        label,
        required = false,
        options = [],
        rows = 3,
    }) => {
        const isFocused = focusedField === name
        const hasError = errors[name]

        return (
            <div className="mb-6">
                <label
                    htmlFor={name}
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isFocused ? "text-blue-400" : hasError ? "text-red-400" : "text-white/80"
                        }`}
                >
                    {label} {required && <span className="text-blue-400">*</span>}
                </label>

                <div className={`relative group`}>
                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg bg-gradient-to-r 
            ${isFocused ? "from-blue-600/50 to-blue-400/50 opacity-100" : "from-blue-900/30 to-blue-800/30 opacity-0 group-hover:opacity-50"} 
            transition-opacity duration-300 -z-10`}
                    ></div>

                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg border-2 
            ${hasError ? "border-red-500/70" : isFocused ? "border-blue-500/70" : "border-blue-900/30 group-hover:border-blue-800/50"} 
            transition-colors duration-300 -z-10`}
                    ></div>

                    <div className="flex items-center">
                        <div className={`pl-4 py-3 ${type === "textarea" ? "self-start pt-4" : ""}`}>
                            <div
                                className={`w-5 h-5 ${isFocused ? "text-blue-400" : hasError ? "text-red-400" : "text-white/50 group-hover:text-white/70"
                                    } transition-colors duration-300`}
                            >
                                {icon}
                            </div>
                        </div>

                        {type === "select" ? (
                            <select
                                id={name}
                                name={name}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocusedField(name)}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full bg-transparent border-0 pl-2 pr-4 py-3 text-white placeholder:text-white/40 
                  focus:outline-none focus:ring-0 transition-colors duration-300`}
                            >
                                <option value="" className="bg-blue-950">
                                    Select an option
                                </option>
                                {options.map((option) => (
                                    <option key={option} value={option} className="bg-blue-950">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : type === "textarea" ? (
                            <textarea
                                id={name}
                                name={name}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocusedField(name)}
                                onBlur={() => setFocusedField(null)}
                                rows={rows}
                                placeholder={placeholder}
                                className={`w-full bg-transparent border-0 pl-2 pr-4 py-3 text-white placeholder:text-white/40 
                  focus:outline-none focus:ring-0 transition-colors duration-300 resize-none`}
                            />
                        ) : (
                            <input
                                type={type}
                                id={name}
                                name={name}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocusedField(name)}
                                onBlur={() => setFocusedField(null)}
                                placeholder={placeholder}
                                className={`w-full bg-transparent border-0 pl-2 pr-4 py-3 text-white placeholder:text-white/40 
                  focus:outline-none focus:ring-0 transition-colors duration-300`}
                            />
                        )}
                    </div>
                </div>

                {hasError && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" /> {errors[name]}
                    </motion.p>
                )}
            </div>
        )
    }

    // Form steps with the new design
    const renderStep1 = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                <p className="text-white/60">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    icon={<User />}
                    label="First Name"
                    required
                />

                <InputField
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    icon={<User />}
                    label="Last Name"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    icon={<Mail />}
                    label="Email Address"
                    required
                />

                <InputField
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    icon={<Phone />}
                    label="Phone Number"
                    required
                />
            </div>

            <InputField
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                icon={<MapPin />}
                label="Current Location"
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    type="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder=""
                    icon={<Briefcase />}
                    label="Position You're Applying For"
                    required
                    options={[
                        "Senior Frontend Developer",
                        "Backend Developer",
                        "Full Stack Developer",
                        "UI/UX Designer",
                        "Motion Designer",
                        "Digital Marketing Specialist",
                        "Content Strategist",
                        "Data Analyst",
                        "Machine Learning Engineer",
                        "Other",
                    ]}
                />

                <InputField
                    type="select"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder=""
                    icon={<Calendar />}
                    label="Experience Level"
                    required
                    options={["No experience", "1-2 years", "3-5 years", "5+ years", "10+ years"]}
                />
            </div>
        </motion.div>
    )

    const renderStep2 = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Professional Details</h3>
                <p className="text-white/60">Tell us about your professional background</p>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="resume"
                    className={`block text-sm font-medium mb-2 ${errors.resume ? "text-red-400" : "text-white/80"}`}
                >
                    Resume/CV <span className="text-blue-400">*</span>
                </label>

                <div className={`relative group`}>
                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg bg-gradient-to-r 
            from-blue-900/30 to-blue-800/30 opacity-0 group-hover:opacity-50
            transition-opacity duration-300 -z-10`}
                    ></div>

                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg border-2 
            ${errors.resume ? "border-red-500/70" : "border-blue-900/30 group-hover:border-blue-800/50"} 
            transition-colors duration-300 -z-10`}
                    ></div>

                    <div className="p-6">
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="w-10 h-10 text-blue-400 mb-3" />
                            <p className="text-white/70 mb-2 text-center">Drag and drop your resume here, or click to browse</p>
                            <p className="text-white/50 text-sm mb-4 text-center">PDF, DOCX or RTF (Max 5MB)</p>

                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                onChange={handleFileChange}
                                accept=".pdf,.docx,.rtf"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => document.getElementById("resume")?.click()}
                                className="px-6 py-2.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 
                  rounded-lg text-white transition-colors duration-300 flex items-center"
                            >
                                <FileText className="w-4 h-4 mr-2" /> Browse Files
                            </button>

                            {formData.resume && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 flex items-center bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-500/30"
                                >
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                                    <span className="text-white/80">{formData.resume.name}</span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {errors.resume && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" /> {errors.resume}
                    </motion.p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    icon={<Globe />}
                    label="Portfolio URL"
                    required={false}
                />

                <InputField
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    icon={<Linkedin />}
                    label="LinkedIn Profile"
                    required={false}
                />
            </div>

            <InputField
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
                icon={<Github />}
                label="GitHub Profile"
                required={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    type="select"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder=""
                    icon={<GraduationCap />}
                    label="Highest Education Level"
                    required
                    options={["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"]}
                />

                <InputField
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="Computer Science"
                    icon={<Award />}
                    label="Degree/Field of Study"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder="University Name"
                    icon={<Building />}
                    label="Institution"
                    required
                />

                <InputField
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    placeholder="2022"
                    icon={<Calendar />}
                    label="Graduation Year"
                    required
                />
            </div>
        </motion.div>
    )

    const renderStep3 = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Experience & Skills</h3>
                <p className="text-white/60">Tell us about your work experience and skills</p>
            </div>

            {formData.experience !== "No experience" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InputField
                            name="previousCompany"
                            value={formData.previousCompany}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                            icon={<Building />}
                            label="Previous Company"
                            required
                        />

                        <InputField
                            name="previousRole"
                            value={formData.previousRole}
                            onChange={handleInputChange}
                            placeholder="Job Title"
                            icon={<Briefcase />}
                            label="Previous Role"
                            required
                        />
                    </div>

                    <InputField
                        name="workDuration"
                        value={formData.workDuration}
                        onChange={handleInputChange}
                        placeholder="e.g., Jan 2020 - Mar 2023"
                        icon={<Calendar />}
                        label="Duration"
                        required
                    />

                    <InputField
                        type="textarea"
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleInputChange}
                        placeholder="Describe your key responsibilities in your previous role"
                        icon={<FileText />}
                        label="Key Responsibilities"
                        required
                        rows={3}
                    />

                    <InputField
                        type="textarea"
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleInputChange}
                        placeholder="Describe notable achievements or projects"
                        icon={<Award />}
                        label="Key Achievements"
                        required={false}
                        rows={3}
                    />
                </>
            )}

            <div className="mb-6">
                <label
                    htmlFor="skills"
                    className={`block text-sm font-medium mb-2 ${errors.skills ? "text-red-400" : "text-white/80"}`}
                >
                    Skills <span className="text-blue-400">*</span>
                </label>

                <div className={`relative group`}>
                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg bg-gradient-to-r 
            from-blue-900/30 to-blue-800/30 opacity-0 group-hover:opacity-50
            transition-opacity duration-300 -z-10`}
                    ></div>

                    <div
                        className={`absolute left-0 top-0 w-full h-full rounded-lg border-2 
            ${errors.skills ? "border-red-500/70" : "border-blue-900/30 group-hover:border-blue-800/50"} 
            transition-colors duration-300 -z-10`}
                    ></div>

                    <div className="p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-blue-600/30 border border-blue-500/50 px-3 py-1.5 rounded-full flex items-center"
                                >
                                    <Star className="w-3 h-3 mr-1.5 text-blue-400" />
                                    <span className="text-white/90 text-sm">{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-white/70 hover:text-white/100 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center">
                            <Star className="w-5 h-5 text-white/50 ml-2 mr-2" />
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillInputKeyDown}
                                className="flex-grow bg-transparent border-none outline-none text-white placeholder:text-white/40"
                                placeholder="Type a skill and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                    </div>
                </div>

                {errors.skills && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400 flex items-center"
                    >
                        <X className="w-4 h-4 mr-1" /> {errors.skills}
                    </motion.p>
                )}
            </div>

            <InputField
                type="textarea"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any additional information you'd like to share"
                icon={<FileText />}
                label="Additional Information"
                required={false}
                rows={4}
            />
        </motion.div>
    )

    const renderStep4 = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Application Review</h3>
                <p className="text-white/60">Please review your application before submitting</p>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-800/30 overflow-hidden">
                    <div className="px-6 py-4 bg-blue-900/40 border-b border-blue-800/30 flex items-center">
                        <User className="w-5 h-5 text-blue-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Personal Information</h4>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Full Name</p>
                                <p className="text-white">
                                    {formData.firstName} {formData.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Email</p>
                                <p className="text-white">{formData.email}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Phone</p>
                                <p className="text-white">{formData.phone}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Location</p>
                                <p className="text-white">{formData.location}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Position</p>
                                <p className="text-white">{formData.role}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Experience Level</p>
                                <p className="text-white">{formData.experience}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-800/30 overflow-hidden">
                    <div className="px-6 py-4 bg-blue-900/40 border-b border-blue-800/30 flex items-center">
                        <GraduationCap className="w-5 h-5 text-blue-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Professional Details</h4>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Resume</p>
                                <p className="text-white">{formData.resume?.name || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Portfolio</p>
                                <p className="text-white">{formData.portfolio || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">LinkedIn</p>
                                <p className="text-white">{formData.linkedin || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">GitHub</p>
                                <p className="text-white">{formData.github || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Education</p>
                                <p className="text-white">
                                    {formData.education}, {formData.degree}
                                </p>
                            </div>
                            <div>
                                <p className="text-blue-400 text-sm font-medium mb-1">Institution</p>
                                <p className="text-white">
                                    {formData.institution}, {formData.graduationYear}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-800/30 overflow-hidden">
                    <div className="px-6 py-4 bg-blue-900/40 border-b border-blue-800/30 flex items-center">
                        <Briefcase className="w-5 h-5 text-blue-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Experience & Skills</h4>
                    </div>
                    <div className="p-6">
                        {formData.experience !== "No experience" ? (
                            <div className="mb-4">
                                <p className="text-blue-400 text-sm font-medium mb-1">Previous Employment</p>
                                <p className="text-white">
                                    {formData.previousRole} at {formData.previousCompany}, {formData.workDuration}
                                </p>

                                <p className="text-blue-400 text-sm font-medium mt-3 mb-1">Key Responsibilities</p>
                                <p className="text-white">{formData.responsibilities}</p>

                                {formData.achievements && (
                                    <>
                                        <p className="text-blue-400 text-sm font-medium mt-3 mb-1">Key Achievements</p>
                                        <p className="text-white">{formData.achievements}</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="text-white mb-4">No previous work experience</p>
                        )}

                        <p className="text-blue-400 text-sm font-medium mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {formData.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-600/30 border border-blue-500/50 px-3 py-1 rounded-full flex items-center"
                                >
                                    <Star className="w-3 h-3 mr-1.5 text-blue-400" />
                                    <span className="text-white/90 text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>

                        {formData.additionalInfo && (
                            <>
                                <p className="text-blue-400 text-sm font-medium mt-3 mb-1">Additional Information</p>
                                <p className="text-white">{formData.additionalInfo}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center p-4 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/30">
                <input
                    type="checkbox"
                    id="confirm"
                    className="w-5 h-5 rounded border-blue-900/50 bg-blue-950/30 text-blue-600 focus:ring-blue-500"
                    required
                />
                <label htmlFor="confirm" className="ml-3 text-white/80 text-sm">
                    I confirm that all the information provided is accurate and complete. I understand that any false statements
                    may result in the rejection of my application.
                </label>
            </div>
        </motion.div>
    )

    const renderSuccessMessage = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20"
            >
                <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-3 text-white"
            >
                Application Submitted!
            </motion.h3>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 max-w-md mb-10"
            >
                Thank you for applying to join the SEU team. We've received your application and will review it shortly. Our
                team will contact you regarding the next steps.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-800/30 p-6 max-w-lg"
            >
                <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                    What's Next?
                </h4>
                <ol className="space-y-4 text-left">
                    <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center mr-3">
                            <span className="text-blue-400 font-bold">1</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">Application Review</p>
                            <p className="text-white/70 text-sm">Our team will review your application within 5-7 business days.</p>
                        </div>
                    </motion.li>

                    <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center mr-3">
                            <span className="text-blue-400 font-bold">2</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">Initial Interview</p>
                            <p className="text-white/70 text-sm">
                                If your qualifications match our requirements, we'll contact you for an initial interview.
                            </p>
                        </div>
                    </motion.li>

                    <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center mr-3">
                            <span className="text-blue-400 font-bold">3</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">Technical Assessment</p>
                            <p className="text-white/70 text-sm">
                                The interview process typically includes technical assessments and team interviews.
                            </p>
                        </div>
                    </motion.li>

                    <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-start"
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center mr-3">
                            <span className="text-blue-400 font-bold">4</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">Offer Letter</p>
                            <p className="text-white/70 text-sm">
                                Final candidates will receive an offer letter with detailed information about the role.
                            </p>
                        </div>
                    </motion.li>
                </ol>
            </motion.div>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => (window.location.href = "/careers")}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 
          rounded-lg text-white flex items-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Careers
            </motion.button>
        </motion.div>
    )

    // Progress bar with the new design
    const renderProgressBar = () => (
        <div className="mb-10">
            <div className="relative">
                <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                    ></div>
                </div>

                <div className="flex justify-between mt-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="relative">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${currentStep >= step
                                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                                        : "bg-blue-900/30 text-white/50 border border-blue-800/50"
                                    }`}
                            >
                                {currentStep > step ? <CheckCircle className="w-4 h-4" /> : <span>{step}</span>}
                            </div>
                            <div
                                className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap
                  ${currentStep >= step ? "text-blue-400" : "text-white/50"}`}
                            >
                                {step === 1 && "Personal"}
                                {step === 2 && "Professional"}
                                {step === 3 && "Experience"}
                                {step === 4 && "Review"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto mb-6">
            <div className="relative">
                <div className="bg-gradient-to-r from-blue-950/80 to-black/80 backdrop-blur-xl rounded-2xl border border-blue-900/30 p-8 shadow-xl shadow-blue-900/10">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mr-3">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Join Our Team
                        </h2>
                    </div>

                    {!isSubmitted && renderProgressBar()}

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                renderSuccessMessage()
                            ) : (
                                <>
                                    {currentStep === 1 && renderStep1()}
                                    {currentStep === 2 && renderStep2()}
                                    {currentStep === 3 && renderStep3()}
                                    {currentStep === 4 && renderStep4()}

                                    <div className="flex justify-between mt-12 pt-6 border-t border-blue-900/30">
                                        {currentStep > 1 ? (
                                            <motion.button
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                type="button"
                                                onClick={handlePrev}
                                                className="px-6 py-3 bg-blue-900/50 hover:bg-blue-800/50 border border-blue-800/50 
                          rounded-lg text-white flex items-center transition-all duration-300"
                                            >
                                                <ArrowLeft className="w-5 h-5 mr-2" />
                                                Previous
                                            </motion.button>
                                        ) : (
                                            <div></div>
                                        )}

                                        {currentStep < 4 ? (
                                            <motion.button
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                type="button"
                                                onClick={handleNext}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 
                          rounded-lg text-white flex items-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                                            >
                                                Next
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 
                          rounded-lg text-white flex items-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                          disabled:from-blue-600/50 disabled:to-blue-400/50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Application
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    )
}
