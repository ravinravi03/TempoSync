import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginScreen from "./components/LoginPage/LoginScreen";
import Home from "./components/HomePage/Home";
import AuthTestComponent from "./components/Testing/AuthTestComponent";

const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthTestComponent/>
    },
    {
      path: "/login",
      element: <LoginScreen/>,
    },
    {
      path: "/main/home",
      element: <Home/>,
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);