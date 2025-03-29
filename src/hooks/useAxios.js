import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { DotLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: 'https://visa-navigator-server.vercel.app', // Replace with your actual server URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

const useAxios = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor for adding auth token
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // You can add auth token here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling session expiration or authentication issues
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ERR_NETWORK') {
          console.error('Network error:', error);
          toast.error('Unable to connect to the server. Please check your internet connection.');
        } else if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response error:', error.response.data);
          
          if (error.response.status === 401 || error.response.status === 403) {
            // Logout user on auth errors
            logOut()
              .then(() => {
                toast.error('Session expired. Please login again.');
                // Redirect will be handled by protected routes
              })
              .catch(error => console.error('Logout error:', error));
          } else {
            toast.error(error.response.data.message || 'Something went wrong');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
          toast.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);
          toast.error('Error setting up the request');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up interceptors on component unmount
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosInstance;
};

export default useAxios; 