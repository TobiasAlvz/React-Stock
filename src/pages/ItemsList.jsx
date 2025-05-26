import { Link } from "react-router-dom";
import styles from "./ItemsList.module.css";
import { useEstoque } from "../contexts/EstoqueContext";

export default function ItemsList() {
  const { items, deleteItem } = useEstoque(); 

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      deleteItem(id);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Itens em Estoque</h1>
      </header>

      <div className={styles.actions}>
        <Link to="/items/new" className={styles.newButton}>
          + Novo Item
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Em Estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className={styles.idCell}>
                  {String(item.id).slice(0, 8)}...
                </td>
                <td>{item.name}</td>
                <td className={styles.quantity}>{item.quantity} unid.</td>
                <td>{item.category}</td>
                <td className={styles.actionsCell}>
                  <Link
                    to={`/items/${item.id}`}
                    className={styles.actionButton}
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/items/${item.id}/edit`}
                    className={`${styles.actionButton} ${styles.editButton}`}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  >
                     Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
