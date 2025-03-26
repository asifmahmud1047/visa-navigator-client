import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import notFoundAnimation from '../../../assets/animations/404-animation.json';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6">
        <div className="w-full max-w-sm mx-auto">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        
        <div className="text-center mt-8">
          <h1 className="text-5xl font-bold text-gray-800">404</h1>
          <p className="text-2xl font-semibold text-gray-600 mt-2">Page Not Found</p>
          <p className="text-gray-500 mt-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 mt-8 rounded-lg transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 