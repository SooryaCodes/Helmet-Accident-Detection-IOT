// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Signup from './pages/Signup';
import EmergencyContacts from './pages/EmergencyContacts'; // Assuming you have this page
import DeviceRegistration from './pages/DeviceRegistration';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          <Route path="/register-device" element={<DeviceRegistration />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
