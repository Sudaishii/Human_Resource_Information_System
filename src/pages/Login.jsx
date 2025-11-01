import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label'; // Radix Label for accessible form labeling
import { Link } from 'react-router-dom';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import logo from '../assets/Logo.png';
import '../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form-container">
          {/* Logo Section */}
          <div className="login-logo-section">
            <img src={logo} alt="SugboWorks Logo" className="login-logo" />
            <h2 className="login-heading">Welcome Back</h2>
            <p className="login-subheading">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email/Username Field */}
            <div className="login-field">
              <Label htmlFor="email" className="login-label">
                Email or Username
              </Label>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password Field */}
            <div className="login-field">
              <Label htmlFor="password" className="login-label">
                Password
              </Label>
              <div className="password-input-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="login-options">
              <div className="login-remember">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="login-checkbox"
                />
                <Label htmlFor="remember-me" className="login-checkbox-label">
                  Remember me
                </Label>
              </div>
              <div className="login-forgot">
                <a href="#" className="login-link">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="login-button"
              >
                Sign in
              </button>
            </div>

            {/* Or Continue with Google */}
            <div className="login-or-section">
              <div className="login-or">or</div>
              <button
                type="button"
                className="login-google-btn"
              >
                <span className="google-logo">G</span>
                Continue with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="login-signup">
              <p className="login-signup-text">
                Don't have an account?{' '}
                <Link to="/register" className="login-link">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="login-back-home">
              <Link to="/" className="login-link">
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
