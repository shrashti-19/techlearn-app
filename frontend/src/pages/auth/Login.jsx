import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Clicked ${provider} login`);
  };

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-xl p-8 shadow-xl z-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="text-center text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot Password?
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center my-4 text-gray-500">
            <span className="border-t border-gray-400 w-full"></span>
            <span className="px-1 text-sm">or</span>
            <span className="px-1 text-sm">continue</span>
            <span className="px-1 text-sm">with</span>
            <span className="border-t border-gray-400 w-full"></span>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full border hover:bg-gray-100 transition shadow-sm"
            >
              <img src="/public/google.png" alt="Google" className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-700 text-center mt-6 text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1 font-medium">
              Sign up for free
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}