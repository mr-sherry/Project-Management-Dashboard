import React from "react";
import styles from "./Profile.module.css";

const Profile = () => {
    return (
        <div className={styles.container}>
            {/* Sidebar Card */}
            <div className={styles.card}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s' alt="Profile" className={styles.profileImage} />
                <h2>Hello, I'm <span>Sherry</span></h2>
                <p>A passionate Frontend Developer skilled in React.js and modern web technologies.</p>
                <div className={styles.socialIcons}>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:sherry@example.com">Email</a>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
                <h1 className={styles.title}>Profile</h1>
                <p className={styles.subtitle}>I’m a creative web developer</p>

                <div className={styles.sections}>
                    <div className={styles.details}>
                        <h3>Details</h3>
                        <p><strong>Name:</strong> Sherry Ahmed</p>
                        <p><strong>Age:</strong> 24 years</p>
                        <p><strong>Location:</strong> Karachi, Pakistan</p>
                        <p><strong>Email:</strong> sherry@example.com</p>
                        <p><strong>Phone:</strong> +92 300 1234567</p>
                        <p><strong>Website:</strong> <a href="https://yourportfolio.com">yourportfolio.com</a></p>
                    </div>

                    <div className={styles.about}>
                        <h3>About Me</h3>
                        <p>
                            I am a self-taught front-end developer specialized in React.js. I enjoy turning
                            complex problems into simple, beautiful, and intuitive interfaces.
                        </p>
                        <p>
                            Currently expanding my skills in TypeScript and state management libraries like Redux
                            and Zustand.
                        </p>
                        <button className={styles.contactBtn}>Contact Me</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
