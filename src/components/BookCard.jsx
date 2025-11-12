import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="book-card bg-white rounded shadow p-4 flex flex-col"
    >
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-64 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
      <p className="text-black mb-2">Author: {book.author}</p>
      <p className="text-black mb-2">Genre: {book.genre}</p>
      <p className="text-black mb-4">Rating: {book.rating} ⭐</p>
      <Link
        to={`/book-details/${book._id}`}
        className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition text-center"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default BookCard;
