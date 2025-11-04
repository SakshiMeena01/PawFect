import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import googleLogo from "../assets/google.png";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect on successful login (or wherever desired)
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect on successful Google sign-in
    } catch (error) {
      alert("Google sign-in error: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* LEFT IMAGE SIDE */}
        <div className="login-image-side">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue your journey with us.</p>
        </div>
        {/* RIGHT FORM SIDE */}
        <div className="login-form-side">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="divider">or</div>
          <button className="google-btn" onClick={handleGoogleSignIn}>
            <img src={googleLogo} alt="Google" className="google-logo" />
            Sign in with Google
          </button>
          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
