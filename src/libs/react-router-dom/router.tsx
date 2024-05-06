import {
  PATH_DETAIL,
  PATH_HOME,
  PATH_MY,
  PATH_NOT_FOUND,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
} from "@/constants"
import { Detail, Home, My, NotFound, SignIn, SignUp } from "@/pages"

import { Outlet, createBrowserRouter } from "react-router-dom"
import { AuthRoute } from "./auth-route"

export const Router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: PATH_HOME,
        element: <Home />,
      },
      {
        path: PATH_SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PATH_SIGN_UP,
        element: <SignUp />,
      },
    ],
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: PATH_MY,
        element: <My />,
      },
      {
        path: PATH_DETAIL,
        element: <Detail />,
      },
    ],
  },
  {
    path: PATH_NOT_FOUND,
    element: <NotFound />,
  },
])
