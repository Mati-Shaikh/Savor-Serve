import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:space-x-10">
                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-gray-900">Savor & Serve</h1>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        {open ? <XIcon className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />}
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="md:hidden">
                                        <nav className="space-y-1">
                                            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Home</a>
                                            <Disclosure as="div" className="space-y-1">
                                                <Disclosure.Button className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                                                    Campaigns
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="pl-5">
                                                    <a href="/campaigns/1" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 1</a>
                                                    <a href="/campaigns/2" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 2</a>
                                                </Disclosure.Panel>
                                            </Disclosure>
                                            <Disclosure as="div" className="space-y-1">
                                                <Disclosure.Button className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                                                    Roles
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="pl-5">
                                                    <a href="/roles/1" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 1</a>
                                                    <a href="/roles/2" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 2</a>
                                                </Disclosure.Panel>
                                            </Disclosure>
                                            <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">About Us</a>
                                            <a href="/faqs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">FAQs</a>
                                            <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Contact Us</a>
                                            <div className="flex gap-3 mt-4">
                                                <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Log in</a>
                                                <a href="/signup" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Signup</a>
                                            </div>
                                        </nav>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex flex-1 justify-center space-x-8">
                        <a href="/" className="text-base font-medium text-gray-700 hover:text-gray-900">Home</a>
                        <div className="relative group">
                            <button className="text-base font-medium text-gray-700 hover:text-gray-900">Campaigns</button>
                            <div className="absolute left-0 hidden mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 group-hover:block">
                                <a href="/campaigns/1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 1</a>
                                <a href="/campaigns/2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 2</a>
                            </div>
                        </div>
                        <div className="relative group">
                            <button className="text-base font-medium text-gray-700 hover:text-gray-900">Roles</button>
                            <div className="absolute left-0 hidden mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 group-hover:block">
                                <a href="/roles/1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 1</a>
                                <a href="/roles/2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Submenu 2</a>
                            </div>
                        </div>
                        <a href="/about" className="text-base font-medium text-gray-700 hover:text-gray-900">About Us</a>
                        <a href="/faqs" className="text-base font-medium text-gray-700 hover:text-gray-900">FAQs</a>
                        <a href="/contact" className="text-base font-medium text-gray-700 hover:text-gray-900">Contact Us</a>
                    </nav>

                    {/* Action buttons */}
                    <div className="hidden md:flex gap-3 ml-auto">
                        <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Log in</a>
                        <a href="/signup" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Signup</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
