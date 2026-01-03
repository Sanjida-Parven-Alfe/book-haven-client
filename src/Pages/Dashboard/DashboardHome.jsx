import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import Loading from '../Loading/Loading';

const serverURL = "https://book-haven-server-199.vercel.app";

const DashboardHome = () => {
    const [user] = useAuthState(auth);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBooks: 0,
        myBooks: 0,
        uniqueAuthors: 0
    });
    const [chartData, setChartData] = useState([]);


    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884d8', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

    useEffect(() => {
        axios.get(`${serverURL}/Books`)
            .then(res => {
                const allBooks = res.data;
                setBooks(allBooks);

                const myBooksCount = allBooks.filter(book => book.userEmail === user?.email).length;
                const authors = new Set(allBooks.map(book => book.author));

                setStats({
                    totalBooks: allBooks.length,
                    myBooks: myBooksCount,
                    uniqueAuthors: authors.size
                });

                const genreCounts = {};
                allBooks.forEach(book => {
                    const genre = book.genre || "Unknown";
                    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                });

                const formattedChartData = Object.keys(genreCounts).map((key) => ({
                    name: key,
                    count: genreCounts[key],
                }));

                setChartData(formattedChartData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return <Loading />;
    }


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div className="w-full px-4 md:px-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Hi, {user?.displayName ? user.displayName.split(" ")[0] : "User"}! 👋
            </h1>
            <p className="text-gray-500 mb-8">Here's what's happening with your library today.</p>
            
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500">
                    <div className="stat-figure text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <div className="stat-title font-semibold text-gray-500">Total Books</div>
                    <div className="stat-value text-indigo-600">{stats.totalBooks}</div>
                </div>
                
                <div className="stat bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                    <div className="stat-figure text-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div className="stat-title font-semibold text-gray-500">My Books</div>
                    <div className="stat-value text-purple-600">{stats.myBooks}</div>
                </div>
                
                <div className="stat bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500">
                    <div className="stat-figure text-pink-500">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title font-semibold text-gray-500">Unique Authors</div>
                    <div className="stat-value text-pink-600">{stats.uniqueAuthors}</div>
                </div>
            </div>

         
            <div className="bg-white p-6 rounded-xl shadow-lg border border-base-200">
                <h2 className="text-xl font-bold mb-6 text-center md:text-left text-black">Books by Genre</h2>
                
                {chartData.length > 0 ? (
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }} 
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="name" 
                                    interval={0} 
                                    angle={-45} 
                                    textAnchor="end"
                                    height={80} 
                                    tick={{fontSize: 12}}
                                />
                                <YAxis allowDecimals={false} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" fill="#8884d8" name="Number of Books">
                                    {chartData.map((entry, index) => (
                                        
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">Not enough data to display chart.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;