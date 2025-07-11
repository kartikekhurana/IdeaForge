import "./index.css";
import Hero from "./components/Hero";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./components/Rootlayout";
import About from "./pages/About";
import Ai from "./pages/Ai";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";
import PreLoader from "./components/PreLoader";
import ProctectedRoute from "./components/ProctectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateIdea from "./pages/dashboard/CreateIdea";
import MyIdeas from "./pages/dashboard/MyIdeas";
import AiSpark from "./pages/dashboard/AiSpark";
import Profile from "./pages/dashboard/Profile";
import SmoothScrolling from "./components/SmoothScrolling";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminIdeas from "./pages/admin/AdminIdeas";
import AdminIdeaDetail from "./pages/admin/AdminIdeaDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/AI",
        element: <Ai />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProctectedRoute>
        <DashboardLayout />
      </ProctectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "create",
        element: <CreateIdea />,
      },
      {
        path: "my-ideas",
        element: <MyIdeas />,
      },
      {
        path: "ai",
        element: <AiSpark />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProctectedRoute>
        <AdminLayout />
      </ProctectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:id",
        element: <AdminUserDetail />,
      },
      {
        path: "ideas",
        element: <AdminIdeas />,
      },
      {
        path: "ideas/:id",
        element: <AdminIdeaDetail />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <PreLoader setLoading={setLoading} />;
  }
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <SmoothScrolling />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
