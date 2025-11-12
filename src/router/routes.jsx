import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import MyBooks from "../Pages/MyBooks/MyBooks";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/all-books",
                element: <AllBooks/>,
                loader: () => fetch('http://localhost:3000/Books')
            },
            {
                path: "/add-book",
                element: <AddBook/>,
            },
            {
                path: "/my-books",
                element: <MyBooks/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Registration/>,
            }
        ]

    }
])