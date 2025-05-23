import React, { useState } from "react";
import styles from "./Register.module.css";
import Button from "../../Components/Button";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
    const { register, users } = useUser()
    console.log("🚀 ~ Register ~ users:", users)

    const handleSubmit = (e) => {
        e.preventDefault()
        register(name, password, email, cPassword)
    }

    return (
        <div className={styles.wrapper}>

            <main className={styles.hero}>
                <div className={styles.formBox}>
                    <h2>Create Your Account</h2>
                    <form className={styles.form}>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" required />
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                        <input onChange={(e) => setCPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
                        <Button onClick={handleSubmit} type="submit">Register</Button>
                    </form>
                </div>

                <div className={styles.visualPlaceholder}>
                </div>
            </main>
        </div>
    );
};

export default Register;
