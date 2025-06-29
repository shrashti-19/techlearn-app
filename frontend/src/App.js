import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './routes/PrivateRoute';
import FloatingCodeWords from './FloatingCodeWords';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import './lib/fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

function FloatingCodeBackground() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  return isAuthPage ? <FloatingCodeWords /> : null;
}

function LayoutWrapper() {
  const location = useLocation();
  const showNavbar = !['/dashboard'].includes(location.pathname);

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {showNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen overflow-hidden">
          <FloatingCodeBackground />
          <LayoutWrapper />
        </div>
      </Router>
    </ThemeProvider>
  );
}