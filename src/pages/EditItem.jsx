// EditItem.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";
import styles from "./EditItem.module.css";

export default function EditItem() {
  const { id } = useParams();
  const { items, updateItem } = useEstoque();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const categories = ["Jogos", "Livros", "Eletrônicos", "Móveis", "Outros"];

  useEffect(() => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setForm({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        description: item.description || "",
      });
    } else {
      alert("Item não encontrado!");
      navigate("/items");
    }
  }, [id, items, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Nome é obrigatório";
    if (form.quantity <= 0) errors.quantity = "Quantidade deve ser positiva";
    if (form.price <= 0) errors.price = "Preço deve ser positivo";
    if (!form.category) errors.category = "Selecione uma categoria";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    updateItem(id, {
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
      category: form.category,
      description: form.description,
    });

    navigate(`/items/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Editar Item</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && (
            <span className={styles.error}>{formErrors.name}</span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantidade *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            {formErrors.quantity && (
              <span className={styles.error}>{formErrors.quantity}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Preço (R$) *</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
            {formErrors.price && (
              <span className={styles.error}>{formErrors.price}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Categoria *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formErrors.category && (
              <span className={styles.error}>{formErrors.category}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => navigate(`/items/${id}`)}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
