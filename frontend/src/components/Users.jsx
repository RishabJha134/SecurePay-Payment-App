import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = ({ responseData }) => {
  const [users, setUsers] = useState([]);
  const [filterInputValue, setFilterInputValue] = useState("");

  // Function to fetch the filtered list of users
  async function getUsers() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/bulk",
        {
          filter: filterInputValue, // Search filter input
          currentUserId: responseData?.user?._id, // Your current user's ID
        }
      );

      // Update users state with the response data
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Fetch users when the filter input changes
  useEffect(() => {
    getUsers();
  }, [filterInputValue]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilterInputValue(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

// Single User Component
function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-[#D1D5DB] rounded-lg mb-4 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="bg-[#7C3AED] text-white rounded-full h-12 w-12 flex items-center justify-center mr-4 text-xl transition-all hover:bg-[#3B82F6]">
          {user.firstName[0]}
        </div>
        <div className="text-[#4B5563]">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        label="Send Money"
        className="bg-[#1D4ED8] text-white py-2 px-4  rounded-lg shadow-md hover:bg-[#6D28D9] hover:shadow-lg transition-all"
      />
    </div>
  );
}
