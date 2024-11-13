import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-4">
                        <h3 className="font-bold mb-2">Savor and Serve</h3>
                        <div className="flex space-x-4 mt-4">
                            <Facebook size={20} />
                            <Instagram size={20} />
                            <Twitter size={20} />
                            <Linkedin size={20} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 mb-4">
                        <h4 className="font-bold mb-2">Donation</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-300">NGO</a></li>
                            <li><a href="/" className="hover:text-gray-300">Help</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-4">
                        <h4 className="font-bold mb-2">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-300">About us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-sm">
                <p>© 2024 Savor & Serve, Inc. Savor and Serve and the savor-serve logo are trademarks of EventServe, Inc.</p>
                    <div className="mt-2">
                        <a href="/" className="hover:text-gray-300 mr-4">Terms of service</a>
                        <a href="/" className="hover:text-gray-300 mr-4">Privacy policy</a>
                        <a href="/" className="hover:text-gray-300">California privacy policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;