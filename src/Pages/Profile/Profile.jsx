import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhoto,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-10 px-4">
      <Toaster />
      <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-200">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end gap-6">
            <img
              src={user?.photoURL || "https://i.pravatar.cc/150"}
              className="w-32 h-32 rounded-2xl border-4 border-base-100 shadow-lg object-cover"
              alt="profile"
            />
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold">{user?.displayName}</h1>
              <p className="opacity-60">{user?.email}</p>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-outline mb-2">
                Edit Profile
              </button>
            )}
          </div>

          <div className="divider"></div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6 max-w-lg">
              <div className="form-control">
                <label className="label font-bold">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary px-8">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
               <div className="p-6 bg-base-200 rounded-2xl">
                  <p className="text-sm opacity-50 uppercase font-bold tracking-wider">Account Status</p>
                  <p className="text-lg font-semibold mt-1">Verified User</p>
               </div>
               <div className="p-6 bg-base-200 rounded-2xl">
                  <p className="text-sm opacity-50 uppercase font-bold tracking-wider">Last Login</p>
                  <p className="text-lg font-semibold mt-1">{new Date(user?.metadata.lastSignInTime).toLocaleDateString()}</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;