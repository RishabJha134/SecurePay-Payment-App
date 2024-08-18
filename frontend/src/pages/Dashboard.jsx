import React, { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "./Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(null); // Set initial value for balance
  const [responseData, setResponseData] = useState("");

  // Fetch current user's data
  async function getResponseCurrentUserData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: "Bearer " + token, // Ensure a space between "Bearer" and the token
          },
        }
      );

      // Set the response data to state
      if (response.data) {
        setResponseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  }

  useEffect(() => {
    getResponseCurrentUserData();
  }, []);

  // Fetch user's account balance
  async function getBalance() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + token, // Ensure a space between "Bearer" and the token
          },
        }
      );

      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getBalance(); // Call getBalance only if token exists
    }
  }, [token]);

  return (
    <div>
      <Appbar responseData={responseData} />
      <div className="m-8">
        <Balance value={balance}></Balance>
        <Users responseData={responseData}></Users>
      </div>
    </div>
  );
};
