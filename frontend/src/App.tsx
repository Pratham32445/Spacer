import { RecoilRoot } from "recoil";
import User from "./components/dashboard/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/space/:id",
    element: <User />,
  },
]);

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;
