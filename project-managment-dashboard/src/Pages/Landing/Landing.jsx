import React from "react";
import styles from "./Landing.module.css";

const Landing = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.navbar}>
                <div className={styles.logo}>🔷 ProManage</div>
                <nav className={styles.navLinks}>
                    <a href="#home">Home</a>
                    <a href="#features">Products</a>
                    <a href="#pricing">Pricing</a>
                </nav>
                <div className={styles.authButtons}>
                    <button className={styles.login}>Login</button>
                    <button className={styles.signup}>Sign Up</button>
                </div>
            </header>

            <main className={styles.hero}>
                <div className={styles.textSection}>
                    <h1>Future<br />Tracking</h1>
                    <button className={styles.cta}>Get Started</button>
                </div>
                <div className={styles.visual}></div>
            </main>
        </div>
    );
};

export default Landing;
