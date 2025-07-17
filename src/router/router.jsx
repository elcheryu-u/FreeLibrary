import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../components/home/Home";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {   
                index: true,
                element: <Home />
            },
            {
                path: "/auth",
                children: [
                    {
                        path: "register",
                        element: <Register />
                    },
                    {
                        path: "login",
                        element: <Login />
                    }
                ]
            }
        ]
    }
])

export default router;