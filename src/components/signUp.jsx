import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import googleLogo from "../assets/google.png";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally set display name
      await updateProfile(userCredential.user, { displayName: name });
      alert("Sign up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Sign up error: " + error.message);
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect after Google sign-up (adjust as needed)
    } catch (error) {
      alert("Google sign-up error: " + error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* LEFT IMAGE SIDE */}
        <div className="signup-left">
          <div className="welcome-text">
            <h1>WELCOME</h1>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="signup-right">
          <div className="pawperfect-header">
            <h1 className="pawperfect-text">PawFect</h1>
            <img
              src="https://media.gettyimages.com/id/1392377434/vector/dog-pushing-shopping-cart.jpg?s=612x612&w=gi&k=20&c=4yShit6PlJNefuohIMrTmcyV-VEkxoXhGnjDu4RHWwc="
              alt="PawPerfect Logo"
              className="pawperfect-logo"
            />
          </div>
          <div className="social-login">
            <button className="google-btn" onClick={handleGoogleSignUp}>
              <img src={googleLogo} alt="Google" className="google-logo" /> Sign up with Google
            </button>
          </div>
          <div className="divider">OR</div>
          <form className="signup-form" onSubmit={handleSignUp}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
