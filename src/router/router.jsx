import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../components/home/Home";
import App from "../App";
import Search from "../pages/search/Search";
import OLBook from "../pages/books/ol/OLBook";
import AuthGuard from "../pages/auth/AuthGuard";
import Saves from "../pages/saves/Saves";

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
                path: "/search",
                element: <Search />
            },
            {
                path: "/saves",
                element: <Saves />
            },
            {
                path: "/book",
                children: [
                    {
                        path: "ol/:id",
                        element: <OLBook />
                    }
                ]
            },
            {
                path: "/auth",
                element: <AuthGuard />,
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