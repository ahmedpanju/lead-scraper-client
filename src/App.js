import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Github from "./pages/Github";
import Home from "./pages/Home";
import Twitter from "./pages/Twitter";
import Lead from "./pages/Lead";
import UsersProvider from "./context/users";
import SearchProvider from "./context/search";

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
    {
      path: "/lead",
      element: <Lead />,
    },
  ]);

  return (
    <div>
      <SearchProvider>
        <UsersProvider>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-center" />
        </UsersProvider>
      </SearchProvider>
    </div>
  );
};

export default App;
