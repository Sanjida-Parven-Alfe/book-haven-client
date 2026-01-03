import React from 'react';

const Loading = () => {
    return (
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-4 w-full">
                    <div className="skeleton h-64 w-full rounded-xl"></div>
                    <div className="skeleton h-6 w-3/4"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                    <div className="skeleton h-10 w-full mt-2"></div>
                </div>
            ))}
        </div>
    );
};

export default Loading;