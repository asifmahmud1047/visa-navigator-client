import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetch = useFetch();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Create user with email and password
  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const response = await fetch.post('/auth/register', {
        email,
        password,
        name,
        photo: photo || 'https://i.ibb.co/cLWY2Q9/user.png'
      });
      
      const newUser = {
        email,
        displayName: name,
        photoURL: photo || 'https://i.ibb.co/cLWY2Q9/user.png',
        uid: response.userId
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Registration successful!');
      return newUser;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch.post('/auth/login', {
        email,
        password
      });
      
      const loggedInUser = {
        email,
        displayName: response.name,
        photoURL: response.photo || 'https://i.ibb.co/cLWY2Q9/user.png',
        uid: response.userId
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      toast.success('Login successful!');
      return loggedInUser;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google (simplified)
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // For the purpose of this example, we'll simulate a Google login
      // In a real app, this would be handled differently
      const response = await fetch.post('/auth/google-login');
      
      const googleUser = {
        email: response.email,
        displayName: response.name,
        photoURL: response.photo,
        uid: response.userId
      };
      
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      toast.success('Google login successful!');
      return googleUser;
    } catch (error) {
      toast.error(error.message || 'Google login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await fetch.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logout successful!');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photo) => {
    try {
      await fetch.put('/auth/update-profile', {
        name,
        photo
      });
      
      const updatedUser = {
        ...user,
        displayName: name,
        photoURL: photo
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
      return updatedUser;
    } catch (error) {
      toast.error(error.message || 'Profile update failed');
      throw error;
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 