import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { DotLoader } from 'react-spinners';

const axiosInstance = axios.create({
  baseURL: 'https://visa-navigator-server.vercel.app', // Replace with your actual server URL
  withCredentials: true
});

const useAxios = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Response interceptor for handling session expiration or authentication issues
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Logout user on auth errors
          logOut()
            .then(() => {
              // Redirect will be handled by protected routes
            })
            .catch(error => console.error(error));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up interceptor on component unmount
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosInstance;
};

export default useAxios; 