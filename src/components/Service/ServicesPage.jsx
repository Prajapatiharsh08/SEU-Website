import ServiceBackground from "./ServiceBackground";
// import ServiceCategories from "./ServiceCategories";
import ServiceCTA from "./ServiceCTA";
import ServicePartners from "./ServicePartners";
import ServiceProcess from "./ServiceProcess";
import ServicesHero from "./ServicesHero";
import ServicesShowcase from "./ServicesShowcase";
import ServiceTestimonials from "./ServiceTestimonials";

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <ServiceBackground />
            <div className="relative z-10 min-h-screen flex flex-col">
                <ServicesHero />
                <ServicesShowcase />
                {/* <ServiceCategories /> */}
                <ServiceProcess />
                <ServiceTestimonials />
                <ServicePartners />
                <ServiceCTA />
            </div>
        </main>
    )
}
