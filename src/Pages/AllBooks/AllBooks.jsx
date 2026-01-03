import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import BookCard from "../../components/BookCard";
import Loading from "../../Pages/Loading/Loading";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const AllBooks = () => {
  const allBooks = useLoaderData(); 
  const navigation = useNavigation();
  
  
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    if (allBooks) {
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
    }
  }, [allBooks, searchQuery, selectedGenre, sortOrder]);

  
  const uniqueGenres = [...new Set(allBooks.map(book => book.genre))];


  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      
      
      <div className="bg-base-200 py-10 px-6 text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Browse Our Collection</h1>
        <p className="text-base-content/60">Find your next favorite read from our extensive library.</p>
      </div>

   
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
          
     
          <div className="relative w-full lg:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by book title..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

     
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            
         
            <div className="relative w-full sm:w-48">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                 <FaFilter />
               </div>
               <select
                className="select select-bordered w-full pl-10"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {uniqueGenres.map((genre, idx) => (
                  <option key={idx} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

         
            <div className="relative w-full sm:w-48">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                 <FaSortAmountDown />
               </div>
               <select
                className="select select-bordered w-full pl-10"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by Rating</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>

     
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("");
                setSortOrder("");
              }}
              className="btn btn-ghost text-red-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

   
      <div className="container mx-auto px-6">
        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No Data" className="w-24 h-24 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-400">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      
      {books.length > itemsPerPage && (
        <div className="flex justify-center mt-16">
          <div className="join">
            <button 
              className="join-item btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            
         
            {[...Array(totalPages)].map((_, index) => (
               <button
                 key={index}
                 className={`join-item btn ${currentPage === index + 1 ? "btn-active btn-primary" : ""}`}
                 onClick={() => handlePageChange(index + 1)}
               >
                 {index + 1}
               </button>
            ))}

            <button 
              className="join-item btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;