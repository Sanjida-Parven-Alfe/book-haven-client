// ScrollStats.jsx
import React from "react";

const stats = [
  { value: "15,254", label: "total books" },
  { value: "1,258", label: "authors" },
  { value: "20,898", label: "books sold" },
  { value: "97%", label: "happy customers" },
];

const ScrollStats = () => {
  return (
    <div className=" overflow-hidden bg-amber-100 py-4">
      <div className="flex animate-scroll gap-10 whitespace-nowrap">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex gap-2 items-center px-6">
            <span className="text-2xl font-bold text-indigo-600">
              {stat.value}
            </span>
            <span className="text-sm text-gray-700">{stat.label}</span>

            <span className="pl-20"> 
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14"><g fill="none"><path fill="#d7e0ff" fillRule="evenodd" d="M12.09 3.85a2.55 2.55 0 0 1-.37 4.71a3 3 0 0 1-.71.12a3 3 0 0 1 .5.51a2.54 2.54 0 0 1-.57 3.57a2.59 2.59 0 0 1-3.6-.56a2.5 2.5 0 0 1-.34-.64a2.5 2.5 0 0 1-.33.64a2.59 2.59 0 0 1-4.283-.17A2.54 2.54 0 0 1 2.5 9.19a3 3 0 0 1 .5-.51a3 3 0 0 1-.72-.12a2.561 2.561 0 1 1 1.59-4.87a2.3 2.3 0 0 1 .65.31a2.58 2.58 0 1 1 4.96 0a2.3 2.3 0 0 1 .65-.3a2.57 2.57 0 0 1 1.96.15M8.5 7.26c0 .823-.672 1.49-1.5 1.49s-1.5-.667-1.5-1.49s.672-1.49 1.5-1.49s1.5.667 1.5 1.49" clipRule="evenodd"></path><path fill="#fff" d="M7 8.75c.828 0 1.5-.667 1.5-1.49S7.828 5.77 7 5.77s-1.5.667-1.5 1.49s.672 1.49 1.5 1.49"></path><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M7 8.75c.828 0 1.5-.667 1.5-1.49S7.828 5.77 7 5.77s-1.5.667-1.5 1.49s.672 1.49 1.5 1.49" strokeWidth={1}></path><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M13.37 5.34a2.57 2.57 0 0 0-3.24-1.64a2.3 2.3 0 0 0-.65.3a2.58 2.58 0 1 0-4.96 0a2.3 2.3 0 0 0-.65-.31a2.561 2.561 0 1 0-1.59 4.87a3 3 0 0 0 .72.12a3 3 0 0 0-.5.51a2.54 2.54 0 0 0 .57 3.57a2.59 2.59 0 0 0 3.6-.56a2.5 2.5 0 0 0 .33-.64q.123.345.34.64a2.59 2.59 0 0 0 4.283-.17a2.54 2.54 0 0 0-.113-2.84a3 3 0 0 0-.5-.51a3 3 0 0 0 .71-.12a2.55 2.55 0 0 0 1.65-3.22" strokeWidth={1}></path></g></svg> 
            </span>
          </div>
        ))}

        {/* Duplicate for continuous scrolling */}
        {stats.map((stat, idx) => (
          <div key={`dup-${idx}`} className="flex gap-2 items-center px-6">
            <span className="text-2xl font-bold text-indigo-600">
              {stat.value}
            </span>
            <span className="text-sm text-gray-700">{stat.label}</span>
            <span className="pl-20"> 
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14"><g fill="none"><path fill="#d7e0ff" fillRule="evenodd" d="M12.09 3.85a2.55 2.55 0 0 1-.37 4.71a3 3 0 0 1-.71.12a3 3 0 0 1 .5.51a2.54 2.54 0 0 1-.57 3.57a2.59 2.59 0 0 1-3.6-.56a2.5 2.5 0 0 1-.34-.64a2.5 2.5 0 0 1-.33.64a2.59 2.59 0 0 1-4.283-.17A2.54 2.54 0 0 1 2.5 9.19a3 3 0 0 1 .5-.51a3 3 0 0 1-.72-.12a2.561 2.561 0 1 1 1.59-4.87a2.3 2.3 0 0 1 .65.31a2.58 2.58 0 1 1 4.96 0a2.3 2.3 0 0 1 .65-.3a2.57 2.57 0 0 1 1.96.15M8.5 7.26c0 .823-.672 1.49-1.5 1.49s-1.5-.667-1.5-1.49s.672-1.49 1.5-1.49s1.5.667 1.5 1.49" clipRule="evenodd"></path><path fill="#fff" d="M7 8.75c.828 0 1.5-.667 1.5-1.49S7.828 5.77 7 5.77s-1.5.667-1.5 1.49s.672 1.49 1.5 1.49"></path><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M7 8.75c.828 0 1.5-.667 1.5-1.49S7.828 5.77 7 5.77s-1.5.667-1.5 1.49s.672 1.49 1.5 1.49" strokeWidth={1}></path><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M13.37 5.34a2.57 2.57 0 0 0-3.24-1.64a2.3 2.3 0 0 0-.65.3a2.58 2.58 0 1 0-4.96 0a2.3 2.3 0 0 0-.65-.31a2.561 2.561 0 1 0-1.59 4.87a3 3 0 0 0 .72.12a3 3 0 0 0-.5.51a2.54 2.54 0 0 0 .57 3.57a2.59 2.59 0 0 0 3.6-.56a2.5 2.5 0 0 0 .33-.64q.123.345.34.64a2.59 2.59 0 0 0 4.283-.17a2.54 2.54 0 0 0-.113-2.84a3 3 0 0 0-.5-.51a3 3 0 0 0 .71-.12a2.55 2.55 0 0 0 1.65-3.22" strokeWidth={1}></path></g></svg> 
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ScrollStats;
