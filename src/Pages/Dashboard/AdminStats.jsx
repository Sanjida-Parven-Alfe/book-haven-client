import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AdminStats = () => {
    const data = [
        { name: 'Active Users', value: 400 },
        { name: 'Books Sold', value: 300 },
        { name: 'New Reviews', value: 200 },
        { name: 'Pending Orders', value: 100 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200">
            <h2 className="text-2xl font-bold mb-8">System Performance Stats</h2>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminStats;