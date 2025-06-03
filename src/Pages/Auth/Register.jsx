import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Button from "../../Components/Button";
import Toast from "../../Components/Toast";
import { useFirebase } from '../../context/firebase'
import { useNavigate } from "react-router-dom";
const Register = () => {
    const firebase = useFirebase();
    console.log("🚀 ~ Register ~ firebase:", firebase)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        if (firebase.user) {
            navigate('/')
        }
    }, [firebase.user])


    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                "Password must contain letters, numbers, and a special character";
        }

        if (!cPassword) {
            newErrors.cPassword = "Please confirm your password";
        } else if (cPassword !== password) {
            newErrors.cPassword = "Passwords do not match";
        }

        return newErrors;
    };
    console.log("🚀 ~ satate ~ erroes:", errors)

    useEffect(() => {
        setErrors(validate())

    }, [email, password, cPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('helo starting');

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        else {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            console.log("signup complete", result)
            setCPassword('');
            setEmail('');
            setPassword('');
            setIsRegister(true);
        }

    };


    return (
        <div className={styles.wrapper}>
            <main className={styles.hero}>
                <div className={styles.formBox}>
                    <h2>Create Your Account</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {isRegister && (
                            <Toast
                                message="Welcome to the ProjeX. Registration complete!"
                                onClose={() => setIsRegister(false)}
                            />
                        )}
                        {errors?.email && <p className={styles.error}>{errors.email}</p>}

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email Address"
                        />
                        {errors?.password && <p className={styles.error}>{errors.password}</p>}


                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        {errors?.cPassword && <p className={styles.error}>{errors.cPassword}</p>}


                        <input
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <Button type="submit">Register</Button>
                        </div>
                    </form>
                </div>

                <div className={styles.visualPlaceholder}></div>
            </main>
        </div>
    );
};

export default Register;
