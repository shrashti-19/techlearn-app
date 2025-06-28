import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // for redirecting after login
  const [error, setError] = useState("");

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
        client_id: "292576736578-g02qvp9ss7qj3jht2ghso1aqgoil22gp.apps.googleusercontent.com",
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
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-xl p-8 shadow-xl z-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500"
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

          <div className="flex justify-center mt-4">
            <div className="rounded-full overflow-hidden w-12 h-12 shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center">
              <div id="googleSignInDiv" className="w-10 h-10"></div>
            </div>
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
