import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react'; // Flowbite UI components for button and card
import { useNavigate } from 'react-router-dom'; // For navigation after registration

const DeviceRegistration: React.FC = () => {
  const [timer, setTimer] = useState<number>(() => {
    // Retrieve the saved timer value from localStorage, default to 120 seconds
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? parseInt(savedTimer) : 120;
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const navigate = useNavigate();

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0 && !isRegistered) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('timer', newTimer.toString()); // Save updated timer to localStorage
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [timer, isRegistered]);

  const handleRegister = () => {
    if (timer > 0) {
      // Logic to handle device registration (e.g., API call)
      setIsRegistered(true);
      alert('Device registered successfully!');
      navigate('/next-page'); // Redirect to the next page after successful registration
    } else {
      alert('Time is up! You missed the 2-minute window.');
    }
  };

  // Reset the timer when the page is refreshed or after successful registration
  useEffect(() => {
    if (isRegistered || timer <= 0) {
      // Reset the timer when the device is registered or time is up
      localStorage.removeItem('timer');
      setTimer(120); // Reset the timer to 2 minutes
    }
  }, [isRegistered, timer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex gap-6">
        {/* Left side: Image or Video */}
        <div className="w-full sm:w-1/2">
          <div className="overflow-hidden rounded-lg">
            {/* Add image or video here */}
            <img
              src="/device.jpg" // Replace with the actual image URL or a video component
              alt="Device"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Right side: Instructions and Timer */}
        <div className="w-full sm:w-1/2">
          <Card className="h-full flex flex-col justify-between p-6 bg-blue-50">
            <h2 className="text-xl font-semibold mb-4">Device Registration</h2>
            <p className="text-lg mb-4">
              Follow the instructions below to complete the device registration.
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Press the button on the device.</li>
              <li>Once you press the button, you have 2 minutes to register your device.</li>
              <li>Click the "Register Device" button within 2 minutes to successfully register your device.</li>
            </ol>
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-4">
                Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <Button
                onClick={handleRegister}
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={timer <= 0 || isRegistered}
              >
                Register Device
              </Button>
              {isRegistered && <div className="mt-4 text-green-500">Device Registered Successfully!</div>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistration;
