import React, { useState } from 'react';
import axios from '../config/axios'; // Axios setup from previous steps
import { useNavigate } from 'react-router-dom'; // For navigation after form submission

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState({ primaryPhone: '', secondaryPhone: '' });
  const navigate = useNavigate(); // For redirection after successful submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        '/api/user/add-emergency-contacts',
        contacts
      );

      if (response.status === 200) {
        // Redirect to the IoT device registration page after successful response
        navigate('/iot-device-registration');
      }
    } catch (err) {
      console.error('Error adding emergency contacts:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Emergency Contacts</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="primaryPhone" className="block text-lg mb-2">Primary Phone</label>
          <input
            id="primaryPhone"
            type="tel"
            placeholder="Enter primary phone number"
            value={contacts.primaryPhone}
            onChange={(e) => setContacts({ ...contacts, primaryPhone: e.target.value })}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="secondaryPhone" className="block text-lg mb-2">Secondary Phone</label>
          <input
            id="secondaryPhone"
            type="tel"
            placeholder="Enter secondary phone number"
            value={contacts.secondaryPhone}
            onChange={(e) => setContacts({ ...contacts, secondaryPhone: e.target.value })}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full">
            Save Contacts
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyContacts;
