import styles from "./dashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from '../../context/firebase'
import Chart from "../../Components/Chart";
import PieChart1 from "../../Components/PieChart1";

const Dashboard = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    // console.log("🚀 ~ Dashboard ~ firebase:", firebase.user)
    const [projects, setProjects] = useState({
        inProgress: [],
        completed: [],
        pending: []
    })
    console.log("🚀 ~ Dashboard ~ projects:", projects)
    const [userProfile, setUserProfile] = useState([])
    // console.log("🚀 ~ Dashboard ~ userProfile:", userProfile)

    // console.log("🚀 ~ Dashboard ~ projects:", projects)


    useEffect(() => {
        if (!firebase.user) {
            alert('please login first')
            navigate('/login')
        } else {
            firebase.getUserProjects().then((userProjects) => {
                const matchedProjects = userProjects.docs
                    .filter((doc) => doc.data().userId === firebase.user.uid)
                    .map((doc) => ({ id: doc.id, ...doc.data() }));

                // console.log("🚀 ~ firebase.getUserProjects ~ matchedProjects:", matchedProjects)

                const grouped = {
                    pending: [],
                    inProgress: [],
                    completed: []
                };

                matchedProjects.forEach((project) => {
                    const status = project.status;
                    if (grouped[status]) {
                        grouped[status].push(project);
                    }
                });

                setProjects(grouped);

            })


            ///////////////////////////////profile/////////////////////////////////////////////
            firebase.getUserProfile().then(userProfiles => {
                const matchedProfile = userProfiles.docs.find((profile) => {
                    return profile.data().userId === firebase.user.uid
                })
                // console.log("🚀 ~ matchedProfile ~ matchedProfile:", matchedProfile)
                setUserProfile(matchedProfile.data())
            }

            )
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
                    <h2>{userProfile.name}</h2>
                    {/* <p>ID:{userProfile.userId}</p> */}
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
                    <div className={styles.card}>Active Projects <span>{projects.inProgress.length}</span></div>
                    <div className={styles.card}>Completed Projects <span>{projects.completed.length}</span></div>
                    <div className={styles.card}>Pending Projects <span>{projects.pending.length}</span></div>
                </section>

                <section className={styles.charts}>
                    <div className={styles.fanIncrease}>
                        <h3>Task Completion Trend</h3>
                        {/* Replace with actual chart */}
                        <div className={styles.barChart}>{<Chart />}</div>
                    </div>

                    <div className={styles.incomeStats}>
                        <h3>Project Progress</h3>
                        <div className={styles.donutChart}>{<PieChart1 />}</div>
                        <div className={styles.incomeInfo}>

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
                            {projects.completed.map((project) => (
                                <tr key={project.projectId}>
                                    <td>{project.projectId}</td>
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
