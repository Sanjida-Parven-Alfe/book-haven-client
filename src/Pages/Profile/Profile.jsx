import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import DefaultAvatar from "../../assets/account.png";

const Profile = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-base-100 text-base-content">
        <p className="text-xl">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 bg-base-100 text-base-content">
      {/* Profile Card */}
      <div className="bg-base-200 shadow-lg rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-md">
        <img
          src={user.photoURL ?? DefaultAvatar}
          alt={user.displayName ?? "User"}
          className="w-32 h-32 rounded-full border-4 border-primary object-cover"
        />

        <h2 className="text-2xl font-bold">{user.displayName ?? "Anonymous User"}</h2>

        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
