import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { login, googleLogin } from '../../api/authService';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleResponse = useCallback(async (response) => {
    try {
      const { data } = await googleLogin(response.credential);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
    }
  },[navigate]);

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { 
          theme: theme === 'dark' ? 'filled_black' : 'outline', 
          size: 'large',
          width: '300'
        }
      );
    }
  }, [theme,handleGoogleResponse]);

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      <div className={`w-full max-w-sm backdrop-blur-lg rounded-xl p-6 shadow-xl z-10 border
                      ${theme === 'dark' ? 
                        'bg-gray-800/80 text-gray-100 border-gray-700' : 
                        'bg-white/60 text-gray-900 border-gray-300'}`}>

        <h2 className={`text-xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>
          Login
        </h2>

        {error && <p className={`text-sm text-center mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
                        ${theme === 'dark' ? 
                          'bg-gray-700 text-white border-gray-600' : 
                          'bg-white text-gray-900 border-gray-300'}`}
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
                        ${theme === 'dark' ? 
                          'bg-gray-700 text-white border-gray-600' : 
                          'bg-white text-gray-900 border-gray-300'}`}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={`text-center text-xs cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
            Forgot Password?
          </div>

          <button
            type="submit"
            className={`w-full font-medium py-2 px-4 rounded-lg transition-colors
                      ${theme === 'dark' ? 
                        'bg-blue-600 hover:bg-blue-500 text-white' : 
                        'bg-blue-800 hover:bg-blue-700 text-white'}`}
          >
            Sign in
          </button>

          <div className={`flex items-center justify-center my-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
            <span className="px-1 text-xs">or</span>
            <span className="px-1 text-xs">continue</span>
            <span className="px-1 text-xs">with</span>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
          </div>

          <div className="flex justify-center">
            <div className={`rounded-full overflow-hidden w-8 h-8 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center 
                           ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div id="googleSignInDiv" className="w-10 h-10"></div>
            </div>
          </div>

          <p className={`text-center mt-4 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Don't have an account?{' '}
            <Link to="/signup" className={`font-medium hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Sign up for free
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}