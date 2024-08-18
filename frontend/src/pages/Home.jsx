import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLogin(false);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans bg-gradient-to-r from-blue-600 to-purple-700" >
      <header className="w-full flex justify-between items-center shadow-lg px-6 sm:px-12 py-5 bg-white rounded-b-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        <div className="text-2xl sm:text-3xl font-extrabold text-blue-800 flex cursor-pointer items-center">
          <FaLock className="inline-block mr-2 text-blue-600" size={30} />
          SecurePay
        </div>
        {showLogin ? (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border border-blue-900 py-2 px-4 font-medium shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none"
            >
              <FaUserPlus size={20} /> Signup
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border border-blue-900 py-2 px-4 font-medium shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none"
            >
              <FaSignInAlt size={20} /> Signin
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border border-blue-900 py-2 px-4 font-medium shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none"
            >
              <FaHome size={20} /> Dashboard
            </button>
            <div
              className="flex items-center gap-2 text-lg text-blue-600 cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out hover:scale-105"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signup");
              }}
            >
              <FaSignOutAlt size={20} /> Logout
            </div>
          </div>
        )}
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 py-8">
        <FaLock className="text-white text-8xl mb-6" />
        <h1 className="font-extrabold text-4xl sm:text-5xl mb-4 text-white transition-transform transform hover:scale-110 hover:text-yellow-400">
          Welcome to SecurePay
        </h1>

        <blockquote className="text-lg sm:text-xl mb-6 text-white italic opacity-90 transform transition-transform duration-300 ease-in-out hover:scale-105">
          "Your money, your way. Experience the future of digital payments."
        </blockquote>
        <blockquote className="text-lg sm:text-xl mb-6 text-white italic opacity-90 transform transition-transform duration-300 ease-in-out hover:scale-105">
          "Empowering you to achieve more with every transaction."
        </blockquote>
        <p className="text-lg sm:text-xl mb-4 text-gray-200">
          Join thousands of users who trust SecurePay for seamless and secure transactions.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 font-semibold shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-110"
        >
          Get Started
        </button>
      </main>
      <footer className="w-full bg-white py-6 flex justify-center items-center shadow-inner rounded-t-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        <div className="text-sm text-gray-600">
          © 2024 SecurePay. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
