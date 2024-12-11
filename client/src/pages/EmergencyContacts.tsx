import React, { useState } from 'react';
import axios from '../config/axios'; // Axios setup from previous steps
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import { TextInput, Button, Label } from 'flowbite-react'; // Import Flowbite components for styling

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
          <Label htmlFor="primaryPhone" className="block text-lg mb-2">Primary Phone</Label>
          <TextInput
            id="primaryPhone"
            type="tel"
            placeholder="Enter primary phone number"
            value={contacts.primaryPhone}
            onChange={(e) => setContacts({ ...contacts, primaryPhone: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="secondaryPhone" className="block text-lg mb-2">Secondary Phone</Label>
          <TextInput
            id="secondaryPhone"
            type="tel"
            placeholder="Enter secondary phone number"
            value={contacts.secondaryPhone}
            onChange={(e) => setContacts({ ...contacts, secondaryPhone: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Save Contacts
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyContacts;
