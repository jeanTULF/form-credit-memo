import Layout from "@/Layout";
import ApplyPayment from "@/pages/ApplyPayment";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import NewActivity from "@/pages/NewActivity";
import Reports from "@/pages/Reports";
import Upload from "@/pages/Upload";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home />, errorElement: <ErrorPage /> },
        {path: "/payments", element: <ApplyPayment />},
        {path: "/new-activity", element: <NewActivity />},
        {path: "/upload-file", element: <Upload />},
        {path: "/reports", element: <Reports />}
      ],
    },
  ]);