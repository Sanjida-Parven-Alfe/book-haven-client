import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const BookCard = ({ book }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col h-full group">
      <figure className="relative overflow-hidden h-64">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 badge badge-secondary font-bold">{book.genre}</div>
      </figure>
      
      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <h2 className="card-title text-lg line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h2>
           <div className="flex items-center text-orange-400 gap-1 shrink-0">
             <FaStar /> <span className="text-sm font-bold text-base-content">{book.rating}</span>
           </div>
        </div>
        
        <p className="text-sm text-base-content/60 mb-4 italic">By {book.author}</p>
        <p className="text-sm text-base-content/70 line-clamp-2 mb-6">{book.summary}</p>
        
        <div className="mt-auto">
          <Link
            to={`/book-details/${book._id}`}
            className="btn btn-primary btn-outline btn-sm w-full rounded-lg hover:btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;