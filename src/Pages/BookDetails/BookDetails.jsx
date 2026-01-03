import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase.config";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import axios from "axios";
import BookCard from "../../components/BookCard";

const serverURL = "https://book-haven-server-199.vercel.app";

const BookDetails = () => {
  const book = useLoaderData();
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allComments = snapshot.docs
        .filter(doc => doc.data().bookId === book._id)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(allComments);
    });

    return () => unsubscribe();
  }, [book._id]);

  useEffect(() => {
    axios.get(`${serverURL}/Books`)
      .then(res => {
        const filtered = res.data.filter(b => b.genre === book.genre && b._id !== book._id);
        setRelatedBooks(filtered.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, [book.genre, book._id]);

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
    <div className="bg-base-100 min-h-screen pb-20">
      <div className="bg-base-200 py-10 mb-10">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>
            <div className="flex-1">
              <div className="badge badge-primary mb-4">{book.genre}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{book.title}</h1>
              <p className="text-xl text-base-content/70 mb-6">By <span className="font-semibold text-primary">{book.author}</span></p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="rating rating-md">
                   {[...Array(5)].map((_, i) => (
                     <input key={i} type="radio" className={`mask mask-star-2 ${i < Math.floor(book.rating) ? "bg-orange-400" : "bg-gray-300"}`} readOnly />
                   ))}
                </div>
                <span className="font-bold text-lg">{book.rating} / 5.0</span>
              </div>

              <div className="bg-base-100 p-6 rounded-2xl border border-base-300 mb-8">
                <h3 className="font-bold text-lg mb-2">Book Summary</h3>
                <p className="leading-relaxed text-base-content/80">{book.summary}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                 <button className="btn btn-primary px-8">Read Sample</button>
                 <button className="btn btn-outline">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Reader Reviews ({comments.length})</h2>
            
            {user ? (
              <form onSubmit={handleAddComment} className="mb-10 bg-base-200 p-6 rounded-2xl">
                <div className="flex gap-4 items-start">
                  <img src={user.photoURL} className="w-12 h-12 rounded-full" alt="user" />
                  <div className="flex-1">
                    <textarea 
                      className="textarea textarea-bordered w-full h-24 mb-3 focus:outline-none" 
                      placeholder="Write your thoughts about this book..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit" className="btn btn-primary px-10">Post Review</button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="alert shadow-lg mb-10">
                <div>
                  <h3 className="font-bold">Login to write a review!</h3>
                  <div className="text-xs">Share your experience with other readers.</div>
                </div>
                <div className="flex-none">
                  <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-center py-10 text-base-content/50">No reviews yet. Be the first one!</p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="flex gap-4 p-6 bg-base-100 border border-base-200 rounded-2xl">
                    <img src={c.userPhoto || "https://i.pravatar.cc/100"} className="w-12 h-12 rounded-full shrink-0" alt="" />
                    <div>
                      <h4 className="font-bold">{c.userName}</h4>
                      <p className="text-xs text-base-content/50 mb-3">{new Date(c.createdAt?.toDate()).toLocaleDateString()}</p>
                      <p className="text-base-content/80">{c.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Related Books</h2>
            <div className="space-y-6">
              {relatedBooks.length > 0 ? (
                relatedBooks.map(rb => (
                  <Link to={`/book-details/${rb._id}`} key={rb._id} className="flex gap-4 group">
                    <img src={rb.coverImage} className="w-20 h-28 object-cover rounded-lg shadow-md group-hover:scale-105 transition" alt="" />
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold group-hover:text-primary transition line-clamp-1">{rb.title}</h4>
                      <p className="text-sm text-base-content/60">{rb.author}</p>
                      <div className="text-orange-400 text-sm mt-1">★ {rb.rating}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-base-content/50">No similar books found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;