import React, { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import Button from '../../Components/Button';
import Lottie from "lottie-react";
import backgroundAnimation from '../../assests/background.json';
import circleAnimation from '../../assests/landing-circle.json';
import { useUser } from "../../context/UserContext";
import { NavLink } from "react-router-dom";

const Landing = () => {
    const { loggedUser } = useUser()
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
                    <h1>Manage projects. <h1 style={{ color: '#cc3d3d' }}>Track progress.</h1>Deliver results.</h1>
                    <div>
                        {loggedUser ?
                            <Button>
                                <NavLink className={styles.link} to={'/dashboard'}>
                                    Dashboard
                                </NavLink>
                            </Button>
                            :
                            <Button>
                                <NavLink className={styles.link} to={'/register'}>
                                    Get Started

                                </NavLink>
                            </Button>

                        }
                    </div>
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
