// import { DarkThemeToggle } from "flowbite-react";

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EmergencyContacts from './pages/EmergencyContacts';
import SignUp from './pages/Signup';
import Home from './pages/Home';

const App: React.FC = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;



// <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
// <h1 className="text-2xl dark:text-white">Flowbite React + Vite</h1>
// <DarkThemeToggle />
// </main>