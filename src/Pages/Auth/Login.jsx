import React, { useState, useRef } from "react";
import { auth } from "../../firebase/firebase.config"; // path ঠিক রাখো
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  // Email & Password Login
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate("/"); // Home page redirect
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Home page redirect
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 text-base-content">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center text-base-content">
          Login
        </h2>

        {/* Email Input */}
        <div>
          <label className="block text-sm mb-1 text-base-content">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="Your Email"
            className="input input-bordered w-full bg-white/20 text-base-content placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-700"
            autoComplete="off"
          />
        </div>

        {/* Password Input with show/hide */}
        <div className="relative">
          <label className="block text-sm mb-1 text-base-content">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            ref={passwordRef}
            placeholder="••••••••"
            className="input input-bordered w-full bg-white/20 text-base-content placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-700 pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 pt-[20px] top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 z-20"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Forget Password */}
        <p className="text-blue-500 text-sm cursor-pointer text-right">Forget Password?</p>

        {/* Login Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Login
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignin}
          className="flex items-center justify-center gap-3 btn btn-outline w-full font-semibold"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-sm text-base-content text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
