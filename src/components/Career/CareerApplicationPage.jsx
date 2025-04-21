import { useState } from "react";
import CareerBackgrounds from "./CareerBackgrounds";
import ApplicationForm from "./ApplicationForm";

export default function CareerApplicationPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Information (Step 1)
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        role: "",
        experience: "",

        // Professional Details (Step 2)
        resume: null,
        portfolio: "",
        linkedin: "",
        github: "",
        education: "",
        degree: "",
        institution: "",
        graduationYear: "",

        // Experience Details (Step 3)
        previousCompany: "",
        previousRole: "",
        workDuration: "",
        responsibilities: "",
        achievements: "",
        skills: [],
        additionalInfo: "",
    });

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 4)); // Ensure it doesn't go beyond step 4
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ensure it doesn't go below step 1
    };

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 z-0">
                <CareerBackgrounds />
            </div>
            <div className="relative z-10 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 py-16">
                    <ApplicationForm
                        currentStep={currentStep}
                        formData={formData}
                        updateFormData={updateFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                </div>
            </div>
        </main>
    );
}
