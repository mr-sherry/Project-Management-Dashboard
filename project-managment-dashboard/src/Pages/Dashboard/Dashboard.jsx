import React from "react";
import styles from "./dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profile}>
                    <img
                        src="https://via.placeholder.com/60"
                        alt="User"
                        className={styles.avatar}
                    />
                    <h2>Project Manager</h2>
                    <p>ID: PM-0001</p>
                </div>
                <nav className={styles.nav}>
                    <button className={styles.active}>Overview</button>
                    <button>Projects</button>
                    <button>Tasks</button>
                    <button>Team</button>
                    <button>Reports</button>
                </nav>
            </aside>

            <main className={styles.main}>
                <section className={styles.overallData}>
                    <div className={styles.card}>Active Projects <span>12</span></div>
                    <div className={styles.card}>Completed Tasks <span>340</span></div>
                    <div className={styles.card}>Pending Tasks <span>58</span></div>
                    <div className={styles.card}>Team Members <span>24</span></div>
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
                    <h3>Recent Projects</h3>
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
                                <td>PJ-001</td>
                                <td>Website Redesign</td>
                                <td>2025-04-01</td>
                                <td>In Progress</td>
                                <td>60%</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
