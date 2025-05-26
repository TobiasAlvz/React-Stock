import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Layout";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Dashboard";
import Products from "./pages/ItemsList";
import Product from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import { loadProduct } from "./loaders/products";
import ProductBoundary from "./error-boundaries/ProductBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <Product />,
        loader: loadProduct,
        errorElement: <ProductBoundary />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

export default router;
