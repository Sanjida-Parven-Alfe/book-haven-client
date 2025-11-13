import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase.config";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";

const BookDetails = () => {
  const book = useLoaderData();
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch comments in real-time
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allComments = snapshot.docs
        .filter(doc => doc.data().bookId === book._id)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(allComments);
    });

    return () => unsubscribe();
  }, [book._id]);

  // Handle adding a comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addDoc(collection(db, "comments"), {
      bookId: book._id,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      comment: comment,
      createdAt: new Date()
    });
    setComment("");
  };

  return (
    <div className="px-20 pb-20 pt-10 text-base-content bg-base-100 min-h-screen">
      {/* Book Details */}
      <div className="flex flex-col md:flex-row gap-10 bg-base-200 shadow-lg rounded-lg p-8">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-64 h-auto rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="text-lg mb-1"><strong>Genre:</strong> {book.genre}</p>
          <p className="text-lg mb-1"><strong>Rating:</strong> {book.rating}</p>
          <p className="mt-4 text-md">{book.summary}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Comment Form */}
        {user && (
          <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Add your comment"
              className="input input-bordered flex-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Post</button>
          </form>
        )}

        {/* Comments List */}
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="flex items-start gap-3 mb-4 bg-base-200 p-3 rounded-lg shadow-sm">
              <img
                src={c.userPhoto || "https://via.placeholder.com/40"}
                alt={c.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{c.userName}</p>
                <p>{c.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookDetails;
