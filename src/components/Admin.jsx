import { Link } from "react-router-dom";
export default function AdminHome() {
  return (
    <main>
      <header>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/products">Produtos</Link>
          <Link to="/cart">Carrinho</Link>
        </nav>
      </header>
      <h1>Área Administrativa</h1>
      <p>
        Esta é a área de administração da loja. Aqui você poderá adicionar
        produtos e ver os pedidos.
      </p>
    </main>
  );
}
