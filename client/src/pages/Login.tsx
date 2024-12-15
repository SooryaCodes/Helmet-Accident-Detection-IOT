import React, { useState } from "react";
import axios from "../config/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    const errors = { email: "", password: "" };

    // Email validation
    if (!userData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userData.email)
    ) {
      errors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!userData.password.trim()) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Perform validation before submitting
    if (!validateInputs()) return;

    try {
      const response = await axios.post("/api/auth/login", userData);
      console.log("Success:", response.status);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-10 px-10 md:grid-cols-5 md:px-0">
      <div className="col-span-2 hidden h-full w-full md:block">
        <img
          src="/gradient.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center md:col-span-3">
        <form onSubmit={handleSubmit} className="max-w-md md:max-w-xl">
          {error && <div className="mb-4 text-red-600">{error}</div>}
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
          <h1 className="mb-7 mt-3 text-2xl font-semibold text-black lg:text-3xl">
            Login to your SmartHelm Account
          </h1>

          {/* Email */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Email</label>
            <div className="relative my-2 max-w-full">
              <input
                required
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full rounded-lg border bg-transparent py-3 px-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
            </div>
            {validationErrors.email && (
              <p className="text-xs text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-sm text-gray-800">Password</label>
            <div className="relative my-2 max-w-full">
              <input
                required
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full rounded-lg border bg-transparent py-3 px-3 text-sm text-gray-800 outline-none focus:border-blue-600"
              />
            </div>
            {validationErrors.password && (
              <p className="text-xs text-red-600">{validationErrors.password}</p>
            )}
          </div>

          <p className="mt-5 text-xs text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Sign up now!
            </Link>
          </p>
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
