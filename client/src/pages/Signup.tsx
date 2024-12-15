import { useEffect, useState } from "react";
import axios from "../config/axios"; // Axios setup from previous steps
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    general: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      phone: "",
      general: "",
    };

    if (!userData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("/api/auth/signup", userData);
      console.log("Success:", response.status);

      if (response.status === 201) {
        // Store the token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to emergency contacts page
        navigate("/emergency-contacts");
      }
    } catch (err: any) {
      console.error("Error signing up:", err);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to sign up. Please try again.",
      }));
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-10 px-10 md:grid-cols-5 md:px-0 ">
      <div className="col-span-2 hidden h-full w-full md:block">
        <img
          src="/gradient.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center md:col-span-3">
        <div className="mb-10 grid place-items-center">
          <ol className="hidden  w-full items-center gap-5  space-y-4 md:flex  lg:space-x-4 lg:space-y-0">
            <li className="relative ">
              <a
                href="https://pagedone.io/"
                className="flex w-full items-center font-medium  "
              >
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-indigo-600 text-xs text-white lg:h-8 lg:w-8 lg:text-sm">
                  {" "}
                  1{" "}
                </span>
                <div className="block">
                  <h4 className="text-xs text-indigo-600  lg:text-base">
                    Create Account
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
                  2
                </span>
                <div className="block">
                  <h4 className="text-xs text-gray-900  lg:text-base">
                    Add Contacts
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
          {errors.general && (
            <div className="mb-4 text-red-600">{errors.general}</div>
          )}

          <h1 className="mb-7 mt-3 text-2xl font-semibold text-black lg:text-3xl">
            Register Your SmartHelm and Stay Protected, Anytime, Anywhere
          </h1>

          {/* Name */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Name</label>
            <div className="relative my-2 max-w-full">
              <input
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full rounded-lg border bg-transparent py-3 pl-3 pr-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
              {errors.name && (
                <div className="mt-1 text-sm text-red-600">{errors.name}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Email</label>
            <div className="relative my-2 max-w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full rounded-lg border bg-transparent py-3 pl-3 pr-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
              {errors.email && (
                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Phone number</label>
            <div className="relative my-2 max-w-full">
              <input
                type="number"
                placeholder="XXXX XXX XXX"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full rounded-lg border bg-transparent py-3 pl-3 pr-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
              {errors.phone && (
                <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Password</label>
            <div className="relative my-2 max-w-full">
              <input
                type="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full rounded-lg border bg-transparent py-3 pl-3 pr-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
              {errors.password && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <p className="mt-5 text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Sign in!
            </Link>
          </p>
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Sign up and continue
          </button>
        </form>
      </div>
    </div>
  );
}
