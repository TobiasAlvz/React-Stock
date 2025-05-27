import { createContext, useContext, useState, useEffect, useRef } from "react";

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("react-stock-items");
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    } finally {
      setLoading(false); // Sinaliza que o carregamento inicial terminou
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem("react-stock-items", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    const now = new Date().toISOString();
    const itemWithMeta = {
      ...newItem,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setItems((prev) => [...prev, itemWithMeta]);
  };

  const updateItem = (id, updatedItem) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetStorage = () => {
    if (
      window.confirm("Tem certeza que deseja apagar todos os dados salvos?")
    ) {
      localStorage.removeItem("react-stock-items");
      setItems([]);
    }
  };

  return (
    <EstoqueContext.Provider
      value={{ items, addItem, updateItem, deleteItem, resetStorage, loading }}
    >
      {loading ? <div>Carregando dados do estoque...</div> : children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  return useContext(EstoqueContext);
}
