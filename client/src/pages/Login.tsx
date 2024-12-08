// Login.tsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label className="block mb-2 text-sm font-medium">Email address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
            className="mr-2"
          />
          Continue with Google
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up now!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
