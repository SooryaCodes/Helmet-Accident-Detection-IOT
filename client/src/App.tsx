import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Signup from "./pages/Signup";
import EmergencyContacts from "./pages/EmergencyContacts";
import DeviceRegistration from "./pages/DeviceRegistration";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import Home from "./pages/Home";

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
              <PrivateRoute
                element={
                  <Layout>
                    <DeviceRegistration />
                  </Layout>
                }
              />
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
