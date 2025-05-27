import styles from "./dashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const navigate = useNavigate()
    const [findProject, setFindProject] = useState({
        pending: [],
        inProgress: [],
        completed: [],
    });
    const { projectList, userId, loggedUser } = useUser();
    const [userData, setUserData] = useState({ userName: 'NAN' });
    useEffect(() => {

        const projectsForUser = projectList.find(user => user.userIds === userId);

        if (projectsForUser) {
            setFindProject(projectsForUser);
        }
    }, [projectList, userId]);

    useEffect(() => {
        if (!loggedUser) {
            alert('please login first')
            navigate('/login')
        } else {
            setUserData(loggedUser)
        }
    }, [loggedUser, userId])
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profile}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                        alt="User"
                        className={styles.avatar}
                    />
                    <h2>{userData.userName}</h2>
                    <p>ID: {userId}</p>
                </div>
                <nav className={styles.nav}>
                    <button className={styles.active}>Overview</button>
                    <NavLink to={'/profile'}>

                        <button>Profile</button>
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
                    <div className={styles.card}>Active Projects <span>{findProject.inProgress.length}</span></div>
                    <div className={styles.card}>Completed Projects <span>{findProject.completed.length}</span></div>
                    <div className={styles.card}>Pending Projects <span>{findProject.pending.length}</span></div>
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
                            {findProject.completed.map((project) => (
                                <tr>
                                    <td>{project.id}</td>
                                    <td>{project.title}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.status}</td>
                                    <td>{project.progress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
