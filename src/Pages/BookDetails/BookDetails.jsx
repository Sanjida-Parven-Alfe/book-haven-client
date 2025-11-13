import React from "react";
import { useLocation } from "react-router-dom";

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state || {};

  if (!book) return <p className="text-center mt-10">No book details available.</p>;

  return (
    <div className="px-20 pb-20 mt-10">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-lg p-8">
        <img src={book.image} alt={book.title} className="w-full md:w-64 h-auto rounded-lg" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="text-lg mb-1"><strong>Category:</strong> {book.category}</p>
          <p className="text-lg mb-1"><strong>Price:</strong> ${book.price}</p>
          <p className="mt-4 text-md">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
