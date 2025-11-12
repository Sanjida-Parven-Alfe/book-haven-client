import { useLoaderData } from "react-router";
import BookCard from "../../components/BookCard";
import { div } from "framer-motion/client";



const AllBooks = () => {
  const data = useLoaderData();
  console.log(data);


  return (
    
    <div className=" px-20">
        <p className="text-center font-bold text-4xl my-10 text-black border-b-2 pb-2">All Books</p>

      <div  className="grid grid-cols-3 lg:grid-cols-4 gap-10 ">
        {data.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
