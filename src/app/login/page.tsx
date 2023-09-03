"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    // email: "",
    password: "",
    // contact: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("successfully Login", response.data);
      // toast.success("Successfully Registered");

      router.push("/profile");
    } catch (error: any) {
      // toast.error(error.message);
      console.log("failed Login", error.message);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>
        </div>
        <div className="w-full px-8 py-8 mt-8 overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100 shadow-md sm:max-w-md sm:rounded-lg">
         
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  id="username"
                  type="text"
                  // name="name"
                  value={user.username}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 "
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
            </div>

            {/* <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div> */}
            {/* <div className="mt-4">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Contact
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  id="contact"
                  value={user.contact}
                  onChange={(e) => setUser({ ...user, contact: e.target.value })}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div> */}

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  id="password"
                  type="password"
                  // name="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700"
                />
              </div>
            </div>
            {/* <div className="mt-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700 undefined"
                    >
                        Confirm Password
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="password"
                            name="password_confirmation"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div> */}
            <div className="flex items-center justify-end mt-4">
              <Link
                href="/signup"
                className="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Not registered?
              </Link>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
         
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
