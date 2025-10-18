import React, { useState, useEffect } from 'react';
import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import logo from '../assets/Logo.png';
import '../styles/Register.css';
import { supabase } from '../services/supabase-client';
import * as validation from '../utils/validation';
import bcrypt from 'bcryptjs';
import DynamicAlertDialog from '../components/DynamicAlertDialog';



const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogVariant, setDialogVariant] = useState('success');

  const hasErrors = Object.keys(errors).some(key => errors[key] && key !== 'general');

   useEffect(() => {
    document.title = 'Register - SugboWorks HRIS';
  }, []);

  
  useEffect(() => {
    if (!username) {
      setErrors((prev) => ({ ...prev, username: null }));
      setShakeFields((prev) => ({ ...prev, username: false }));
      return;
    }

    const timer = setTimeout(async () => {
      const result = await validation.existingUsername(username);
      if (!result.isValid) {
        setErrors((prev) => ({ ...prev, username: result.error }));
        setShakeFields((prev) => ({ ...prev, username: true }));
        setTimeout(() => setShakeFields((prev) => ({ ...prev, username: false })), 500);
      } else {
        setErrors((prev) => ({ ...prev, username: null }));
        setShakeFields((prev) => ({ ...prev, username: false }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: null }));
      setShakeFields((prev) => ({ ...prev, email: false }));
      return;
    }

    const timer = setTimeout(async () => {
      const result = await validation.existingEmail(email);
      if (!result.isValid) {
        setErrors((prev) => ({ ...prev, email: result.error }));
        setShakeFields((prev) => ({ ...prev, email: true }));
        setTimeout(() => setShakeFields((prev) => ({ ...prev, email: false })), 500);
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
        setShakeFields((prev) => ({ ...prev, email: false }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [email]);



    



  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrors({});
    setShakeFields({});

    // Check for any existing errors (from async validations)
    const hasErrors = Object.keys(errors).some(key => errors[key] && key !== 'general');
    if (hasErrors) {
      const fieldsToShake = {};
      Object.keys(errors).forEach(key => {
        if (errors[key] && key !== 'general') {
          fieldsToShake[key] = true;
        }
      });
      setShakeFields(fieldsToShake);
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    const usernameResult = validation.validateUsername(username);
    if (!usernameResult.isValid) {
      setErrors({ username: usernameResult.error });
      setShakeFields({ username: true });
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    const emailResult = validation.validateEmail(email);
    if (!emailResult.isValid) {
      setErrors({ email: emailResult.error });
      setShakeFields({ email: true });
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    const passwordResult = validation.validatePassword(password);
    if (!passwordResult.isValid) {
      setErrors({ password: passwordResult.error });
      setShakeFields({ password: true });
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setShakeFields({ confirmPassword: true });
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    if (!agreeTerms) {
      setErrors({ agreeTerms: 'Please agree to the terms and conditions' });
      setShakeFields({ agreeTerms: true });
      setTimeout(() => setShakeFields({}), 500);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          user_name: username,
          user_email: email,
          user_pass: hashedPassword,
          status_id: 1,
          role_id: 2,
          emp_id: null,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      setDialogMessage('Registration failed. Please try again.');
      setDialogVariant('error');
      setIsDialogOpen(true);
      return;
    }

    setDialogMessage('You are now registered!');
    setDialogVariant('success');
    setIsDialogOpen(true);

    // Clear the form after successful registration
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    setShakeFields({});

  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
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

          <form className="register-form" onSubmit={handleSubmit}>

            <div className={`register-field ${shakeFields.username ? 'shake' : ''}`}>
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
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>

            <div className={`register-field ${shakeFields.email ? 'shake' : ''}`}>
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
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className={`register-field ${shakeFields.password ? 'shake' : ''}`}>
              <Label htmlFor="password" className="register-label">
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
                  className="register-input"
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
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className={`register-field ${shakeFields.confirmPassword ? 'shake' : ''}`}>
              <Label htmlFor="confirm-password" className="register-label">
                Confirm Password
              </Label>
              <div className="password-input-container">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="register-input"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>

            <div className={`register-options ${shakeFields.agreeTerms ? 'shake' : ''}`}>
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
              {errors.agreeTerms && <p className="error-message">{errors.agreeTerms}</p>}
            </div>


            <div>
              <button
                type="submit"
                className="register-button"
                disabled={hasErrors}
              >
                Sign up
              </button>
              {errors.general && <p className="error-message">{errors.general}</p>}
            </div>

            <div className="register-signin">
              <p className="register-signin-text">
                Already have an account?{' '}
                <Link to="/login" className="register-link">
                  Sign in
                </Link>
              </p>
            </div>

   
            <div className="register-back-home">
              <Link to="/" className="register-link">
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>

      <DynamicAlertDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        message={dialogMessage}
        variant={dialogVariant}
      />
    </div>
  );
};

export default RegisterPage;
