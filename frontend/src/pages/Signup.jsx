import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function firstNameHandler(e) {
    setFirstName(e.target.value);
  }
  function lastNameHandler(e) {
    setLastName(e.target.value);
  }
  function usernameHandler(e) {
    setUsername(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#1E40AF] to-[#6D28D9] h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl shadow-2xl bg-white w-96 text-center p-8 transition-transform duration-500 hover:scale-105">
          <Heading label={"Create Your Account"} className="text-[#1E40AF] font-bold text-2xl" />
          <SubHeading label={"Join us and make payments with ease"} className="text-[#D1D5DB] mt-2" />

          <div className="mt-6">
            <InputBox
              onChange={firstNameHandler}
              placeholder="John"
              label={"First Name"}
              className="border-b-2 border-[#1E40AF] focus:border-[#6D28D9]"
            />
            <InputBox
              onChange={lastNameHandler}
              placeholder="Doe"
              label={"Last Name"}
              className="border-b-2 border-[#1E40AF] focus:border-[#6D28D9]"
            />
            <InputBox
              onChange={usernameHandler}
              placeholder="you@example.com"
              label={"Email"}
              className="border-b-2 border-[#1E40AF] focus:border-[#6D28D9]"
            />
            <InputBox
              onChange={passwordHandler}
              placeholder="Password"
              label={"Password"}
              type="password"
              className="border-b-2 border-[#1E40AF] focus:border-[#6D28D9]"
            />
          </div>

          <div className="pt-6">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/signin");
              }}
              label={"Sign Up"}
              className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform hover:scale-105"
            />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
            className="text-[#7C3AED] pt-4 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};
