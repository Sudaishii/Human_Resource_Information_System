import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import '../styles/Register.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Handle registration logic here (e.g., API call)
    console.log('Registration attempt:', { username, email, password, agreeTerms });
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-form-container">
          {/* Logo Section */}
          <div className="register-logo-section">
            <img src={logo} alt="SugboWorks Logo" className="register-logo" />
            <h2 className="register-heading">Create Account</h2>
            <p className="register-subheading">Sign up to get started</p>
          </div>

          {/* Registration Form */}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="register-field">
              <Label htmlFor="username" className="register-label">
                Username
              </Label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="register-input"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field */}
            <div className="register-field">
              <Label htmlFor="email" className="register-label">
                Email address
              </Label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="register-field">
              <Label htmlFor="password" className="register-label">
                Password
              </Label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="register-field">
              <Label htmlFor="confirm-password" className="register-label">
                Confirm Password
              </Label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="register-input"
                placeholder="Confirm your password"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="register-options">
              <div className="register-remember">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="register-checkbox"
                />
                <Label htmlFor="agree-terms" className="register-checkbox-label">
                  I agree to the <a href="#" className="register-link">Terms and Conditions</a>
                </Label>
              </div>
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                className="register-button"
              >
                Sign up
              </button>
            </div>

            {/* Sign In Link */}
            <div className="register-signin">
              <p className="register-signin-text">
                Already have an account?{' '}
                <Link to="/login" className="register-link">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="register-back-home">
              <Link to="/" className="register-link">
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
