import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useUserContext } from '../context/UserContext'; // Adjust path to your UserContext

const DeviceRegistration: React.FC = () => {
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? parseInt(savedTimer) : 120;
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUserContext(); // Correct usage of useUserContext
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const [macAddress, setMacAddress] = useState<string | null>(null);

  useEffect(() => {
    if (timer > 0 && !isRegistered) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isRegistered]);

  const handleScanDevice = async () => {
    try {
      if (navigator.bluetooth) {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service'],
        });
        console.log('Device found:', device);

        // Retrieve the MAC address
        const macAddress = device.id;
        setMacAddress(macAddress);
        console.log('MAC Address:', macAddress);
      } else {
        alert('Bluetooth not supported on this device.');
      }
    } catch (error) {
      console.error('Bluetooth scan failed:', error);
      alert('Bluetooth scan failed.');
    }
  };

  const handleRegister = async () => {
    if (macAddress && user?._id) {
      try {
        const response = await axios.post(
          '/link-user',
          { userId: user._id, macAddress },
          {
            headers: {
              Authorization: token, // Include token in Authorization header
            },
          }
        );

        if (response.status === 200) {
          alert(response.data.message || 'Device registered successfully!');
          setIsRegistered(true);
          navigate('/home'); // Redirect to home page
        } else {
          alert(response.data.message || 'Registration failed!');
        }
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred during registration.');
      }
    } else {
      alert('No MAC address found or user ID is missing.');
    }
  };

  useEffect(() => {
    if (isRegistered || timer <= 0) {
      localStorage.removeItem('timer');
      setTimer(120);
    }
  }, [isRegistered, timer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex gap-6">
        <div className="w-full sm:w-1/2">
          <div className="overflow-hidden rounded-lg">
            <img src="/device.jpg" alt="Device" className="w-full object-cover" />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <Card className="h-full flex flex-col justify-between p-6 bg-blue-50">
            <h2 className="text-xl font-semibold mb-4">Device Registration</h2>
            <p className="text-lg mb-4">
              Follow the instructions below to complete the device registration.
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Press the button on the device.</li>
              <li>You have 2 minutes to register your device.</li>
              <li>
                Click the "Register Device" button within 2 minutes to successfully register your device.
              </li>
            </ol>
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-4">
                Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <Button
                onClick={handleScanDevice}
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={timer <= 0 || isRegistered}
              >
                Scan for Device
              </Button>
              {macAddress && (
                <div className="mt-4 text-lg font-semibold">
                  Device MAC Address: {macAddress}
                </div>
              )}
              <Button
                onClick={handleRegister}
                className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
                disabled={!macAddress || timer <= 0 || isRegistered}
              >
                Register Device
              </Button>
              {isRegistered && (
                <div className="mt-4 text-green-500">
                  Device Registered Successfully!
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistration;
