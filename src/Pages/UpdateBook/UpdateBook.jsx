import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch book data by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("❌ Failed to fetch book details!");
        setLoading(false);
      });
  }, [id]);

  // Handle Update Form Submission
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/Books/${id}`, book)
      .then(() => {
        toast.success("📚 Book updated successfully!");
        setTimeout(() => navigate("/my-books"), 1200);
      })
      .catch(() => toast.error("❌ Failed to update book!"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10 bg-base-100 text-base-content min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center mb-6">Update Book</h1>

      <form
        onSubmit={handleUpdate}
        className="max-w-lg mx-auto bg-base-200 p-8 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={book.genre}
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          placeholder="Rating"
          value={book.rating}
          onChange={(e) => setBook({ ...book, rating: e.target.value })}
          className="input input-bordered w-full"
          required
        />

        <textarea
          placeholder="Summary"
          value={book.summary}
          onChange={(e) => setBook({ ...book, summary: e.target.value })}
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>

        <input
          type="text"
          placeholder="Cover Image URL"
          value={book.coverImage}
          onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
          className="input input-bordered w-full"
        />

        {book.coverImage && (
          <img
            src={book.coverImage}
            alt="Book Cover"
            className="w-32 h-40 object-cover my-2 border rounded"
          />
        )}

        <button
          type="submit"
          className="btn btn-success w-full"
        >
          ✅ Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
