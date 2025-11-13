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

  // Fetch user's books
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

  // Handle Delete
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading your books...
      </div>
    );
  }

  return (
    <div className="px-2 pt-4 md:p-10 bg-base-100 text-base-content min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-center">My Books</h1>

      {myBooks.length === 0 ? (
        <p className="text-center mt-10">You haven’t added any books yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-300 rounded-lg shadow">
            <thead className="bg-base-200">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Genre</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book) => (
                <tr key={book._id} className="text-center hover:bg-base-300 transition">
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.genre}</td>
                  <td className="border p-2">{book.rating}</td>
                  <td className="border p-2 flex justify-center flex-col md:flex-row gap-2">
                    <Link
                      to={`/update-book/${book._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-error"
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
