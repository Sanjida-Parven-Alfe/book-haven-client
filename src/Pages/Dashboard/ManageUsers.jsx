import React from 'react';

const ManageUsers = () => {
    const demoUsers = [
        { id: 1, name: "Nirob", email: "nirob@test.com", role: "User", status: "Active" },
        { id: 2, name: "Admin", email: "admin@bookhaven.com", role: "Admin", status: "Active" },
        { id: 3, name: "John Doe", email: "john@doe.com", role: "User", status: "Blocked" },
    ];

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {demoUsers.map(u => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td><span className={`badge ${u.role === 'Admin' ? 'badge-primary' : 'badge-ghost'}`}>{u.role}</span></td>
                            <td><span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-error'} badge-sm`}>{u.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;