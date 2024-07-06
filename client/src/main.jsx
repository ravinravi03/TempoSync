// main.jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";
import "./index.css";
import LoginScreen from "./components/LoginPage/LoginScreen";
import MainLayout from "./components/Other/MainLayout";
import AuthTestComponent from "./components/Testing/AuthTestComponent";
import HookTesting from "./components/Testing/HookTesting";
import HomePage from "./components/HomePage/HomePage";
import { AppContextProvider } from "./AppContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <AuthTestComponent /> },
      { path: "login", element: <LoginScreen /> },
      { path: "testing", element: <HookTesting/> },
      {
        path: "main",
        element: <MainLayout />,
        children: [
          { path: "home", element: <HomePage /> },
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
