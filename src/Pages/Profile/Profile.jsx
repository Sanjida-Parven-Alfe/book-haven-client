import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import DefaultAvatar from "../../assets/account.png";

const Profile = () => {
  const [user] = useAuthState(auth);



  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl text-gray-600">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 bg-gray-50">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-md">
        <img
          src={user.photoURL ?? DefaultAvatar}
          alt={user.displayName ?? "User"}
          className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
        />

        <h2 className="text-2xl font-bold text-gray-800">
          {user.displayName ?? "Anonymous User"}
        </h2>

        <p className="text-gray-600">{user.email}</p>


      </div>
    </div>
  );
};

export default Profile;
