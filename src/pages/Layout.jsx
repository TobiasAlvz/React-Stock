import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from './Layout.module.css'; 

export default function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}