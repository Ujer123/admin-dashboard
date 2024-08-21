import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://dashboard-mvei.onrender.com/api/auth/signup', { email, password });

      if (response.status === 201) {
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email already exists or invalid input');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2 bg-gray-200">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvGDuzta4BFkk7fHfCYH8fxkRubkC92vkXw&s" alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
        <div className="mt-4 text-center">
              <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
            </div>
      </form>
    </div>
    </div>
      </div>
  );
};

export default Signup;
