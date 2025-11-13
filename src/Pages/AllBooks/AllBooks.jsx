import { Link, useLoaderData, useNavigation } from "react-router-dom";
import React, { useState, useMemo } from "react";
import BookCard from "../../components/BookCard";
import Loading from "../../Pages/Loading/Loading";

const AllBooks = () => {
  const data = useLoaderData();
  const navigation = useNavigation();

  const [sortOrder, setSortOrder] = useState(""); 

  const sortedBooks = useMemo(() => {
    if (!sortOrder) return data;
    return [...data].sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
  }, [data, sortOrder]);

  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-10 md:px-20 pb-10 md:pb-20 bg-base-100 text-base-content min-h-screen">
      <p className="text-center font-bold text-3xl sm:text-4xl py-6 sm:py-10 border-b-2 pb-2">
        All Books
      </p>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-end my-6 md:my-10 gap-2">
        <label className="font-semibold mb-2 md:mb-0">Sort by Rating:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-1 rounded bg-base-200 text-base-content"
        >
          <option value="">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {sortedBooks.map((book) => (
          <BookCard key={book._id} book={book}>
            <Link
              to={`/book-details/${book._id}`}
              className="btn btn-primary mt-2 w-full text-center"
            >
              View Details
            </Link>
          </BookCard>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
