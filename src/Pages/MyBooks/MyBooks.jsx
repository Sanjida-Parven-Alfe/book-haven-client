import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyBooks = () => {
  const [user] = useAuthState(auth);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user's books
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-books/${user.email}`)
        .then((res) => {
          setMyBooks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching books:", err);
          toast.error("❌ Failed to load your books!");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  // ✅ Handle Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/Books/${id}`)
      .then(() => {
        setMyBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        toast.success("🗑️ Book deleted successfully!");
      })
      .catch(() => toast.error("❌ Failed to delete book!"));
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-black">
        Loading your books...
      </div>
    );
  }

  return (
    <div className="p-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        📚 My Books
      </h1>

      {myBooks.length === 0 ? (
        <p className="text-center text-black mt-10">
          You haven’t added any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-green-100 text-black">
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Genre</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book) => (
                <tr
                  key={book._id}
                  className="text-center text-black hover:bg-gray-50 transition duration-150"
                >
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.genre}</td>
                  <td className="border p-2">{book.rating}</td>
                  <td className="border p-2">
                    <Link
                      to={`/update-book/${book._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
