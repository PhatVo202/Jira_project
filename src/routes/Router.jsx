import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import AuthGuard from '../guards/AuthGuard'
import NoAuthGuard from '../guards/NoAuthGuard'

const Login = lazy(() => import('../pages/login/Login'))
const Register = lazy(() => import('../pages/register/Register'))
const ProjectManagement = lazy(() => import('../pages/projectmanagement/ProjectManagement'))
const UserManagement = lazy(() => import('../pages/usermanagement/UserManagement'))
const Profile = lazy(() => import('../pages/profile/Profile'))
const CreateProject = lazy(() => import('../pages/createproject/CreateProject'))
const ProjectDetail = lazy(() => import('../pages/projectdetail/ProjectDetail'))
const EditProject = lazy(() => import('../pages/editproject/EditProject'))
const PageNotFound = lazy(() => import('../pages/pageNotFound/PageNotFound'))

const HomeLayout = lazy(() => import('../layouts/home/HomeLayout'))

export default function Router() {
  const routing = useRoutes([
    {
      path: '/',
      element: <Navigate to='/login' replace />
    },
    {
      path: '/login',
      element: <NoAuthGuard />,
      children: [
        {
          path: '/login',
          element: (
            <Suspense>
              <Login />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/register',
      element: <NoAuthGuard />,
      children: [
        {
          path: '/register',
          element: (
            <Suspense>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/jira',
      element: (
        <Suspense>
          <HomeLayout />
        </Suspense>
      ),
      children: [
        {
          path: '/jira',
          element: <AuthGuard />,
          children: [
            {
              path: '/jira/projectmanagement',
              element: (
                <Suspense>
                  <ProjectManagement />
                </Suspense>
              )
            },
            {
              path: '/jira/user',
              element: (
                <Suspense>
                  <UserManagement />
                </Suspense>
              )
            },
            {
              path: '/jira/my-profile',
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: '/jira/createproject',
              element: (
                <Suspense>
                  <CreateProject />
                </Suspense>
              )
            },
            {
              path: '/jira/projectdetail/:id',
              element: (
                <Suspense>
                  <ProjectDetail />
                </Suspense>
              )
            },
            {
              path: '/jira/edit/:id',
              element: (
                <Suspense>
                  <EditProject />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      )
    }
  ])

  return routing
}
