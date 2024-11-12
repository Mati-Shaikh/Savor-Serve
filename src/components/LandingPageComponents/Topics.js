import React from "react";
import { Book, BarChart2, Code } from "lucide-react";

const Topics = () => {
  return (
    <div className="flex flex-wrap justify-between text-center pl-16 pr-16">
      <div className="w-1/2 md:w-1/5 mb-4">
        <Code className="mx-auto mb-2" />
        <p>Linked Lists</p>
      </div>
      <div className="w-1/2 md:w-1/5 mb-4">
        <Book className="mx-auto mb-2" />
        <p>Stacks</p>
      </div>
      <div className="w-1/2 md:w-1/5 mb-4">
        <BarChart2 className="mx-auto mb-2" />
        <p>Queues</p>
      </div>
    </div>
  );
};

export default Topics;
