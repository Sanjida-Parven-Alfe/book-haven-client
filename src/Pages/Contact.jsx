import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon.");
        e.target.reset();
    };

    return (
        <div className="bg-base-100 min-h-screen pb-20">
            <Toaster />
            {/* Header Section */}
            <div className="bg-base-200 py-16 px-6 text-center mb-12 border-b border-base-300">
                <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
                <p className="opacity-60">Have questions? We'd love to hear from you.</p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-lg opacity-70">
                                Fill out the form and our team will try to get back to you within 24 hours.
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-5 p-5 bg-base-200 rounded-2xl border border-base-300 hover:border-primary transition-colors">
                                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Phone</p>
                                    <p className="opacity-70 text-base">+880 123 456 789</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-5 bg-base-200 rounded-2xl border border-base-300 hover:border-secondary transition-colors">
                                <div className="w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Email</p>
                                    <p className="opacity-70 text-base">support@bookhaven.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-5 bg-base-200 rounded-2xl border border-base-300 hover:border-accent transition-colors">
                                <div className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Office</p>
                                    <p className="opacity-70 text-base">Banani, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="card bg-base-200 shadow-xl border border-base-300 p-8 md:p-10 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Your Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your name" 
                                        className="input input-bordered bg-base-100 focus:input-primary w-full transition-all" 
                                        required 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email Address</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        placeholder="email@example.com" 
                                        className="input input-bordered bg-base-100 focus:input-primary w-full transition-all" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Subject</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="How can we help?" 
                                    className="input input-bordered bg-base-100 focus:input-primary w-full transition-all" 
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Message</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered bg-base-100 h-36 focus:outline-none focus:ring-2 focus:ring-primary w-full transition-all text-base" 
                                    placeholder="Type your message here..." 
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4 text-lg gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                                <FaPaperPlane className="text-sm" /> Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;