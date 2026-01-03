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

  const isValidPassword = (pass) => {
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasLength = pass.length >= 6;
    
    if (!hasLength) return "Password must be at least 6 characters long.";
    if (!hasUppercase) return "Password must have at least one uppercase letter.";
    if (!hasLowercase) return "Password must have at least one lowercase letter.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const errorMsg = isValidPassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      return;
    } else {
      setPasswordError("");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL });
      navigate("/");
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
    <div className="flex justify-center items-center min-h-screen bg-base-100 text-base-content">
      <form onSubmit={handleRegister} className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5">
        <h2 className="text-2xl font-semibold mb-4 text-center text-base-content">Register</h2>

        <div>
          <label className="block text-sm mb-1 text-base-content">Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full bg-white/20 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-base-content">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-white/20 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-base-content">Photo URL</label>
          <input
            type="text"
            placeholder="Your photo URL here"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full bg-white/20 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-700"
          />
        </div>

        <div className="relative">
          <label className="block text-sm mb-1 text-base-content">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full bg-white/20 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-700 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 pt-[20px] top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 z-20"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {passwordError && <p className="text-red-500 text-xs mt-1 font-medium">{passwordError}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Register</button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignin}
          className="flex items-center justify-center gap-3 btn btn-outline w-full font-semibold"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-sm text-base-content text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;