import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BookCard from "../../components/BookCard";
import Loading from "../../Pages/Loading/Loading";
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const allBooks = useLoaderData() || [];
  const navigation = useNavigation();
  
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    let filtered = [...allBooks];

    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setBooks(filtered);
    setCurrentPage(1);
  }, [allBooks, searchQuery, selectedGenre, sortOrder]);

  const uniqueGenres = [...new Set(allBooks.map(book => book.genre))];

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  if (navigation.state === "loading") return <Loading />;

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      <div className="bg-primary/5 py-16 px-6 text-center border-b border-base-200">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Library</h1>
        <p className="text-base-content/60 max-w-xl mx-auto">Explore our vast collection of stories and knowledge from around the world.</p>
      </div>

      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by book title..."
              className="input input-bordered w-full pl-12 focus:input-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <select
              className="select select-bordered flex-1 lg:w-48"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {uniqueGenres.map((g, i) => <option key={i} value={g}>{g}</option>)}
            </select>

            <select
              className="select select-bordered flex-1 lg:w-48"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Rating</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentBooks.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-200 rounded-3xl">
            <h3 className="text-2xl font-bold opacity-30">No Books Found</h3>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-16">
          <div className="join">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${currentPage === i + 1 ? "btn-primary" : ""}`}
                onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;