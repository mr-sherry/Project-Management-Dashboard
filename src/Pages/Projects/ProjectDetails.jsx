import React, { useEffect, useState } from "react";
import styles from "./ProjectDetails.module.css";
import Button from "../../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate()
    const [project, setProject] = useState(null); // use null initially to check loading state
    const firebase = useFirebase();


    useEffect(() => {
        firebase.getUserProjects().then((userProjects) => {
            const matchedProject = userProjects.docs.find((doc) => {
                return doc.data().projectId === Number(projectId);
            });

            if (matchedProject) {
                setProject(matchedProject.data());
            }
        });
    }, [projectId, firebase]);

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this project?");
        if (!confirm) return;

        try {
            await firebase.deleteProjectByUserIdAndProjectId(firebase.user.uid, Number(projectId));
            navigate('/project-list')
        } catch {
            alert("Failed to delete project. Check console for details.");
        }
    }

    if (!project) {
        return <p>Loading project details...</p>;
    }

    const {
        id,
        title,
        description,
        startDate,
        deadline,
        status,
        progress,
        githubLink,
        designLink,
        referenceLink,
        images = [], // fallback to empty array if undefined
    } = project;

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
                    <p><strong>Progress:</strong> {progress}%</p>
                </div>

                <div className={styles.detailBox}>
                    <h3>Links</h3>
                    <p>
                        <strong>GitHub:</strong>{" "}
                        {githubLink ? (
                            <a href={githubLink} target="_blank" rel="noopener noreferrer">
                                {githubLink}
                            </a>
                        ) : "N/A"}
                    </p>
                    <p>
                        <strong>Design:</strong>{" "}
                        {designLink ? (
                            <a href={designLink} target="_blank" rel="noopener noreferrer">
                                {designLink}
                            </a>
                        ) : "N/A"}
                    </p>
                    <p>
                        <strong>Reference:</strong>{" "}
                        {referenceLink ? (
                            <a href={referenceLink} target="_blank" rel="noopener noreferrer">
                                {referenceLink}
                            </a>
                        ) : "N/A"}
                    </p>
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
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
