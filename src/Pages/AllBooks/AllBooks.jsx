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
            // Inside your map for books
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
