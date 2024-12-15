import React, { useState } from "react";
import axios from "../config/axios"; // Axios setup from previous steps
import {  useNavigate } from "react-router-dom"; // For navigation after form submission

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState({
    primaryPhone: "",
    secondaryPhone: "",
  });
  const navigate = useNavigate(); // For redirection after successful submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/api/user/add-emergency-contacts",
        contacts,
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
    <div className="grid h-screen grid-cols-1 gap-10 px-10 md:grid-cols-5 md:px-0 ">
      <div className=" col-span-2 hidden h-full w-full md:block ">
        {" "}
        <img
          src="/gradient.jpg"
          className="h-full w-full   object-cover "
          alt=""
        />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center md:col-span-3">
        <div className="mb-10 grid place-items-center">
          <ol className="hidden  w-full items-center gap-5  space-y-4 md:flex  lg:space-x-4 lg:space-y-0">
          
            <li className="relative  ">
              <a className="flex w-full items-center font-medium  ">
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8  lg:w-8 lg:text-sm">
                  1
                </span>
                <div className="block">
                  <h4 className="text-xs text-gray-900  lg:text-base">
                    Create Account
                  </h4>
                </div>
                <svg
                  className="ml-2 h-5 w-5 stroke-gray-900 sm:ml-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                    stroke="stroke-current"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </li>
            <li className="relative ">
              <a
                href="https://pagedone.io/"
                className="flex w-full items-center font-medium  "
              >
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-indigo-600 text-xs text-white lg:h-8 lg:w-8 lg:text-sm">
                  {" "}
                  2{" "}
                </span>
                <div className="block">
                  <h4 className="text-xs text-indigo-600  lg:text-base">
                    Add Contacts
                  </h4>
                </div>
                <svg
                  className="ml-2 h-5 w-5 stroke-indigo-600 sm:ml-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                    stroke="stroke-current"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </li>
            <li className="relative  ">
              <a className="flex w-full items-center font-medium  ">
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8  lg:w-8 lg:text-sm">
                  3
                </span>
                <div className="block">
                  <h4 className="text-xs text-gray-900  lg:text-base">
                    Link Device
                  </h4>
                </div>
              </a>
            </li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md md:max-w-xl">
          {/* {error && <div className="mb-4 text-red-600">{error}</div>}{" "} */}
          {/* Error message display */}
          <span className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
            Stay Safe, Stay Connected
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
          <h1 className="mb-7 mt-3 text-2xl  font-semibold text-black lg:text-3xl">
            Add Emergency Contacts to Alert Them in Critical Situations
          </h1>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-800">
              Primary phone number
            </label>
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
                required
                placeholder="XXXX XXX XXX"
                className="w-full appearance-none rounded-lg border bg-transparent py-3  pl-[4.5rem] pr-3 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-800">
              Secondary phone number
            </label>
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
                required
                placeholder="XXXX XXX XXX"
                className="w-full appearance-none rounded-lg border bg-transparent py-3  pl-[4.5rem] pr-3 shadow-sm outline-none focus:border-indigo-600"
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

export default EmergencyContacts