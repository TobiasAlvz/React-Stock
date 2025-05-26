import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/items">Itens</NavLink>
        <NavLink to="/admin/cart">Carrinho</NavLink> {}
      </nav>
    </header>
  );
}