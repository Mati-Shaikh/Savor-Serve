import React, { useState } from 'react';
import { List, BarChart2, ArrowUpDown } from 'lucide-react';

const categories = ['Linked Lists', 'Queues', 'Stacks'];

const courses = {
  'Linked Lists': [
    { icon: <List size={20} />, name: 'Insertion in a Linked List' },
    { icon: <List size={20} />, name: 'Traversal in a Linked List' },
    { icon: <List size={20} />, name: 'Deletion in a Linked List' },
    { icon: <List size={20} />, name: 'Sorting a Linked List' },
    { icon: <List size={20} />, name: 'Reversing a Linked List' },
  ],
  'Queues': [
    { icon: <BarChart2 size={20} />, name: 'Queue Basics' },
    { icon: <BarChart2 size={20} />, name: 'Implementing a Queue' },
    { icon: <BarChart2 size={20} />, name: 'Circular Queues' },
    { icon: <BarChart2 size={20} />, name: 'Priority Queues' },
    { icon: <BarChart2 size={20} />, name: 'Queue Applications' },
  ],
  'Stacks': [
    { icon: <ArrowUpDown size={20} />, name: 'Stack Fundamentals' },
    { icon: <ArrowUpDown size={20} />, name: 'Implementing a Stack' },
    { icon: <ArrowUpDown size={20} />, name: 'Stack Operations' },
    { icon: <ArrowUpDown size={20} />, name: 'Balancing Parentheses' },
    { icon: <ArrowUpDown size={20} />, name: 'Reverse Polish Notation' },
  ],
};

const questions = {
  'Linked Lists': [
    {
      question: "In a singly linked list, each node contains:",
      options: ["Data only", "Data and two pointers", "Data and a pointer to the next node", "Data and a pointer to the previous node"],
      correct: "Data and a pointer to the next node",
    },
  ],
  'Queues': [
    {
      question: "Which principle does a queue follow?",
      options: ["LIFO", "FIFO", "LILO", "FILO"],
      correct: "FIFO",
    },
  ],
  'Stacks': [
    {
      question: "What operation is used to add an element to the top of a stack?",
      options: ["Push", "Pop", "Peek", "Insert"],
      correct: "Push",
    },
  ],
};

const SubTopics = () => {
  const [selectedCategory, setSelectedCategory] = useState('Linked Lists');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const currentQuestion = questions[selectedCategory][0];
    if (userAnswer === currentQuestion.correct) {
      setFeedback("Correct! You've got it!");
    } else if (userAnswer === '') {
      setFeedback("Please select an answer.");
    } else {
      setFeedback("Hard luck. Try again!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Master Data Structures with Structify</h2>

      <div className="flex justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            onClick={() => {
              setSelectedCategory(category);
              setFeedback('');
              setUserAnswer('');
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex">
        <div className="w-1/3 pr-8">
          <h3 className="text-xl font-bold mb-4">Topics in {selectedCategory}</h3>
          <ul>
            {courses[selectedCategory]?.map((course, index) => (
              <li key={index} className="flex items-center mb-4">
                <span className="mr-2">{course.icon}</span>
                <span>{course.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-black text-white px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm">{selectedCategory.toUpperCase()} CHALLENGE</span>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-2xl font-bold mb-4">Quick Quiz</h3>
              <p className="mb-4">{questions[selectedCategory][0].question}</p>
              <div className="space-y-2 mt-4">
                {questions[selectedCategory][0].options.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={option}
                      name="answer"
                      value={option}
                      checked={userAnswer === option}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {feedback && (
                <p className={`mt-4 ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
                  {feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTopics;