import { Facebook, Instagram } from "lucide-react";
import Container from "../layout/Container/Container";
import logo from "./../../assets/shelf-life.png"
import { Link } from "react-router";

const Footer = () => {
    return (
        <div>
             <footer className="bg-gray-50 border-t border-gray-200">
        <Container>
          {/* Main Footer Content */}
          <div className="py-8 md:py-12 ">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
              {/* Company Info Section */}
              <div className="md:col-span-2">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-left">
                    <Link to="/">
                      <img
                        src={logo}
                        alt="Roomate-logo"
                        className="w-full md:w-[200px] lg:w-[200px] mx-auto md:mx-0 md:ml-[-10px] "
                      />
                    </Link>
                    <p className="text-sm md:text-[14px] text-center text-gray-600">
                      Your best Food Expiry System
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="md:col-span-3">
                <h4 className="text-lg md:text-xl text-gray-800 font-semibold mb-4 text-left">
                  Information
                </h4>
                <ul className="space-y-3 text-sm md:text-md text-gray-600 text-left">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-[#24ab63] transition-colors duration-200"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-[#24ab63] transition-colors duration-200"
                    >
                      Terms & Condition
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="hover:text-[#24ab63] transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Service Section */}
              <div className="md:col-span-2">
                <h4 className="text-lg md:text-xl text-gray-800 font-semibold mb-4 text-left">
                  Service
                </h4>
                <ul className="space-y-3 text-sm md:text-md text-gray-600 ">
                  <li>
                    <a
                      href="/"
                      className="hover:text-[#24ab63] transition-colors duration-200"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="hover:text-[#24ab63] transition-colors duration-200"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="md:col-span-5">
                <h4 className="text-lg md:text-xl text-gray-800 font-semibold mb-4 ">
                  Subscribe Newsletter
                </h4>
                <div className="flex flex-col sm:flex-row w-full max-w-sm mx-auto md:mx-0 items-center gap-2">
                  <input 
                    type="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Email" 
                  />
                  <button
                    type="submit"
                    className="bg-[#24ab63] text-white py-2 px-4 rounded-md whitespace-nowrap w-full sm:w-auto"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h4 className="text-gray-600 mb-2">Follow Us:</h4>
                  <ul className="flex items-center justify-center md:justify-start gap-3">
                    <Link
                      to="https://www.facebook.com"
                      target="_blank"
                    >
                      <li className="bg-blue-500 w-8 h-8 p-1 flex items-center justify-center rounded">
                        <Facebook size={20} className="text-white" />
                      </li>
                    </Link>
                    <Link to="https://www.instagram.com">
                      <li className="bg-pink-500 w-8 h-8 p-1 flex items-center justify-center rounded">
                        <Instagram size={20} className="text-white" />
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-200 bg-white">
          <div className="flex justify-center p-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <p className="text-center">
                Developed by Esmot Ara &copy;
              </p>
            </div>
          </div>
        </div>
      </footer>
        </div>
    );
};

export default Footer;