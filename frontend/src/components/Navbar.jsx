import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #daf0fa 0%, #bceaff 50%, #bceaff 100%);
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          color: #000;
        }

        body.dark-mode {
          background: linear-gradient(135deg, rgb(2, 11, 35) 0%, #001233 50%, #0a1128 100%);
          color: #e0e6f5;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-16 py-2.5 md:py-8 bg-transparent relative z-[1000]">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo">
              <img
                src="./logoo.png"
                alt="Light Logo"
                className={`h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'hidden' : 'inline'}`}
              />
              <img
                src="./logoo2.png"
                alt="Dark Logo"
                className={`h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'inline' : 'hidden'}`}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center" style={{ gap: '62px' }}>
            {['learn', 'build', 'careers', 'login'].map((page) => (
              <Link
                key={page}
                to={`/${page}`}
                className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  isDarkMode ? 'text-[#e0e6f5] hover:text-white' : 'text-[#00184f]'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            ))}

            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={toggleDarkMode}
              className={`text-[15px] transition-colors duration-300 ${
                isDarkMode ? 'text-[#e0e6f5] hover:text-white' : 'text-[#00184f]'
              }`}
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
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
                  isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
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
            isDarkMode
              ? 'bg-gradient-to-r from-[#0a1128] via-[#001233] to-[#0a1128]'
              : 'bg-gradient-to-r from-[#daf0fa] via-[#bceaff] to-[#bceaff]'
          }`}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
          {['learn', 'build', 'careers', 'login'].map((page) => (
            <Link
              key={page}
              to={`/${page}`}
              onClick={closeMenu}
              className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                isDarkMode ? 'text-[#e0e6f5] hover:text-white' : 'text-black hover:text-[#333]'
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          ))}

          {/* Dark Mode Toggle - Mobile */}
          <button
            onClick={toggleDarkMode}
            className={`text-left py-2.5 text-[14px] transition-colors duration-300 ${
              isDarkMode ? 'text-[#e0e6f5] hover:text-white' : 'text-black hover:text-[#333]'
            }`}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;


// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const [isVisible, setIsVisible] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   // Load saved theme on component mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme')
//     if (savedTheme === 'dark') {
//       setIsDarkMode(true)
//       document.body.classList.add('dark-mode')
//     }
//   }, [])

//   // Handle scroll to hide/show navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false)
//       } else {
//         setIsVisible(true)
//       }

//       setLastScrollY(currentScrollY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [lastScrollY])

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode)
//     document.body.classList.toggle('dark-mode')

//     // Save preference
//     if (!isDarkMode) {
//       localStorage.setItem('theme', 'dark')
//     } else {
//       localStorage.setItem('theme', 'light')
//     }
//   }

//   const closeMenu = () => {
//     setIsMenuOpen(false)
//   }

//   return (
//     <>
//       {/* Global styles for dark mode */}
//       <style jsx global>{`
//         body {
//           font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, #daf0fa 0%, #bceaff 50%, #bceaff 100%);
//           background-repeat: no-repeat;
//           background-size: cover;
//           background-attachment: fixed;
//           color: #000;
//         }

//         body.dark-mode {
//           font-family: 'Inter', sans-serif;
//           background: linear-gradient(135deg, rgb(2, 11, 35) 0%, #001233 50%, #0a1128 100%);
//           background-repeat: no-repeat;
//           background-size: cover;
//           background-attachment: fixed;
//           color: #e0e6f5;
//         }
//       `}</style>

//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
//           isVisible ? 'translate-y-0' : '-translate-y-full'
//         }`}
//       >
//         <nav className="flex justify-between items-center px-4 md:px-15 py-2.5 md:py-8 bg-transparent relative z-[1000]">
//           {/* Logo */}
//           <div className="logo">
//             <Link to="/" className="logo">
//               <img
//                 src="/logoo.png"
//                 alt="Light Logo"
//                 className={h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'hidden' : 'inline'}}
//               />
//               <img
//                 src="/logoo2.png"
//                 alt="Dark Logo"
//                 className={h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'inline' : 'hidden'}}
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation Links */}
//           <nav className="hidden md:flex items-center" style={{ gap: '62px' }}>
//             <Link
//               to="/learn"
//               className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//                 isDarkMode
//                   ? 'text-[#e0e6f5] hover:text-white'
//                   : 'text-[#00184f]'
//               }`}
//             >
//               Learn
//             </Link>
//             <Link
//               to="/build"
//               className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//                 isDarkMode
//                   ? 'text-[#e0e6f5] hover:text-white'
//                   : 'text-[#00184f]'
//               }`}
//             >
//               Build
//             </Link>
//             <Link
//               to="/careers"
//               className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//                 isDarkMode
//                   ? 'text-[#e0e6f5] hover:text-white'
//                   : 'text-[#00184f]'
//               }`}
//             >
//               Careers
//             </Link>
//             <Link
//               to="/login"
//               className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//                 isDarkMode
//                   ? 'text-[#e0e6f5] hover:text-white'
//                   : 'text-[#00184f]'
//               }`}
//             >
//               Log In
//             </Link>

