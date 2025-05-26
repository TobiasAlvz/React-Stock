import { Link } from "react-router-dom";
import { useEstoque } from "../contexts/EstoqueContext";

export default function ItemsList() {
  const { items, deleteItem } = useEstoque();

  return (
    <section>
      <h2>Lista de Itens</h2>
      <Link to="/items/new">Adicionar Item</Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>R$ {item.price.toFixed(2)}</td>
              <td>
                <Link to={`/items/${item.id}`}>Ver</Link>
                <Link to={`/items/${item.id}/edit`}>Editar</Link>
                <button onClick={() => deleteItem(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
