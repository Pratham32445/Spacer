import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Space from "./pages/Space";
import SpaceDashboard from "./pages/SpaceDashboard";

const router = createBrowserRouter([
  {
    path : "/space/:id",
    element : <SpaceDashboard/>
  },
  {
    path: "/space/create",
    element: <Space />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
