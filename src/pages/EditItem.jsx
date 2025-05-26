import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";

export default function EditItem() {
  const { id } = useParams();
  const { items, updateItem } = useEstoque();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
  });

  useEffect(() => {
    const item = items.find(item => item.id === Number(id));
    if (item) setForm(item);
  }, [id, items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(Number(id), form);
    navigate(`/items/${id}`);
  };

  return (
    <section>
      <h2>Editar Item</h2>
      <form onSubmit={handleSubmit}>
        {}
      </form>
    </section>
  );
}