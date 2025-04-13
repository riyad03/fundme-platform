import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      
        <div>
          <h2 className="text-2xl font-bold mb-3">FundMe</h2>
          <p className="text-gray-400">
            Building the future, one project at a time.
          </p>
        </div>

    
        <div>
          <h3 className="font-semibold mb-2">FundMe.INC</h3>
          <ul className="space-y-1 text-gray-400">
            <li><Link to='/about'>About</Link></li>
            <li><a href="#">Careers</a></li>
            
          </ul>
        </div>

    
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#">Help Center</a></li>
            <li><Link to='/contactus'>Contact Us</Link></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#">🌐</a>
            <a href="#">🐦</a>
            <a href="#">📘</a>
          </div>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FundMe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
