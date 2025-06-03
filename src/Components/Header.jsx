
import React from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const Header = () => {
    const firebase = useFirebase();
    const handleLogout = () => {
        firebase.logoutUser();
    }
    return (
        <header className={styles.navbar}>
            <div className={styles.navbarInner}>
                <NavLink className={styles.logo} to={'/'}>

                    <div className={styles.logo}>🔷 ProjeX</div>
                </NavLink>
                <nav className={styles.navLinks}>
                    <NavLink to="/">Home</NavLink>
                    {firebase.user && <NavLink to="/profile">Profile</NavLink>}
                    {firebase.user && <NavLink to="/project-list">Projects</NavLink>}
                    {firebase.user && <NavLink to={'/dashboard'}>Dashboard</NavLink>}
                </nav>
            </div>
            <div className={styles.authButtons}>
                {firebase.user ?
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
