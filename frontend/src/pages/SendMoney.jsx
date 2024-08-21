import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Appbar } from "../components/AppBar";
import { BaseUrl } from "../BaseUrl";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleTransfer = async () => {
    console.log("clicked amount");
    try {
      const response = await axios.post(
        `${BaseUrl}/api/v1/account/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setAmount(""); // Clear the input field
        setShowPopup(true); // Show the success popup
      } else {
        alert("Failed to transfer!");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      alert("An error occurred during the transfer!");
    }
  };

  return (
    <>

<Appbar></Appbar>

<div className="flex justify-center h-screen bg-gradient-to-r from-[#1E40AF] via-[#6D28D9] to-[#1D4ED8] p-6">
    
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min text-[#4B5563] max-w-md p-6 space-y-8 w-full bg-white shadow-2xl rounded-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-4xl font-bold text-center text-[#1E40AF]">
            Send Money
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300 ease-in-out">
              <span className="text-3xl text-white">
                {name[0].toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-[#1E40AF]">{name}</h3>
          </div>
          <div className="space-y-6 mt-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none text-[#4B5563]"
                htmlFor="amount"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="flex h-12 w-full rounded-md border border-[#D1D5DB] bg-[#F3F4F6] px-4 py-2 text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none shadow-md"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button
              onClick={handleTransfer}
              className="flex justify-center items-center rounded-md text-sm font-medium bg-[#1D4ED8] hover:bg-[#3B82F6] text-white h-12 px-4 py-2 w-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>

    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#1E40AF] mb-4">Success!</h2>
          <p className="text-[#4B5563]">The transfer was successful.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-6 bg-[#1D4ED8] hover:bg-[#3B82F6] text-white py-2 px-4 rounded-lg shadow"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>

    </>
   
  );
};
