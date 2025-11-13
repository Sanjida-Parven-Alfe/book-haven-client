import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import MyBooks from "../Pages/MyBooks/MyBooks";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/Books"),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
        loader: () => fetch("http://localhost:3000/Books"),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(`http://localhost:3000/Books/${params.id}`).then((res) =>
            res.json()
          ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
