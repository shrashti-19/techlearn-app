import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; // Make sure this path is correct

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { theme } = useTheme(); // Get the current theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        console.log("Logged in:", data);
        navigate("/dashboard"); // replace with your post-login page
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleGoogleResponse = (response) => {
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
          console.log("Google login success:", data);
          navigate("/dashboard");
        } else {
          setError(data.message || "Google login failed");
        }
      })
      .catch(() => setError("Google login failed"));
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "743910209791-un9r73br1mc3e766t3gq2ga4tiqudfth.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      {/* Only add dark mode classes to the login box itself */}
      <div className={`w-full max-w-md backdrop-blur-lg rounded-xl p-8 shadow-xl z-10 
                      ${theme === 'dark' ? 
                        'bg-gray-800/80 text-gray-100 border-gray-700' : 
                        'bg-white/60 text-gray-900 border-gray-300'}`}>

        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>
          Login
        </h2>

        {error && <p className={`text-sm text-center mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                        ${theme === 'dark' ? 
                          'bg-gray-700 text-white border-gray-600' : 
                          'bg-white text-gray-900 border-gray-300'}`}
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          {/* Password field with same theming */}
          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 
                        ${theme === 'dark' ? 
                          'bg-gray-700 text-white border-gray-600' : 
                          'bg-white text-gray-900 border-gray-300'}`}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={`text-center text-sm cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
            Forgot Password?
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors
                      ${theme === 'dark' ? 
                        'bg-blue-600 hover:bg-blue-500 text-white' : 
                        'bg-blue-800 hover:bg-blue-700 text-white'}`}
          >
            Sign in
          </button>

          <div className={`flex items-center justify-center my-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
            <span className="px-1 text-sm">or</span>
            <span className="px-1 text-sm">continue</span>
            <span className="px-1 text-sm">with</span>
            <span className={`border-t w-full ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}></span>
          </div>

          <div className="flex justify-center mt-4">
            <div className={`rounded-full overflow-hidden w-10 h-10 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center 
                           ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div id="googleSignInDiv" className="w-10 h-10"></div>
            </div>
          </div>

          <p className={`text-center mt-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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