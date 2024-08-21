import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://dashboard-mvei.onrender.com/api/auth/login', { email, password });
    if (response.status === 200) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.token); // Assuming token is in response.data.token
      login(); // Set authenticated state
      navigate('/'); // Redirect to product page
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

const togglePassword =()=>{
  setshowPassword(!showPassword)
}


  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2 bg-gray-200">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvGDuzta4BFkk7fHfCYH8fxkRubkC92vkXw&s" alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type={showPassword ? 'text': 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
