import React from "react";
import styles from "./ProjectDetails.module.css";
import Button from "../../Components/Button";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { projectList, userId } = useUser();
    const { projectId } = useParams();

    // Find the current user's project data
    const userProjectData = projectList.find((p) => p.userIds === userId);

    if (!userProjectData) {
        return <div className={styles.wrapper}>No project data found for this user.</div>;
    }

    // Merge all status arrays to search for the specific project
    const allProjects = [
        ...userProjectData.pending,
        ...userProjectData.inProgress,
        ...userProjectData.completed
    ];

    // Match projectId (which is a string) with project id
    const findProject = allProjects.find((p) => String(p.id) === String(projectId));
    console.log("🚀 ~ ProjectDetails ~ findProject:", findProject)

    if (!findProject) {
        return <div className={styles.wrapper}>Project not found.</div>;
    }


    const {
        id,
        title,
        description,
        startDate,
        status,
        progress,
        githubLink,
        deadline,
        team,
        reference,
        designLink,
        images = []
    } = findProject;

    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <div className={styles.detailsContainer}>
                <div className={styles.detailBox}>
                    <h3>Project Information</h3>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Start Date:</strong> {startDate}</p>
                    <p><strong>Deadline:</strong> {deadline || "N/A"}</p>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Progress:</strong> {progress}</p>
                </div>

                <div className={styles.detailBox}>
                    <h3>Links</h3>
                    <p><strong>GitHub:</strong> {githubLink ? <a href={githubLink} target="_blank" rel="noopener noreferrer">{githubLink}</a> : "N/A"}</p>
                    <p><strong>Design:</strong> {designLink ? <a href={designLink} target="_blank" rel="noopener noreferrer">{designLink}</a> : "N/A"}</p>
                    <p><strong>Reference:</strong> {reference || "N/A"}</p>
                </div>

                <div className={styles.detailBox}>
                    <h3>Team Members</h3>
                    <p>{team?.length ? team.join(", ") : "No members assigned."}</p>
                </div>

                {images.length > 0 && (
                    <div className={styles.detailBox}>
                        <h3>Design Mockups</h3>
                        <div className={styles.imageGallery}>
                            {images.map((src, idx) => (
                                <img key={idx} src={src} alt={`Mockup ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.detailBox}>
                    <h3>Actions</h3>
                    <Button>Mark as Completed</Button>
                    <Button>Edit Project</Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
