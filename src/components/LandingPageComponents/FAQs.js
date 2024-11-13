import React, { useState } from 'react';

const FAQs = () => {
  const faqData = [
    {
      question: "What is Savor and Serve?",
      answer: "Savor and Serve is a charity hub designed to connect donors, needy individuals, shops, and NGOs. It provides a streamlined platform to manage donations, issue vouchers, and support various causes efficiently.",
    },
    {
      question: "How do I donate through Savor and Serve?",
      answer: "Simply sign up as a donor, browse through listed NGOs, shops, and campaigns, and select the causes you wish to support. You can also use flexible payment options, including digital vouchers, to make your donations.",
    },
    {
      question: "What options are available for NGOs on the platform?",
      answer: "NGOs can register on the platform, create and manage projects, and track donations. They can also suggest individuals in need and list packages donors can purchase to support specific causes.",
    },
    {
      question: "Can I track the impact of my donations?",
      answer: "Yes, Savor and Serve provides a dashboard where you can view detailed tracking of your contributions, including where the funds go and the impact they create.",
    },
    {
      question: "What is the Voucher Redemption System for Suppliers?",
      answer: "Registered suppliers can redeem vouchers issued to needy individuals by entering a unique tracking ID. This system ensures vouchers are used correctly and provides a confirmation of redemption.",
    },
    {
      question: "How does the platform handle needy individuals?",
      answer: "Needy individuals can be suggested by NGOs, and upon verification, they are added to the platform. Vouchers can then be issued to these individuals, allowing them to access support from registered shops.",
    },
    {
      question: "How do I become a volunteer?",
      answer: "To become a volunteer, please email us at info@myimpactmeter.com with the title 'Volunteer,' and we will send you the volunteer pack with all necessary information.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md cursor-pointer transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <span className={`transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : "rotate-0"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              {activeIndex === index && (
                <div className="mt-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
