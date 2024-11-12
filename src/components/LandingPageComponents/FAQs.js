import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: "What is Structify?",
      answer: "Structify is an intelligent tutoring system designed to help users learn data structures in a gamified learning environment. It covers major data structures topics such as linked lists, queues, and stacks."
    },
    {
      question: "How does the learning process work on Structify?",
      answer: "Structify adapts to each user's learning pace and style and uses interactive lessons, quizzes, and coding challenges to teach data structures. Users progress through different levels, earning points and badges as they master each concept."
    },
    {
      question: "Is Structify suitable for beginners?",
      answer: "Yes, Structify is designed for learners of all levels. It starts with the basics of each data structure and gradually increases in complexity. Beginners can start from scratch, while more advanced users can jump to more challenging topics."
    },
    {
      question: "Can I track my progress on Structify?",
      answer: "Absolutely! Structify provides a personalized dashboard where you can see your progress, completed lessons, earned badges, and overall performance."
    }
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 10 C 30 0, 70 0, 100 10 L 100 0 L 0 0 Z" fill="#3b82f6" />
      </svg>
      {/* <svg className="absolute bottom-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 0 C 30 10, 70 10, 100 0 L 100 10 L 0 10 Z" fill="#3b82f6" />
      </svg> */}
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <details key={index} className="mb-4 border-b pb-4">
            <summary className="font-semibold text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQs;