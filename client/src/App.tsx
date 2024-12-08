// import { DarkThemeToggle } from "flowbite-react";

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<div>Welcome to the Dashboard!</div>} />
      </Routes>
    </Router>
  );
};

export default App;



// <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
// <h1 className="text-2xl dark:text-white">Flowbite React + Vite</h1>
// <DarkThemeToggle />
// </main>