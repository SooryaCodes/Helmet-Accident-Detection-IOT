// src/pages/Signup.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import axios from '../config/axios'; // Import your Axios instance
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const { setUserData } = useUserContext(); // Access the context to store user data
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token); // Store the token in local storage
      setUserData(user); // Store user data in context
      navigate('/dashboard'); // Redirect to dashboard after successful signup
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <TextInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
