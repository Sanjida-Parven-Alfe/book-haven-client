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
import Loading from "../Pages/Loading/Loading";
import Error from "../Pages/Error/Error";

const serverURL =
  "https://book-haven-server-199.vercel.app";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => await fetchData(`${serverURL}/Books`),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
        loader: async () => await fetchData(`${serverURL}/Books`),
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
          await fetchData(`${serverURL}/Books/${params.id}`),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
