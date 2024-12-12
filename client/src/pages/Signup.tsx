import React, { useState } from 'react';
import axios from '../config/axios'; // Axios setup from previous steps
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { TextInput, Button } from 'flowbite-react'; // Flowbite React components
import { useUserContext } from '../context/UserContext'; // User context for global state

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null); // Error state to hold error message
  const { setUser } = useUserContext(); // Get setUser from context to update user state globally
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

        // Update User Context with the user data from the backend
        setUser({
          _id: response.data.user._id,
          name: response.data.user.name,
          email: response.data.user.email,
        });

        // Redirect to emergency contacts page
        navigate('/emergency-contacts');
      }
    } catch (err: any) {
      console.error('Error signing up:', err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600">{error}</div>} {/* Error message display */}
        
        <div className="mb-4">
          <TextInput
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
            className="block w-full"
          />
        </div>
        
        <div className="mb-4">
          <TextInput
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="block w-full"
          />
        </div>
        
        <div className="mb-4">
          <TextInput
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            className="block w-full"
          />
        </div>
        
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;
