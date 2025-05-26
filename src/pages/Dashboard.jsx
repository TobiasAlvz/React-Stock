import { useEstoque } from "../contexts/EstoqueContext";

export default function Dashboard() {
  const { items } = useEstoque();

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const recentItems = items.filter(item => new Date(item.createdAt) > new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
  const lowStockItems = items.filter(item => item.quantity < 10);

  return (
    <section>
      <h2>Dashboard de Estoque</h2>
      <div>
        <p>Itens diferentes: {totalItems}</p>
        <p>Total em estoque: {totalQuantity}</p>
        <p>Itens recentes (10 dias): {recentItems.length}</p>
        <p>Itens com estoque baixo (&lt;10): {lowStockItems.length}</p>
      </div>
    </section>
  );
}