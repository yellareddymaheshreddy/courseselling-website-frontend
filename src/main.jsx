
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage.jsx";

import LoginPageWrapper from "./pages/LoginPageWrapper.jsx";
import AdminCourseCreationPage from "./pages/AdminCourseCreationPage.jsx";
import Container from "./pages/Container.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AdminSignupPage from "./pages/AdminSignupPage.jsx";
// import UserDashboard from "./pages/UserDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import CourseCreatorDashboard from "./pages/CourseCreatorDashboard.jsx";
import UserSignupPage from "./pages/UserSignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/", // Base route
    element: <Container />, // Main page component
    children: [
      {
        path: "user", // User section
        children: [
          {
            path: "signup", // user/signup route
            element: <UserSignupPage />,
          },
          {
            path: "courses",
            element: <CoursesPage />,
          },
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
        ],
      },
      {
        path: "login", // user/login route
        element: <LoginPageWrapper />,
      },
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "admin", // Admin section
        children: [
          {
            path: "signup", // admin/login route
            element: <AdminSignupPage />, // Example admin login component
          },
          {
            path: "create-course", // admin/dashboard route
            element: <AdminCourseCreationPage />, // Example admin dashboard component
          },
          {
            path: "dashboard", // admin/dashboard route
            element: <CourseCreatorDashboard />, // Example admin dashboard component
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
