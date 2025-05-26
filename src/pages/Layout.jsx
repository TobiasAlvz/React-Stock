import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Gestor de Estoque © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}