import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { LoginPage } from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
