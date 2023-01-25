import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Github from "./pages/Github";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/github",
      element: <Github />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default App;
