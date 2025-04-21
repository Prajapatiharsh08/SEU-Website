import { useParams } from 'react-router-dom';
import ServiceBackground from "./ServiceBackground";
import ServiceDetailCaseStudies from "./ServiceDetailCaseStudies";
import ServiceDetailFeatures from "./ServiceDetailFeatures";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceDetailProcess from "./ServiceDetailProcess";
import ServiceDetailFAQ from './ServiceDetailFAQ';

export default function ServiceDetailPage() {
    // Use the useParams hook to get the serviceId from the URL
    const { service } = useParams();

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <ServiceBackground />
            <div className="relative z-10 min-h-screen flex flex-col">
                <ServiceDetailHero serviceId={service} />
                <ServiceDetailFeatures serviceId={service} />
                <ServiceDetailProcess serviceId={service} />
                <ServiceDetailCaseStudies serviceId={service} />
                <ServiceDetailFAQ serviceId={service} />
            </div>
        </main>
    );
}
