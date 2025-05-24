import React from "react";
import styles from "./Button.module.css";

const NeumorphicButton = ({ children, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default NeumorphicButton;
