import { useEstoque } from "../contexts/EstoqueContext";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { items } = useEstoque();

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const recentItems = [...items]
    .filter((item) => {
      const itemDate = new Date(item.createdAt);
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      return itemDate > tenDaysAgo;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const lowStockItems = [...items]
    .filter((item) => item.quantity < 10)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 3);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.metrics}>
        <div className={styles.card}>
          <h3>Diversidade de itens</h3>
          <p>{totalItems}</p>
        </div>
        <div className={styles.card}>
          <h3>Inventário total</h3>
          <p>{totalQuantity}</p>
        </div>
        <div className={styles.card}>
          <h3>Itens recentes</h3>
          <p>{recentItems.length}</p>
        </div>
        <div className={styles.card}>
          <h3>Itens acabando</h3>
          <p>{lowStockItems.length}</p>
        </div>
      </div>

      <div className={styles.lists}>
        <div className={styles.list}>
          <h2>Itens Recentes</h2>
          {recentItems.length > 0 ? (
            recentItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div>
                  <span>{item.name}</span>
                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <Link to={`/items/${item.id}`} className={styles.action}>
                  Ver
                </Link>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>Nenhum item recente</p>
          )}
        </div>

        <div className={styles.list}>
          <h2>Itens acabando</h2>
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div>
                  <span>{item.name}</span>
                  <span className={styles.quantity}>
                    ({item.quantity} unid.)
                  </span>
                </div>
                <Link to={`/items/${item.id}`} className={styles.action}>
                  Ver
                </Link>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>Nenhum item com estoque baixo</p>
          )}
        </div>
      </div>
    </div>
  );
}
