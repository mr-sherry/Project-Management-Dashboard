import React, { useState } from "react";
import styles from "./Register.module.css";
import Button from "../../Components/Button";
import { useUser } from "../../context/UserContext";
import Toast from "../../Components/Toast";

const Register = () => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isRegister, setIsRegister] = useState(false);

    const { register, users } = useUser();
    console.log("🚀 ~ Register ~ users:", users)

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (users.some(user => user.userName === name)) {
            newErrors.name = "Username already taken";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        } else if (users.some(user => user.email === email)) {
            newErrors.email = "Email already registered";
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



    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        register(name, userId, password, email, cPassword);
        setUserId('')
        setCPassword('');
        setEmail('');
        setName('');
        setPassword('');
        setIsRegister(true);
        setErrors({});
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

                        <div style={{ display: "flex", gap: '10px' }}>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                            />
                            <input
                                value={userId}
                                onChange={(e) => setUserId((e.target.value).toLowerCase())}
                                type="text"
                                placeholder="User Id"
                            />
                        </div>
                        {errors.name && <p className={styles.error}>{errors.name}</p>}

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email Address"
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}

                        <input
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        {errors.cPassword && <p className={styles.error}>{errors.cPassword}</p>}
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
