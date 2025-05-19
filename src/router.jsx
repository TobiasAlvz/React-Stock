import { createBrowserRouter } from "react-router-dom"
import Admin from "./components/Admin";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";

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