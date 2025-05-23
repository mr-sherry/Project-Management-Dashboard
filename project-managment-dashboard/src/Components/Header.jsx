// src/Components/Header.jsx

import React from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
    const { loggedUser, logout } = useUser();
    const handleLogout = () => {
        logout()
    }
    return (
        <header className={styles.navbar}>
            <NavLink className={styles.logo} to={'/landing'}>

                <div className={styles.logo}>🔷 ProjeX</div>
            </NavLink>
            <nav className={styles.navLinks}>
                <NavLink to="/landing">Home</NavLink>
                <NavLink to="/pricing">Pricing</NavLink>
            </nav>
            <div className={styles.authButtons}>
                {loggedUser ?
                    (<NavLink to="/login">
                        <Button onClick={handleLogout}>logout</Button>
                    </NavLink>)
                    : (
                        <>
                            <NavLink to="/login">
                                <button className={styles.login}>Login</button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button>Sign Up</Button>
                            </NavLink>
                        </>
                    )


                }
            </div>
        </header>
    );
};

export default Header;
