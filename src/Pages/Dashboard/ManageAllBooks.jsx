import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const serverURL = "https://book-haven-server-199.vercel.app";

const ManageAllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`${serverURL}/Books`)
            .then(res => setBooks(res.data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            axios.delete(`${serverURL}/Books/${id}`)
                .then(() => {
                    toast.success("Book deleted by Admin");
                    setBooks(books.filter(b => b._id !== id));
                });
        }
    };

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">Manage All Books (Admin)</h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>Title</th>
                        <th>Author</th>
                        <th>Uploader Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td className="font-bold">{book.title}</td>
                            <td>{book.author}</td>
                            <td className="text-sm opacity-70">{book.userEmail}</td>
                            <td className="flex gap-3">
                                <Link to={`/dashboard/update-book/${book._id}`} className="btn btn-ghost btn-xs text-info"><FaEdit /></Link>
                                <button onClick={() => handleDelete(book._id)} className="btn btn-ghost btn-xs text-error"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAllBooks;