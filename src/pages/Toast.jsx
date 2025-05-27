import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <div className={styles.toast}>
      {message}
    </div>
  ) : null;
}