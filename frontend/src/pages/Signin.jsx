import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

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
          {showError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Signin Failed! </strong>
              <span className="block sm:inline">
                Invalid credentials, please try again.
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setShowError(false)}
              ></span>
            </div>
          )}

          <Heading
            label={"Welcome Back"}
            className="text-[#1E40AF] font-bold text-2xl"
          />
          <SubHeading
            label={"Login to access your account"}
            className="text-[#D1D5DB] mt-2"
          />

          <div className="mt-6">
            <InputBox
              onChange={usernameHandler}
              placeholder="you@example.com"
              label={"Email"}
              className="border-b-2 border-[#1E40AF] focus:border-[#6D28D9]"
            />

            <input
              onChange={passwordHandler}
              label={"Password"}
              placeholder="Password"
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="password"
            />
          </div>

          <div className="pt-6">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BaseUrl}/api/v1/user/signin`,
                    {
                      username: username,
                      password: password,
                    }
                  );
                  if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                  } else {
                    setShowError(true);
                  }
                } catch (err) {
                  setShowError(true);
                  console.error(err);
                }
              }}
              label={"Sign In"}
              className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
            className="text-[#7C3AED] pt-4 hover:underline"
          />
        </div>
      </div>
    </div>
  );
};
