// NewItem.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";
import styles from "./NewItem.module.css";

export default function NewItem() {
  const { addItem } = useEstoque();
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

    const newItem = {
      ...form,
      id: `item-${Date.now()}`,
      quantity: Number(form.quantity),
      price: Number(form.price),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addItem(newItem);
    navigate("/items");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>REACT STOCK</h1>
        <h2>Novo Item</h2>
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
            placeholder="Digite o nome do item"
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
              placeholder="0"
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
              placeholder="0.00"
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
            placeholder="Descrição opcional do item"
          />
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => navigate("/items")}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Adicionar Item
          </button>
        </div>
      </form>
    </div>
  );
}
