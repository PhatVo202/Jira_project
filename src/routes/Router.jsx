import React from "react";
import { useRoutes } from "react-router-dom";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return routing;
}
