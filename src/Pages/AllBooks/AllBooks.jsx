import { Link, useLoaderData } from "react-router-dom";
import BookCard from "../../components/BookCard";

const AllBooks = () => {
  const data = useLoaderData();

  return (
    <div className="px-20 pb-20">
      <p className="text-center font-bold text-4xl my-10 text-black border-b-2 pb-2">
        All Books
      </p>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-10">
        {data.map((book) => (
          <BookCard key={book._id} book={book}>
            <Link
              to="/book-details"
              state={{ book }}
              className="mt-3 inline-block text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
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
