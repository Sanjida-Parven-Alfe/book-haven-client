import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const serverURL = "https://book-haven-server-199.vercel.app";

const DashboardHome = () => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalBooks: 0, myBooks: 0, uniqueAuthors: 0 });
    const [chartData, setChartData] = useState([]);
    const [recentBooks, setRecentBooks] = useState([]);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

    useEffect(() => {
        if (user?.email) {
            axios.get(`${serverURL}/Books`)
                .then(res => {
                    const allBooks = res.data;
                    const userBooks = allBooks.filter(b => b.userEmail === user.email);
                    
                    setStats({
                        totalBooks: allBooks.length,
                        myBooks: userBooks.length,
                        uniqueAuthors: new Set(allBooks.map(b => b.author)).size
                    });

                    const genreCounts = {};
                    allBooks.forEach(b => genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1);
                    setChartData(Object.keys(genreCounts).map(k => ({ name: k, count: genreCounts[k] })).slice(0, 8));
                    
                    // Requirement 7: Latest 5 books for dynamic data table
                    setRecentBooks(userBooks.slice(-5).reverse());
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <Loading />;

    return (
        <div className="w-full px-4 md:px-8 py-8 space-y-10">
            <h1 className="text-3xl font-bold">Hi, {user?.displayName}! 👋</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow-md rounded-2xl border-l-4 border-primary">
                    <div className="stat-title">Total Books</div>
                    <div className="stat-value text-primary">{stats.totalBooks}</div>
                </div>
                <div className="stat bg-base-100 shadow-md rounded-2xl border-l-4 border-secondary">
                    <div className="stat-title">My Books</div>
                    <div className="stat-value text-secondary">{stats.myBooks}</div>
                </div>
                <div className="stat bg-base-100 shadow-md rounded-2xl border-l-4 border-accent">
                    <div className="stat-title">Authors</div>
                    <div className="stat-value text-accent">{stats.uniqueAuthors}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200">
                    <h2 className="text-xl font-bold mb-6">Genre Distribution</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" hide />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {chartData.map((e, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Requirement 7: Dynamic Data Table */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-6">Recently Added By You</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBooks.map((b) => (
                                <tr key={b._id} className="hover">
                                    <td className="font-bold">{b.title}</td>
                                    <td><span className="badge badge-ghost">{b.genre}</span></td>
                                    <td className="text-orange-500">★ {b.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {recentBooks.length === 0 && <p className="text-center py-4 opacity-50">No books added yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;