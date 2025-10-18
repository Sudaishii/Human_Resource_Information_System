import { supabase } from '../services/supabase-client';

export const validateEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  return { isValid: true, error: null };
};

export const validatePassword = (password) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    return { isValid: false, error: 'Password must contain uppercase, lowercase, number and be at least 8 chars long' };
  }
  return { isValid: true, error: null };
};

export const validateUsername = (username) => {
  if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
    return { isValid: false, error: 'Username must be at least 3 characters and contain only letters, numbers, or underscores' };
  }
  return { isValid: true, error: null };
};

export const existingEmail = async (email) => {

  const { data: emailData, error } = await supabase 
    .from('users')
    .select('user_email')
    .eq('user_email', email)
    .maybeSingle();

     if (emailData) {
      return { isValid: false, error: 'Email already exists' };
     }

  return { 
    isValid: true, 
    error: null 
  };
}

export const existingUsername = async (username) => {

  const { data: usernameData, error } = await supabase  
    .from('users')
    .select('user_name')
    .eq('user_name', username)
    .maybeSingle();   

    if (usernameData) {
      return { isValid: false, error: 'Username already exists' };
    }

    return { 
      isValid: true, 
      error: null 
    };
};

