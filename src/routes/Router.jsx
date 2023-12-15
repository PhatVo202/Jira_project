import React from "react";
import { useRoutes } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import CreateProject from "../pages/createproject/CreateProject";
import EditProject from "../pages/editproject/EditProject";

import Login from "../pages/login/Login";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import Profile from "../pages/profile/Profile";
import ProjectDetail from "../pages/projectdetail/ProjectDetail";
import ProjectManagement from "../pages/projectmanagement/ProjectManagement";
import Register from "../pages/register/Register";
import UserManagement from "../pages/usermanagement/UserManagement";
import HomeLayout from "../layouts/home/HomeLayout";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <NoAuthGuard />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
    {
      path: "/login",
      element: <NoAuthGuard />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/register",
      element: <NoAuthGuard />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/jira",
      element: <HomeLayout />,
      children: [
        {
          path: "/jira",
          element: <AuthGuard />,
          children: [
            {
              path: "/jira/projectmanagement",
              element: <ProjectManagement />,
            },
            {
              path: "/jira/user",
              element: <UserManagement />,
            },
            {
              path: "/jira/my-profile",
              element: <Profile />,
            },
            {
              path: "/jira/createproject",
              element: <CreateProject />,
            },
            {
              path: "/jira/projectdetail/:id",
              element: <ProjectDetail />,
            },
            {
              path: "/jira/edit/:id",
              element: <EditProject />,
            },
          ],
        },
      ],
    },

    // {
    //   path: "/edit/:id",
    //   element: <EditProject />,
    // },

    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routing;
}
