import React, { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import Button from '../../Components/Button';
import Lottie from "lottie-react";
import backgroundAnimation from '../../assests/background.json';
import circleAnimation from '../../assests/landing-circle.json';
import Header from '../../Components/Header';

const Landing = () => {
    const lottieRef = useRef();

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.3);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Lottie
                animationData={backgroundAnimation}
                loop={true}
                speed={0.3}
                className={styles.lottieBackground}
            />


            <main className={styles.hero}>
                <div className={styles.textSection}>
                    <h1>Manage projects. <br />Track progress. <br />Deliver results.</h1>
                    <Button>
                        Get Started
                    </Button>
                </div>
                <div className={styles.visual}>
                    <Lottie
                        animationData={circleAnimation}
                        loop={true}
                        lottieRef={lottieRef}
                        autoplay
                        className={styles.circleLottie}
                    />
                </div>
            </main>
        </div>
    );
};

export default Landing;
