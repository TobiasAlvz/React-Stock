import { createContext, useContext, useState, useEffect } from "react";

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [items, setItems] = useState([]);

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("estoque")) || [];
    setItems(savedItems);
  }, []);

  // Salva dados no localStorage quando items mudam
  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now(), createdAt: new Date().toISOString() }]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <EstoqueContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  return useContext(EstoqueContext);
}