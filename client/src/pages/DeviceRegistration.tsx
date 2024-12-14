import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useUserContext } from '../context/UserContext';

const DeviceRegistration: React.FC = () => {
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? parseInt(savedTimer) : 120;
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const token = localStorage.getItem('token');
  const [macAddress, setMacAddress] = useState<string | null>(null);

  // Start and manage timer
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

  // Handle scanning for Bluetooth device and reading MAC address
  const handleScanDevice = async () => {
    try {
      if (navigator.bluetooth) {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: false,
          filters: [{ name: 'SmartHelm' }], // Filter for the device named SmartHelm
          optionalServices: ['battery_service', 'your_custom_service'], // Include your custom service here
        });

        console.log('Device found:', device);

        // Connect to the device and read the MAC address from a custom characteristic
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('your_custom_service'); // Replace with your custom service UUID
        const characteristic = await service.getCharacteristic('your_mac_address_characteristic'); // Replace with your characteristic UUID

        const value = await characteristic.readValue();
        const macAddress = new TextDecoder().decode(value);
        setMacAddress(macAddress);

        console.log('MAC Address:', macAddress);
      } else {
        alert('Bluetooth not supported on this device.');
      }
    } catch (error) {
      console.error('Bluetooth scan failed:', error);
      alert('Bluetooth scan failed. Please try again.');
    }
  };

  // Handle device registration
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
          navigate('/home'); // Redirect to home page after successful registration
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

  // Reset timer and registration state when the device is registered or time is up
  useEffect(() => {
    if (isRegistered || timer <= 0) {
      localStorage.removeItem('timer');
      setTimer(120); // Reset to 120 seconds for the next registration attempt
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
          <div className="h-full flex flex-col justify-between p-6 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Device Registration</h2>
            <p className="text-lg mb-4">
              Follow the instructions below to complete the device registration.
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Press the button on the device.</li>
              <li>Select "SmartHelm" from the available Bluetooth devices.</li>
              <li>
                Once connected, click the "Link Device" button to successfully register your device.
              </li>
            </ol>
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-4">
                Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={handleScanDevice}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                disabled={timer <= 0 || isRegistered}
              >
                Scan for Device
              </button>
              {macAddress && (
                <div className="mt-4 text-lg font-semibold">
                  Device MAC Address: {macAddress}
                </div>
              )}
              <button
                onClick={handleRegister}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
                disabled={!macAddress || timer <= 0 || isRegistered}
              >
                Link Device
              </button>
              {isRegistered && (
                <div className="mt-4 text-green-500">
                  Device Registered Successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistration;
