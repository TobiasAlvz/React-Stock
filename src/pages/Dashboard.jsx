
import styles from './Dashboard.module.css'; 
import { useEstoque } from '../contexts/EstoqueContext';

export default function Dashboard() {
  const { items } = useEstoque();


  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const recentItems = items.filter(item => new Date(item.createdAt) > new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
  const lowStockItems = items.filter(item => item.quantity < 10);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard de Estoque</h1>
      
      <section className={styles.metrics}>
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
      </section>

      <section className={styles.lists}>
        <div className={styles.list}>
          <h2>Itens Recentes</h2>
          {recentItems.slice(0, 3).map(item => (
            <div key={item.id} className={styles.item}>
              <span>{item.name}</span>
              <button className={styles.action}>Ver</button>
            </div>
          ))}
        </div>

        <div className={styles.list}>
          <h2>Itens acabando</h2>
          {lowStockItems.slice(0, 3).map(item => (
            <div key={item.id} className={styles.item}>
              <span>{item.name}</span>
              <span className={styles.quantity}>{item.quantity}</span>
              <button className={styles.action}>Ver</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}