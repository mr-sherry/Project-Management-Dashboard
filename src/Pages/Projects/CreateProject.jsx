import React, { useState } from "react";
import styles from "./CreateProject.module.css";
import Button from "../../Components/Button";
import { useUser } from "../../context/UserContext";

const CreateProject = () => {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [status, setStatus] = useState("pending");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const { addProject, userId } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!id || !title || !description || !startDate || !status || progress === "") {
            setError("All fields are required.");
            return;
        }

        addProject(userId, id, title, description, startDate, status, parseInt(progress));

        setId("");
        setTitle("");
        setDescription("");
        setStartDate("");
        setStatus("pending");
        setProgress(0);
        setError("");
    };

    return (
        <div className={styles.wrapper}>
            <h2>Create New Project</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.idandName}>
                    <input
                        style={{ width: '30%' }}
                        type="text"
                        placeholder="Project ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </div>
                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.dateandProg}>
                    <label htmlFor="">
                        Date
                    </label>
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label htmlFor="">
                        Progress
                    </label>
                    <input
                        type="number"
                        placeholder="Progress %"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        min="0"
                        max="100"
                    />
                </div>
                <select
                    style={{ marginTop: '10px', marginBottom: '30px' }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Button type="submit">Add Project</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
