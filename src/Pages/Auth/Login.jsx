import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useFirebase } from "../../context/firebase";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState({});
    console.log("🚀 ~ Login ~ user:", user.email)
    const { login, loggedUser } = useUser();
    console.log("🚀 ~ Login ~ loggedUser:", loggedUser)
    const firebase = useFirebase();

    const navigate = useNavigate()
    useEffect(() => {
        if (loggedUser) {
            navigate('/')
        }
    }, [loggedUser])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setUser({ email, password })
        const result = await firebase.signinUserWithEmailAndPass(email, password);
        console.log("🚀 ~ handleSubmit ~ result:", result);


        if (result.success) {
            console.log("✅ Login successful");
            login(email, password)
            setEmail('');
            setPassword('');
            alert('login successfull');
            // navigate('/dashboard');
        } else {
            alert('invalid credentials')
        }

    }



    return (
        <div className={styles.wrapper}>
            <main className={styles.hero}>
                <div className={styles.visualPlaceholder}>
                </div>

                <div className={styles.formBox}>
                    <h2>Welcome Back</h2>
                    <form className={styles.form}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
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
