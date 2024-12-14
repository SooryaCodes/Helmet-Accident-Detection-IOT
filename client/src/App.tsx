import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Signup from "./pages/Signup";
import EmergencyContacts from "./pages/EmergencyContacts";
import DeviceRegistration from "./pages/DeviceRegistration";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Routes without Layout */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/emergency-contacts"
            element={<PrivateRoute element={<EmergencyContacts />} />}
          />
          <Route
            path="/link-device"
            element={
              <PrivateRoute element={<Layout><DeviceRegistration /></Layout>} />
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
