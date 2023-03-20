import React from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import CreateProject from "../pages/createproject/CreateProject";
import EditProject from "../pages/editproject/EditProject";

import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import ProjectManagement from "../pages/projectmanagement/ProjectManagement";
import Register from "../pages/register/Register";
import UserManagement from "../pages/usermanagement/UserManagement";

export default function Router() {
  const routing = useRoutes([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/projectmanagement",
      element: <ProjectManagement />,
    },
    {
      path: "/edit/:id",
      element: <EditProject />,
    },
    {
      path: "/createproject",
      element: <CreateProject />,
    },
    {
      path: "/my-profile",
      element: <Profile />,
    },
    {
      path: "/user",
      element: <UserManagement />,
    },
  ]);

  return routing;
}
