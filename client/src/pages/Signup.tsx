// SignUp.tsx
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        emergencyContacts: [], // Placeholder for emergency contacts
      });

      navigate('/emergency-contacts'); // Redirect to next page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">Email Address</label>
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
          onClick={handleSignUp}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
