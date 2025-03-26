import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/Register/Register";
import AllVisas from "../components/pages/AllVisas/AllVisas";
import AddVisa from "../components/pages/AddVisa/AddVisa";
import MyAddedVisas from "../components/pages/MyAddedVisas/MyAddedVisas";
import MyVisaApplications from "../components/pages/MyVisaApplications/MyVisaApplications";
import VisaDetails from "../components/pages/VisaDetails/VisaDetails";
import NotFound from "../components/pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/all-visas",
        element: <AllVisas />
      },
      {
        path: "/add-visa",
        element: <PrivateRoute><AddVisa /></PrivateRoute>
      },
      {
        path: "/my-added-visas",
        element: <PrivateRoute><MyAddedVisas /></PrivateRoute>
      },
      {
        path: "/my-visa-applications",
        element: <PrivateRoute><MyVisaApplications /></PrivateRoute>
      },
      {
        path: "/visa/:id",
        element: <PrivateRoute><VisaDetails /></PrivateRoute>
      }
    ]
  }
]);

export default router; 