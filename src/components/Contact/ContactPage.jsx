import React from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';
import ContactBackground from './ContactBackground';

const ContactPage = () => {
    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="fixed inset-0 -z-10">
                <ContactBackground />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                <ContactHero />
                <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <ContactForm />
                    <div className="space-y-16">
                        <ContactInfo />
                        <ContactMap />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
