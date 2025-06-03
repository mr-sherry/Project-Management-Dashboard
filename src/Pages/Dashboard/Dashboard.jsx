import styles from "./dashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFirebase } from '../../context/firebase'

const Dashboard = () => {
    const navigate = useNavigate()
    const firebase = useFirebase()


    useEffect(() => {
        if (!firebase.user) {
            alert('please login first')
            navigate('/login')
        }
    }, [firebase.user])
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profile}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                        alt="User"
                        className={styles.avatar}
                    />
                    <h2>userName</h2>
                    <p>ID: user-Id</p>
                </div>
                <nav className={styles.nav}>
                    <button className={styles.active}>Overview</button>
                    <NavLink to={'/profile-setup'}>

                        <button>Profile Setup</button>
                    </NavLink>
                    <NavLink to={'/project-list'}>

                        <button>Projects</button>
                    </NavLink>
                    <NavLink to={'/create-project'}>

                        <button>Add New Project</button>
                    </NavLink>
                </nav>
            </aside>

            <main className={styles.main}>
                <section className={styles.overallData}>
                    <div className={styles.card}>Active Projects <span>inProgress</span></div>
                    <div className={styles.card}>Completed Projects <span>completed</span></div>
                    <div className={styles.card}>Pending Projects <span>pending</span></div>
                </section>

                <section className={styles.charts}>
                    <div className={styles.fanIncrease}>
                        <h3>Task Completion Trend</h3>
                        {/* Replace with actual chart */}
                        <div className={styles.barChart}>[Bar Chart]</div>
                    </div>

                    <div className={styles.incomeStats}>
                        <h3>Project Allocation</h3>
                        <div className={styles.donutChart}>75%</div>
                        <div className={styles.incomeInfo}>
                            <p>Development: 40%</p>
                            <p>Design: 25%</p>
                            <p>QA: 10%</p>
                            <p>Other: 25%</p>
                        </div>
                    </div>
                </section>

                <section className={styles.worksOverview}>
                    <h3>Recent Completed Projects</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Project ID</th>
                                <th>Project Name</th>
                                <th>Start Date</th>
                                <th>Status</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>id</td>
                                <td>title</td>
                                <td>startDate</td>
                                <td>status</td>
                                <td>progress</td>
                            </tr>

                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
