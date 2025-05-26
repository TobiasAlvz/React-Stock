import { useState } from "react";
import { useEstoque } from "../contexts/EstoqueContext";
import { useNavigate } from "react-router-dom";

export default function NewItem() {
  const { addItem } = useEstoque();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(form);
    navigate("/items");
  };

  return (
    <section>
      <h2>Novo Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Quantidade" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} required min="0" />
        <input type="number" placeholder="Preço" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} required min="0" />
        <input type="text" placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Salvar</button>
      </form>
    </section>
  );
}