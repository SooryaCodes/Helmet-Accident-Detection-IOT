import React, { useState } from 'react';
import axios from '../config/axios'; // Axios setup from previous steps
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', phone: '' }); // Added phone
  const [error, setError] = useState<string | null>(null); // Error state to hold error message
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post('/api/auth/signup', userData);
      console.log("Success:", response.status);

      if (response.status === 201) {
        // Store the token and user details in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to emergency contacts page
        navigate('/emergency-contacts');
      }
    } catch (err: any) {
      console.error('Error signing up:', err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-base-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600">{error}</div>} {/* Error message display */}

        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
            className="input input-bordered w-full "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="input input-bordered w-full "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            className="input input-bordered w-full "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg mb-2">Phone Number</label>
          <input
            id="phone"
            type="text"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            required
            className="input input-bordered w-full "
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
