import { Link, useParams } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";

export default function ItemDetail() {
  const { items } = useEstoque();
  const { id } = useParams();
  const item = items.find(item => item.id === Number(id));

  return (
    <section>
      <Link to="/items">Voltar</Link>
      <h2>{item.name}</h2>
      <p><strong>Quantidade:</strong> {item.quantity}</p>
      <p><strong>Preço:</strong> R$ {item.price.toFixed(2)}</p>
      <p><strong>Categoria:</strong> {item.category}</p>
      <p><strong>Descrição:</strong> {item.description}</p>
      <Link to={`/items/${item.id}/edit`}>Editar</Link>
    </section>
  );
}