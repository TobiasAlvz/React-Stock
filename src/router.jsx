import { createBrowserRouter } from "react-router-dom"
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
	{
    path: "/products",
    element: <Products />,
  },
	{
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin",
    element: <Admin />,
  }
])

export default router;