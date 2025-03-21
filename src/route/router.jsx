import Layout from "@/Layout";
import ApplyPayment from "@/pages/ApplyPayment";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home />, errorElement: <ErrorPage /> },
        {path: "/payments", element: <ApplyPayment />}
      ],
    },
  ]);