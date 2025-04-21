import React from 'react';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutBackground from './AboutBackground';
import AboutProcess from './AboutProcess';
import AboutValues from './AboutValues';
import AboutTeam from './AboutTeam';
import AboutTestimonials from './AboutTestimonials';
import AboutTimeline from './AboutTimeline';
import AboutCTA from './AboutCTA';

const AboutPage = () => {
    return (
        <div className="relative z-0">
            <div className="fixed inset-0 -z-10">
                <AboutBackground />
            </div>

            <div className="about-page relative z-10 space-y-10">
                <AboutHero />
                <AboutMission />
                <AboutProcess />
                <AboutValues />
                <AboutTeam />
                <AboutTestimonials />
                <AboutTimeline />
                <AboutCTA />
            </div>
        </div>
    );
};

export default AboutPage;
