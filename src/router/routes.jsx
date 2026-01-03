import { createBrowserRouter } from "react-router-dom"; 
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout"; 
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
import Error from "../Pages/Error/Error";
import DashboardHome from "../Pages/Dashboard/DashboardHome"; 
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";

const serverURL = "https://book-haven-server-199.vercel.app";

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
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardHome />, 
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
      },
      {
        path: "update-book/:id",
        element: <UpdateBook />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);