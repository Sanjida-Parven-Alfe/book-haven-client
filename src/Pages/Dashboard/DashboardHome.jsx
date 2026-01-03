import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import Loading from '../Loading/Loading';

const serverURL = "https://book-haven-server-199.vercel.app";

const DashboardHome = () => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalBooks: 0, myBooks: 0, uniqueAuthors: 0, totalUsers: 0 });
    const [chartData, setChartData] = useState([]);
    const [recentData, setRecentData] = useState([]);

    const isAdmin = user?.email === "admin@bookhaven.com";
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
                        uniqueAuthors: new Set(allBooks.map(b => b.author)).size,
                        totalUsers: 124 
                    });

                    const genreCounts = {};
                    allBooks.forEach(b => genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1);
                    setChartData(Object.keys(genreCounts).map(k => ({ name: k, count: genreCounts[k] })).slice(0, 6));
                    
                    setRecentData(isAdmin ? allBooks.slice(-6).reverse() : userBooks.slice(-5).reverse());
                    setLoading(false);
                });
        }
    }, [user, isAdmin]);

    if (loading) return <Loading />;

    return (
        <div className="w-full px-4 md:px-8 py-8 space-y-10">
            <div className="flex justify-between items-center bg-base-200 p-6 rounded-3xl border border-base-300">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">
                        {isAdmin ? "Admin Console" : `Welcome, ${user?.displayName?.split(' ')[0]}!`}
                    </h1>
                    <p className="opacity-50 text-sm font-bold uppercase mt-1 tracking-widest">
                        {isAdmin ? "System-wide Monitoring" : "Personal Library Overview"}
                    </p>
                </div>
                <span className={`badge ${isAdmin ? "badge-primary" : "badge-secondary"} badge-lg p-4 font-bold uppercase text-[10px]`}>
                    {isAdmin ? "Admin Access" : "Standard User"}
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                    <div className="stat-title uppercase text-[10px] font-black opacity-40">System Library</div>
                    <div className="stat-value text-primary text-4xl">{stats.totalBooks}</div>
                    <div className="stat-desc font-bold mt-1">Total books online</div>
                </div>
                <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                    <div className="stat-title uppercase text-[10px] font-black opacity-40">{isAdmin ? "Platform Users" : "Your Library"}</div>
                    <div className="stat-value text-secondary text-4xl">{isAdmin ? stats.totalUsers : stats.myBooks}</div>
                    <div className="stat-desc font-bold mt-1">{isAdmin ? "Registered accounts" : "Books uploaded by you"}</div>
                </div>
                <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                    <div className="stat-title uppercase text-[10px] font-black opacity-40">Total Authors</div>
                    <div className="stat-value text-accent text-4xl">{stats.uniqueAuthors}</div>
                    <div className="stat-desc font-bold mt-1">Across all categories</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-200">
                    <h2 className="text-lg font-black mb-8 border-b border-base-300 pb-4 uppercase tracking-tighter">Genre Analytics</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" fontSize={10} tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                                <YAxis allowDecimals={false} axisLine={false} tickLine={false} fontSize={10} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={35}>
                                    {chartData.map((e, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-200">
                    <h2 className="text-lg font-black mb-6 border-b border-base-300 pb-4 uppercase tracking-tighter">
                        {isAdmin ? "Recent Global Activity" : "My Latest Entries"}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-[10px] uppercase opacity-50 border-none">
                                    <th>Book Title</th>
                                    <th>Genre</th>
                                    {isAdmin && <th>Uploader</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {recentData.map((b) => (
                                    <tr key={b._id} className="border-base-200">
                                        <td className="font-bold text-xs truncate max-w-[150px]">{b.title}</td>
                                        <td><span className="badge badge-sm font-bold opacity-70">{b.genre}</span></td>
                                        {isAdmin && <td className="text-[10px] font-mono opacity-50">{b.userEmail?.split('@')[0]}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;