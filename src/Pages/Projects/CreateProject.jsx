import React, { useState } from "react";
import styles from "./CreateProject.module.css";
import Button from "../../Components/Button";
import { useFirebase } from "../../context/firebase";

const CreateProject = () => {

    const firebase = useFirebase();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("pending");
    const [progress, setProgress] = useState(0);
    const [githubLink, setGithubLink] = useState("");
    const [designLink, setDesignLink] = useState("");
    const [referenceLink, setReferenceLink] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id || !title || !description || !startDate || !deadline || !status || progress === "") {
            setError("All fields are required.");
            return;
        } else {
            const projectData = {
                id,
                title,
                description,
                startDate,
                deadline,
                status,
                progress: parseInt(progress),
                githubLink,
                designLink,
                referenceLink,
            };
            const addingProject = await firebase.addNewProject(firebase.user.uid, projectData)
            if (addingProject.success) {
                alert('project added successfully')
            } else {
                alert('error')
            }

            setId("");
            setTitle("");
            setDescription("");
            setStartDate("");
            setDeadline("");
            setStatus("pending");
            setProgress(0);
            setGithubLink("");
            setDesignLink("");
            setReferenceLink("");
            setError("");
        }


    };

    return (
        <div className={styles.wrapper}>
            <h2>Create New Project</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <div className={styles.error}>{error}</div>}

                {/* ID & Title */}
                <div className={styles.formGroupRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="projectId">Project ID</label>
                        <input
                            id="projectId"
                            type="number"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter Project ID"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="projectTitle">Project Title</label>
                        <input
                            id="projectTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Project Title"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write project description..."
                    />
                </div>

                {/* Dates & Progress */}
                <div className={styles.formGroupRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            id="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="progress">Progress %</label>
                        <input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            placeholder="0 - 100"
                        />
                    </div>
                </div>

                {/* Links */}
                <div className={styles.formGroup}>
                    <label htmlFor="githubLink">GitHub Link</label>
                    <input
                        id="githubLink"
                        type="url"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="designLink">Design Link</label>
                    <input
                        id="designLink"
                        type="url"
                        value={designLink}
                        onChange={(e) => setDesignLink(e.target.value)}
                        placeholder="https://figma.com/..."
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="referenceLink">Reference Link</label>
                    <input
                        id="referenceLink"
                        type="url"
                        value={referenceLink}
                        onChange={(e) => setReferenceLink(e.target.value)}
                        placeholder="https://example.com/..."
                    />
                </div>

                {/* Status */}
                <div className={styles.formGroup}>
                    <label htmlFor="status">Project Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className={styles.buttonWrapper}>
                    <Button type="submit">Add Project</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
