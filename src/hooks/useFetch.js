import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://visa-navigator-server-beta-dun.vercel.app';

const useFetch = () => {
  const fetchData = async (endpoint, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Set default headers
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      };
      
      // Set default options
      const fetchOptions = {
        ...options,
        headers,
        mode: 'cors' // Explicitly set CORS mode
      };
      
      // Execute fetch request
      const response = await fetch(url, fetchOptions);
      
      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
        
        if (response.status === 401 || response.status === 403) {
          toast.error('Authentication error. Please log in again.');
        } else {
          toast.error(errorMessage);
        }
        
        throw new Error(errorMessage);
      }
      
      // Parse JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        toast.error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  };
  
  // Helper methods for common HTTP methods
  const get = (endpoint, options = {}) => {
    return fetchData(endpoint, { ...options, method: 'GET' });
  };
  
  const post = (endpoint, data, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  };
  
  const put = (endpoint, data, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  };
  
  const del = (endpoint, options = {}) => {
    return fetchData(endpoint, { ...options, method: 'DELETE' });
  };
  
  return { get, post, put, delete: del };
};

export default useFetch; 