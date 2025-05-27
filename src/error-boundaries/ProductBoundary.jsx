import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";
import styles from "./ErrorBoundary.module.css";

export default function ProductBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorContent;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorContent = (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>
              Oops... Produto não encontrado
            </h2>
            <p className={styles.errorMessage}>
              O item que você está procurando pode ter sido removido ou não
              existe mais.
            </p>
            <div className={styles.errorCode}>Código: 404</div>
          </div>
        );
        break;
      case 401:
        errorContent = (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Acesso não autorizado</h2>
            <p className={styles.errorMessage}>
              Você precisa estar logado para acessar esta página.
            </p>
            <div className={styles.errorCode}>Código: 401</div>
          </div>
        );
        break;
      case 400:
        errorContent = (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Requisição inválida</h2>
            <p className={styles.errorMessage}>
              O servidor não conseguiu processar sua solicitação.
            </p>
            <div className={styles.errorCode}>Código: 400</div>
          </div>
        );
        break;
      case 500:
        errorContent = (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Erro interno</h2>
            <p className={styles.errorMessage}>
              O servidor encontrou um erro inesperado. Tente novamente mais
              tarde.
            </p>
            <div className={styles.errorCode}>Código: 500</div>
          </div>
        );
        break;
      default:
        errorContent = (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Erro desconhecido</h2>
            <p className={styles.errorMessage}>
              Ocorreu um erro inesperado. Código de status: {error.status}
            </p>
          </div>
        );
    }
  } else {
    errorContent = (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Algo deu errado</h2>
        <p className={styles.errorMessage}>
          Ocorreu um erro inesperado na aplicação.
        </p>
        {error.message && (
          <details className={styles.errorDetails}>
            <summary>Detalhes técnicos</summary>
            <pre>{error.message}</pre>
          </details>
        )}
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {errorContent}
      <button onClick={() => navigate("/")} className={styles.homeButton}>
        Voltar para a página inicial
      </button>
    </div>
  );
}
