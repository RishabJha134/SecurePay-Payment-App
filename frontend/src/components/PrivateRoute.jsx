import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // console.log(children);
  const token = localStorage.getItem("token");

  if (token) {
    // console.log("private route wala token: " + token);
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

const PrivateRoute2 = ({ children }) => {
  // console.log(children);
  const token = localStorage.getItem("token");

  if (!token) {
    // console.log("private route wala token: " + token);
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export { PrivateRoute, PrivateRoute2 };
