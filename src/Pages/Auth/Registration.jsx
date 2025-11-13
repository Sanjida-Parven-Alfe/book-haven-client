import React, { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const isValidPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters with uppercase and lowercase letters.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL });
      navigate("/"); // redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5">
        <h2 className="text-2xl font-semibold mb-4 text-center text-amber-950">Register</h2>

        <div>
          <label className="block text-sm text-black font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className="input input-bordered border-gray-300 w-full bg-white/20 text-black placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-amber-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="input input-bordered border-gray-300 w-full bg-white/20 text-black placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-amber-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black font-medium mb-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            placeholder="Your photo URL here"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            autoComplete="off"
            className="input input-bordered w-full border-gray-300 bg-white/20 text-black placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>

        <div className="relative">
          <label className="block text-sm text-black font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="input input-bordered border-gray-300 w-full bg-white/20 text-black placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-amber-800 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 pt-[20px] top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 z-20"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-800 text-white p-2 rounded hover:bg-indigo-500 transition">
          Register
        </button>

        <button
          type="button"
          onClick={handleGoogleSignin}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-sm text-black text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
