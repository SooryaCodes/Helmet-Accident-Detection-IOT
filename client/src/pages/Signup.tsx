import React, { useState } from 'react';
import axios from '../config/axios'; // Axios setup from previous steps
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { TextInput, Button } from 'flowbite-react'; // Flowbite React components
import { useUserContext } from '../context/UserContext'; // User context for global state

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const { user, setUser } = useUserContext(); // Get setUser from context to update user state globally
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', userData);
      console.log("succces navigating soorya", response.status)

      if (response.status === 201) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        // Redirect to emergency contacts page
        console.log("succces navigating soorya", response.data)
        navigate('/emergency-contacts');
        // Update User Context with the user data from the backend (optional, assuming it returns user info)
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
        });


      }
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
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
