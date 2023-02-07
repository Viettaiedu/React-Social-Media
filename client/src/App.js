import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";
import Home from "./pages/home";
import Profile from "./pages/profile";

// My Component
import Login from "./pages/login";
import Register from "./pages/register";
import { DarkModeContext } from "./context/darkModeContext";
import { UserContext } from "./context/authContext";

function App() {
  const {currentUser} = useContext(UserContext);
  const Layout = () => {
    const queryClient = new QueryClient()
    const {darkMode} = useContext(DarkModeContext);
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark":"light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
      </QueryClientProvider>
    );
  };
  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute><Layout /></ProtectRoute>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
