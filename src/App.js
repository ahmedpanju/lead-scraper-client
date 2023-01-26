import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Github from "./pages/Github";
import Home from "./pages/Home";
import Twitter from "./pages/Twitter";
import UsersProvider from "./context/users";

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
    {
      path: "/twitter",
      element: <Twitter />,
    },
  ]);

  return (
    <div>
      <UsersProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-center" />
      </UsersProvider>
    </div>
  );
};

export default App;
