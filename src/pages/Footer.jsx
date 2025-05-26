import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Gestor de Estoque © {new Date().getFullYear()}</p>
    </footer>
  );
}
