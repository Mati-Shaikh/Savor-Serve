import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Footer from '../LandingPageComponents/Footer';
import { FaUser, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DonorDashboard from '../DonorDashboard/donorDasboard';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black font-bold text-3xl">Savor & Serve</div>
                <div className="hidden md:flex space-x-8">
                    <a href="/home" className="text-black font-bold text-xl flex items-center">
                        <FaHome className="mr-2" /> Home
                    </a>
                    <a href="/donatetongo" className="text-black font-bold text-xl flex items-center">
                        NGOs
                    </a>
                    <a href="/donatetoSupplier" className="text-black font-bold text-xl flex items-center">
                        GroceryShop
                    </a>
                    <a href="/voucherCreation" className="text-black font-bold text-xl flex items-center">
                        VoucherManagement
                    </a>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-black p-2 rounded hover:bg-gray-100 transition"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <a
                                href="/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaUser className="mr-2" /> Account
                            </a>
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const Card = ({ title, description, topics, logoSrc }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-80 h-96 [perspective:1000px] group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front of the card */}
                <div className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden] bg-gradient-to-br from-white to-gray-100">
                    <div className="h-1/2 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
                        <img src={logoSrc} alt={`${title} logo`} className="w-24 h-24 object-contain" />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 text-blue-500 group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={24} />
                    </div>
                </div>
                
                {/* Back of the card */}
                <div className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="p-6 h-full flex flex-col">
                        <div className="mb-6">
                            <h4 className="text-xl font-bold text-gray-800 text-center relative">
                                <span className="relative z-10">{title} Subtopics</span>
                                <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200 -skew-x-12 transform -rotate-2 z-0"></span>
                            </h4>
                        </div>
                        <div className="flex-grow flex flex-col justify-center space-y-4">
                            {topics.map((topic, index) => (
                                <a 
                                    key={index}
                                    href={index === 0 ? "/game" : "/"} 
                                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-blue-500 font-semibold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700 font-medium">{topic}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Welcome {localStorage.getItem("userFullName")}</h1>
                <div className="flex flex-wrap justify-center gap-8">
                 
                
                </div>
                <DonorDashboard/>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;