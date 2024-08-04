import React from "react";
import "./index.css";
import App from "./App";
import Signin from "./components/signin/Signin";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup/signup";
import EditProfile from "./components/EditProfile/EditProfile";
import Settings from "./components/Settings/Settings";
import Dashboard from "./components/Dashboard/Dashboard";
import Booking from "./components/Booking/Booking";
import BookingDetail from "./components/BookingDetail/BookingDetail";
import Services from "./components/Services/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Signin />,
  },
 
  {
    path: "/services",
    element: <Services />,
  },

  {
    path:"/edit-profile",
    element: <EditProfile/>
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/booking-detail",
    element: <BookingDetail />,
  },

  
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
