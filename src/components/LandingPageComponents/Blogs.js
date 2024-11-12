import React from 'react';


const BlogsAndArticles = () => {

  return (
    <div className="relative py-16 overflow-hidden">
      {/* <svg className="absolute top-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 10 C 30 0, 70 0, 100 10 L 100 0 L 0 0 Z" fill="#3b82f6" />
      </svg> */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
        <h1 className="text-5xl font-bold">Unlock the next level in</h1>  
        <h1 className="text-5xl font-bold mb-10">learning data structures!</h1>  

          <button className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 0 C 30 10, 70 10, 100 0 L 100 10 L 0 10 Z" fill="#000" />
      </svg>
    </div>
  );
};

export default BlogsAndArticles;