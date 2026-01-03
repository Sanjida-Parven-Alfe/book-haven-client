import React from 'react';
import { FaHistory, FaUsers, FaLightbulb } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="bg-base-100 text-base-content pb-20">
            <div className="bg-primary/10 py-20 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">Our Story</h1>
                <p className="text-xl opacity-70 max-w-2xl mx-auto">Connecting book lovers and building a digital haven for literature since 2025.</p>
            </div>

            <div className="container mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="card bg-base-200 p-8 text-center shadow-lg border-b-4 border-primary">
                        <FaHistory className="text-5xl mx-auto mb-6 text-primary" />
                        <h3 className="text-2xl font-bold mb-4">Our History</h3>
                        <p className="opacity-70">Started as a small project, Book Haven has grown into a community of thousands of passionate readers.</p>
                    </div>
                    <div className="card bg-base-200 p-8 text-center shadow-lg border-b-4 border-secondary">
                        <FaUsers className="text-5xl mx-auto mb-6 text-secondary" />
                        <h3 className="text-2xl font-bold mb-4">Our Community</h3>
                        <p className="opacity-70">We believe in the power of sharing knowledge. Our users contribute to a global library available to everyone.</p>
                    </div>
                    <div className="card bg-base-200 p-8 text-center shadow-lg border-b-4 border-accent">
                        <FaLightbulb className="text-5xl mx-auto mb-6 text-accent" />
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="opacity-70">To make every book in the world accessible to anyone, anywhere, with just a single click.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;