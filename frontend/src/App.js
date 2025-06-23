
import './output.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import FloatingCodeWords from './FloatingCodeWords';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer


console.log("FloatingCodeWords:", typeof FloatingCodeWords);
console.log("Navbar:", typeof Navbar);
console.log("Footer:", typeof Footer);


export default function App() {
  return (
    <Router>
      {/* Background with floating code words - applies to all routes */}
      <div className="relative min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 overflow-hidden">
        <FloatingCodeWords />
        
        {/* Main content container with z-index to appear above background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navbar appears on all routes */}
          <Navbar />
          
          {/* Main content area that grows to push footer down */}
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
          
          {/* Footer appears on all routes */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}


// import './output.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';
// import Dashboard from './pages/Dashboard';
// import PrivateRoute from './routes/PrivateRoute';
// import FloatingCodeWords from './FloatingCodeWords'; // New component
// import Navbar from './components/Navbar'; // Import Navbar
// import Footer from './components/Footer'; // Import Footer

// export default function App() {
//   return (
//     <Router>
//       {/* Background with floating code words - applies to all routes */}
//       <div className="relative min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 overflow-hidden">
//         <FloatingCodeWords />
        
//         {/* Routes container with z-index to appear above background */}
//         <div className="relative z-10">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//               <Route element={<PrivateRoute />}></Route>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<Login />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

