import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      const idToken = response.credential;

      fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            setError(data.message || "Google sign-up failed");
          }
        })
        .catch(() => setError("Google sign-up failed"));
    };

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "743910209791-un9r73br1mc3e766t3gq2ga4tiqudfth.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignupDiv"),
        { theme: theme === 'dark' ? 'filled_black' : 'outline', size: "large" }
      );
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      <div className={`w-full max-w-md backdrop-blur-lg rounded-xl p-8 shadow-xl z-10 border
                      ${theme === 'dark' ? 
                        'bg-gray-800/80 text-gray-100 border-gray-700' : 
                        'bg-white/60 text-gray-900 border-gray-300'}`}>

        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>
          Sign Up
        </h2>

        {error && <p className={`text-sm text-center mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                            ${theme === 'dark' ? 
                              'bg-gray-700 text-white border-gray-600' : 
                              'bg-white text-gray-900 border-gray-300'}`}
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                            ${theme === 'dark' ? 
                              'bg-gray-700 text-white border-gray-600' : 
                              'bg-white text-gray-900 border-gray-300'}`}
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                          ${theme === 'dark' ? 
                            'bg-gray-700 text-white border-gray-600' : 
                            'bg-white text-gray-900 border-gray-300'}`}
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                          ${theme === 'dark' ? 
                            'bg-gray-700 text-white border-gray-600' : 
                            'bg-white text-gray-900 border-gray-300'}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                          ${theme === 'dark' ? 
                            'bg-gray-700 text-white border-gray-600' : 
                            'bg-white text-gray-900 border-gray-300'}`}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors
                      ${theme === 'dark' ? 
                        'bg-blue-600 hover:bg-blue-500 text-white' : 
                        'bg-blue-800 hover:bg-blue-700 text-white'}`}
          >
            Create account
          </button>

          <div className={`flex items-center justify-center my-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
            <span className="px-1 text-sm">or</span>
            <span className="px-1 text-sm">continue</span>
            <span className="px-1 text-sm">with</span>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
          </div>

          <div className="flex justify-center mt-4">
            <div className={`rounded-full overflow-hidden w-8 h-8 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center 
                           ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div id="googleSignupDiv" className="w-10 h-10"></div>
            </div>
          </div>

          <p className={`text-center mt-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-medium hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}