import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to add a book.");

    const bookData = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
    };

    try {
      const res = await fetch("http://localhost:3000/Books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        toast.success("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          genre: "",
          rating: "",
          summary: "",
          coverImage: "",
        });
      } else {
        toast.error("Failed to add book.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 pb-10 pt-6 md:pt-10 flex flex-col justify-center items-center bg-base-100 text-base-content">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl sm:text-3xl md:text-3xl text-center font-bold mb-6">
        Add a New Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg bg-base-200 p-4 sm:p-6 md:p-8 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={formData.coverImage}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary mt-2 w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
