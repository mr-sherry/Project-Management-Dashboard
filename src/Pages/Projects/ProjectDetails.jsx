import React from "react";
import styles from "./ProjectDetails.module.css";
import Button from "../../Components/Button";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { projectId } = useParams();




    const {
        id,
        title,
        description,
        startDate,
        status,
        progress,
        githubLink,
        deadline,
        referenceLink,
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
                    <p><strong>Reference:</strong> {referenceLink ? <a href={referenceLink} target="_blank" rel="noopener noreferrer">{referenceLink}</a> : "N/A"}</p>
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
