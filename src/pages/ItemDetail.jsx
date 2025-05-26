import { useParams, useNavigate } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";
import styles from "./ItemDetail.module.css";

export default function ItemDetail() {
  const { id } = useParams();
  const { items, deleteItem } = useEstoque();
  const navigate = useNavigate();

  const item = items.find((item) => item.id === id);

  if (!item) {
    return <div className={styles.notFound}>Item não encontrado</div>;
  }

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      deleteItem(id);
      navigate("/items");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>REACT STOCK</h1>
        <h2>Detalhes do Item</h2>
      </header>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Nome:</span>
          <span className={styles.value}>{item.name}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Quantidade:</span>
          <span className={styles.value}>{item.quantity} unid.</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Preço:</span>
          <span className={styles.value}>R$ {item.price.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Categoria:</span>
          <span className={styles.value}>{item.category}</span>
        </div>

        {item.description && (
          <div className={styles.row}>
            <span className={styles.label}>Descrição:</span>
            <span className={styles.value}>{item.description}</span>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            onClick={() => navigate(`/items/${id}/edit`)}
            className={styles.editButton}
          >
            Editar
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Excluir
          </button>
          <button
            onClick={() => navigate("/items")}
            className={styles.backButton}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
