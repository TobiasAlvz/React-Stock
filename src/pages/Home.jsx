import { Link } from "react-router-dom";
import Header from "./Header";

export default function Home() {
  return (
    <section>
      <Header />
      <h2>Página inicial!</h2>
      <p>Seja bem-vindo(a) à nossa loja.</p>
    </section>
  );
}
