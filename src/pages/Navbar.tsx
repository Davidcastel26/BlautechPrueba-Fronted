import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            MyApp
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-0 bg-gray-800 shadow-lg w-full z-50">
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  to="/"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Inicio
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Acerca de
                </Link>
                <Link
                  to="/services"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Servicios
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}

          {/* Menú de navegación (solo en desktop) */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              Acerca de
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              Servicios
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;