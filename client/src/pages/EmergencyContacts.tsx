import React, { useState } from "react";
import axios from "../config/axios"; // Axios setup from previous steps
import { useNavigate } from "react-router-dom"; // For navigation after form submission

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState({
    primaryPhone: "",
    secondaryPhone: "",
  });
  const [error, setError] = useState<string | null>(null); // To store error message
  const navigate = useNavigate(); // For redirection after successful submission

  const validatePhone = (phone: string) => {
    // Validate phone number to ensure it's in the correct format (e.g., +91 XXXXXXXXXX)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous error messages
    setError(null);

    // Validate the phone numbers
    if (!contacts.primaryPhone || !validatePhone(contacts.primaryPhone)) {
      setError("Please enter a valid primary phone number (+91 XXXXXXXXXX).");
      return;
    }

    if (!contacts.secondaryPhone || !validatePhone(contacts.secondaryPhone)) {
      setError("Please enter a valid secondary phone number (+91 XXXXXXXXXX).");
      return;
    }

    try {
      const response = await axios.put(
        "/api/user/add-emergency-contacts",
        contacts
      );

      if (response.status === 200) {
        // Redirect to the IoT device registration page after successful response
        navigate("/link-device");
      }
    } catch (err) {
      console.error("Error adding emergency contacts:", err);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-10 px-10 md:grid-cols-5 md:px-0">
      <div className="col-span-2 hidden h-full w-full md:block">
        <img src="/gradient.jpg" className="h-full w-full object-cover" alt="" />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center md:col-span-3">
        

        <form onSubmit={handleSubmit} className="max-w-md md:max-w-xl">
          {error && <div className="mb-4 text-red-600">{error}</div>} {/* Error message display */}
          <span className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
            Ride Safe, Stay Connected
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-6 w-6 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          <h1 className="mb-7 mt-3 text-2xl font-semibold text-black lg:text-3xl">
            Add Emergency Contacts to Alert Them in Critical Situations
          </h1>

          {/* Primary Phone */}
          <div>
            <label className="text-sm text-gray-800">Primary phone number</label>
            <div className="relative my-2 max-w-full text-sm text-gray-500">
              <div className="absolute inset-y-0 left-3 my-auto flex h-6 items-center border-r pr-2">
                <span className="h-full rounded-lg bg-transparent text-sm outline-none">
                  +91 &nbsp;
                </span>
              </div>
              <input
                id="primaryPhone"
                type="tel"
                value={contacts.primaryPhone}
                onChange={(e) =>
                  setContacts({ ...contacts, primaryPhone: e.target.value })
                }
                placeholder="XXXX XXX XXX"
                className="w-full appearance-none rounded-lg border bg-transparent py-3 pl-[4.5rem] pr-3 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Secondary Phone */}
          <div>
            <label className="text-sm text-gray-800">Secondary phone number</label>
            <div className="relative my-2 max-w-full text-sm text-gray-500">
              <div className="absolute inset-y-0 left-3 my-auto flex h-6 items-center border-r pr-2">
                <span className="h-full rounded-lg bg-transparent text-sm outline-none">
                  +91 &nbsp;
                </span>
              </div>
              <input
                id="secondaryPhone"
                type="tel"
                value={contacts.secondaryPhone}
                onChange={(e) =>
                  setContacts({ ...contacts, secondaryPhone: e.target.value })
                }
                placeholder="XXXX XXX XXX"
                className="w-full appearance-none rounded-lg border bg-transparent py-3 pl-[4.5rem] pr-3 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyContacts;
