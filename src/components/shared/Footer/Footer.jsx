import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white">
              Visa Navigator
            </Link>
            <p className="mt-4 text-gray-400">
              Simplifying the visa application process for travelers worldwide.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/all-visas" className="text-gray-400 hover:text-white">All Visas</Link>
              </li>
              <li>
                <Link to="/add-visa" className="text-gray-400 hover:text-white">Add Visa</Link>
              </li>
              <li>
                <Link to="/my-visa-applications" className="text-gray-400 hover:text-white">My Applications</Link>
              </li>
            </ul>
          </div>

          {/* Visa Types */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Visa Types</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Tourist Visa</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Business Visa</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Student Visa</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Work Visa</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Transit Visa</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-6 w-6 text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  1234 Visa Street, Suite 500<br />
                  Global City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-400">info@visanavigator.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Visa Navigator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 