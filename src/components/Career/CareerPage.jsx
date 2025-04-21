import CareerBackgrounds from "./CareerBackgrounds"
import CareerBenefits from "./CareerBenefits"
import CareerCTA from "./CareerCTA"
import CareerHero from "./CareerHero"
import CareerRoles from "./CareerRoles"
import CareerTestimonials from "./CareerTestimonials"
import CareerValues from "./CareerValues"

export default function CareersPage() {
    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 z-0">
                <CareerBackgrounds />
            </div>
            <div className="relative z-10 min-h-screen flex flex-col">
                <CareerHero />
                <CareerRoles />
                <CareerBenefits />
                <CareerValues />
                <CareerTestimonials />
                <CareerCTA />
            </div>
        </main>
    )
}