//             {/* Dark Mode Toggle - Desktop */}
//             <button
//               onClick={toggleDarkMode}
//               className={`text-[15px] transition-colors duration-300 ${
//                 isDarkMode
//                   ? 'text-[#e0e6f5] hover:text-white'
//                   : 'text-[#00184f]'
//               }`}
//               aria-label="Toggle dark mode"
//             >
//               <i className={fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}}></i>
//             </button>
//           </nav>

//           {/* Mobile Menu Toggle */}
//           <div
//             className={`md:hidden flex justify-center items-center cursor-pointer transition-all duration-300 ${
//               isMenuOpen ? 'flex-col gap-[5px]' : 'gap-[5px]'
//             }`}
//             onClick={toggleMenu}
//           >
//             <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
//               isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
//             }`}></span>
//             <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
//               isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
//             }`}></span>
//             <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
//               isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
//             }`}></span>
//           </div>
//         </nav>

//         {/* Mobile Navigation Menu */}
//         <nav className={`md:hidden ${isMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-screen flex-col gap-2 px-5 py-2 shadow-lg z-[999] transition-all duration-300 ${
//           isDarkMode
//             ? 'bg-gradient-to-r from-[#0a1128] via-[#001233] to-[#0a1128]'
//             : 'bg-gradient-to-r from-[#daf0fa] via-[#bceaff] to-[#bceaff]'
//         }`} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <Link
//             to="/learn"
//             onClick={closeMenu}
//             className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//               isDarkMode
//                 ? 'text-[#e0e6f5] hover:text-white'
//                 : 'text-black hover:text-[#333]'
//             }`}
//           >
//             Learn
//           </Link>
//           <Link
//             to="/build"
//             onClick={closeMenu}
//             className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//               isDarkMode
//                 ? 'text-[#e0e6f5] hover:text-white'
//                 : 'text-black hover:text-[#333]'
//             }`}
//           >
//             Build
//           </Link>
//           <Link
//             to="/careers"
//             onClick={closeMenu}
//             className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//               isDarkMode
//                 ? 'text-[#e0e6f5] hover:text-white'
//                 : 'text-black hover:text-[#333]'
//             }`}
//           >
//             Careers
//           </Link>
//           <Link
//             to="/login"
//             onClick={closeMenu}
//             className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
//               isDarkMode
//                 ? 'text-[#e0e6f5] hover:text-white'
//                 : 'text-black hover:text-[#333]'
//             }`}
//           >
//             Log In
//           </Link>

//           {/* Dark Mode Toggle - Mobile */}
//           <button
//             onClick={toggleDarkMode}
//             className={`text-left py-2.5 text-[14px] transition-colors duration-300 ${
//               isDarkMode
//                 ? 'text-[#e0e6f5] hover:text-white'
//                 : 'text-black hover:text-[#333]'
//             }`}
//             aria-label="Toggle dark mode"
//           >
//             <i className={fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} mr-2}></i>
//             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//           </button>
//         </nav>
//       </header>
//     </>
//   )
// }

// export default Navbar