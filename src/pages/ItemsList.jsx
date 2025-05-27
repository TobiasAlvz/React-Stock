import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ItemsList.module.css";
import { useEstoque } from "../contexts/EstoqueContext";

export default function ItemsList() {
  const { items, deleteItem } = useEstoque();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = [...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir "${name}"? Esta ação não pode ser desfeita.`
      )
    ) {
      deleteItem(id);
      alert(`"${name}" foi excluído com sucesso!`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Itens em Estoque</h1>
      </header>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className={styles.idCell}>
                  {String(item.id).slice(0, 8)}
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
                    onClick={() => handleDelete(item.id, item.name)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <p className={styles.emptyMessage}>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
}
