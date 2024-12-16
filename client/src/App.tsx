import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Signup from "./pages/Signup";
import EmergencyContacts from "./pages/EmergencyContacts";
import DeviceRegistration from "./pages/DeviceRegistration";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BluetoothDeviceScanner from "./pages/Bt";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Routes without Layout */}
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          {/* Protected Routes with Layout */}
          <Route
            path="/emergency-contacts"
            element={
              <Layout>
                <EmergencyContacts />
              </Layout>
            }
          />
          <Route
            path="/link-device"
            element={
              <Layout>
                <DeviceRegistration />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
            path="/bt"
            element={
              <Layout>
                <BluetoothDeviceScanner />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
