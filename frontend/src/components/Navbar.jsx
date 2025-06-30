import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import lightlogo from '../assets/logoo.png';
import darklogo from '../assets/logoo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Global styles for dark mode */}
      <style jsx="true" global="true">{`
        :root {
          --primary-light: #00184f;
          --primary-dark: #e0e6f5;
          --bg-light: linear-gradient(135deg, #daf0fa 0%, #bceaff 50%, #bceaff 100%);
          --bg-dark: linear-gradient(135deg, rgb(2, 11, 35) 0%, #001233 50%, #0a1128 100%);
        }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg-light);
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          transition: background 0.3s ease;
        }
        .dark body {
          background: var(--bg-dark);
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-15 py-2.5 md:py-8 bg-transparent relative z-[1000]">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo">
              <img
                src={lightlogo}
                alt="Light Logo"
                className={`h-12 md:h-19 w-auto transition-all duration-300 ${
                  theme === 'dark' ? 'hidden' : 'inline'
                }`}
              />
              <img
                src={darklogo}
                alt="Dark Logo"
                className={`h-12 md:h-19 w-auto transition-all duration-300 ${
                  theme === 'dark' ? 'inline' : 'hidden'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center" style={{ gap: '62px' }}>
            {['learn', 'build', 'careers'].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  theme === 'dark' ? 'text-[#e0e6f5] hover:text-white' : 'text-[#00184f]'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            <Link
              to="/login"
              className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                theme === 'dark' ? 'text-[#e0e6f5] hover:text-white' : 'text-[#00184f]'
              }`}
            >
              Log In
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                theme === 'dark' ? 'hover:bg-gray-700 text-yellow-300' : 'hover:bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div
            className={`md:hidden flex justify-center items-center cursor-pointer transition-all duration-300 ${
              isMenuOpen ? 'flex-col gap-[5px]' : 'gap-[5px]'
            }`}
            onClick={toggleMenu}
          >
            {[1, 2, 3].map((_, i) => (
              <span
                key={i}
                className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#e0e6f5]' : 'bg-black'
                }`}
              ></span>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <nav
          className={`md:hidden ${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-full left-0 w-screen flex-col gap-2 px-5 py-2 shadow-lg z-[999] transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#0a1128] via-[#001233] to-[#0a1128]'
              : 'bg-gradient-to-r from-[#daf0fa] via-[#bceaff] to-[#bceaff]'
          }`}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
          {['learn', 'build', 'careers', 'login'].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              onClick={closeMenu}
              className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                theme === 'dark' ? 'text-[#e0e6f5] hover:text-white' : 'text-black hover:text-[#333]'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}

          {/* Theme Toggle - Mobile */}
          <button
            onClick={toggleTheme}
            className={`text-left py-2.5 text-[14px] transition-colors duration-300 ${
              theme === 'dark' ? 'text-[#e0e6f5] hover:text-white' : 'text-black hover:text-[#333]'
            }`}
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="mr-2" />
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;