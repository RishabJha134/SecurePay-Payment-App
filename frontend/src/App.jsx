import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Home from "./pages/Home";
import {PrivateRoute,PrivateRoute2} from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route
            path="/signup"
            element={
              <PrivateRoute2>
                <Signup></Signup>
              </PrivateRoute2>
            }
          />
          <Route
            path="/signin"
            element={
              <PrivateRoute2>
                <Signin></Signin>
              </PrivateRoute2>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendMoney />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
