import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SecondLayout from "../Layout/SecondLayout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
    ],
  },
  {
    path: "/login",
    element: <SecondLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
