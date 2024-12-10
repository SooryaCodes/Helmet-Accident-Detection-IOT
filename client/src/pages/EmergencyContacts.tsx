// EmergencyContacts.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EmergencyContacts: React.FC = () => {
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSaveContacts = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        emergencyContacts: [contact1, contact2],
      });

      navigate('/dashboard'); // Redirect to dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add Emergency Contacts</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label className="block mb-2 text-sm font-medium">Emergency Contact 1</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={contact1}
            onChange={(e) => setContact1(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">Emergency Contact 2</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={contact2}
            onChange={(e) => setContact2(e.target.value)}
          />
        </div>
        <button
          onClick={handleSaveContacts}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save Contacts
        </button>
      </div>
    </div>
  );
};

export default EmergencyContacts;
