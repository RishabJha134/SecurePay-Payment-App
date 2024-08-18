import { FaLock, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ responseData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#1E40AF] to-[#6D28D9] shadow-lg  flex justify-between items-center p-5 px-8">
      <div
        className="text-white text-2xl sm:text-3xl font-extrabold flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaLock className="inline-block mr-2 text-[#3B82F6]" size={30} />
        SecurePay
      </div>
      <div className="flex items-center">
      <div className="flex items-center bg-gradient-to-r from-[#6D28D9] to-[#1E40AF] text-white py-1 px-3 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer mr-8 border border-zinc-400">
          <FaUserCircle className="text-[#3B82F6] mr-2" size={24} />
          <span className="font-semibold text-lg sm:text-xl">
            {responseData?.user?.firstName}
          </span>
        </div>

        <div
              className="flex items-center gap-2 text-lg text-zinc-200 cursor-pointer hover:text-zinc-300 transition duration-300 ease-in-out hover:scale-105"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signup");
              }}
            >
              <FaSignOutAlt size={20} /> Logout
            </div>
      </div>
    </div>
  );
};
