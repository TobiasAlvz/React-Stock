import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ItemsList from "./pages/ItemsList";
import ItemDetail from "./pages/ItemDetail";
import NewItem from "./pages/NewItem";
import EditItem from "./pages/EditItem";
import Cart from "./pages/admin/Cart"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "items", element: <ItemsList /> },
      { path: "items/:id", element: <ItemDetail /> },
      { path: "items/new", element: <NewItem /> },
      { path: "items/:id/edit", element: <EditItem /> },
      { path: "admin/cart", element: <Cart /> }, 
    ],
  },
]);

export default router;
