import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [submitted, setSubmitted] = useState(false);
    const { login, loggedUser, users, projectList } = useUser();
    console.log("🚀 ~ Login ~ users:", users)
    console.log("🚀 ~ Login ~ projectList:", ...projectList)

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        setSubmitted(true)
    }

    useEffect(() => {
        if (submitted) {
            if (loggedUser) {
                navigate('/dashboard');
            } else {
                alert('Invalid credentials');
            }
            setSubmitted(false);
        }
    }, [loggedUser, submitted, navigate]);

    return (
        <div className={styles.wrapper}>
            <main className={styles.hero}>
                <div className={styles.visualPlaceholder}>
                </div>

                <div className={styles.formBox}>
                    <h2>Welcome Back</h2>
                    <form className={styles.form}>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleSubmit} type="submit">Login</Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Login;
