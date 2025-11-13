import { Link, useLoaderData, useNavigation } from "react-router-dom";
import React, { useState, useMemo } from "react";
import BookCard from "../../components/BookCard";
import Loading from "../../Pages/Loading/Loading";

const AllBooks = () => {
  const data = useLoaderData();
  const navigation = useNavigation();

  const [sortOrder, setSortOrder] = useState(""); // "asc" বা "desc"

  // ✅ Sort optimization using useMemo
  const sortedBooks = useMemo(() => {
    if (!sortOrder) return data;
    return [...data].sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
  }, [data, sortOrder]);

  // Loader চলার সময় spinner দেখাবে
  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="px-20 pb-20">
      <p className="text-center font-bold text-4xl my-10 text-black border-b-2 pb-2">
        All Books
      </p>

      {/* ✅ Sort Dropdown */}
      <div className="flex items-center justify-end mb-10 gap-2">
        <label className="font-semibold text-black">Sort by Rating:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border text-black p-1 rounded"
        >
          <option value="">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-10">
        {sortedBooks.map((book) => (
          <BookCard key={book._id} book={book}>
            <Link
              to={`/book-details/${book._id}`}
              className="btn btn-primary mt-2"
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
