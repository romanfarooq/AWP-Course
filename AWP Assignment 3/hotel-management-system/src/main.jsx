import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BookingContextProvider from "./context/BookingContext";
import Admin from "./components/Admin";
import Customer from "./components/Customer";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/customer",
    element: <Customer />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </BookingContextProvider>
  </React.StrictMode>
);
