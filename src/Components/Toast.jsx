import React, { useEffect } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.toast}>
            <div className={styles.icon}>😎</div>
            <div className={styles.message}>{message}</div>
            <button className={styles.closeButton} onClick={onClose}>✖</button>
        </div>
    );
};

export default Toast;
