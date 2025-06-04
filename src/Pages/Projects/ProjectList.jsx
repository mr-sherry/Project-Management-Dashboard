import React, { useEffect, useState } from "react";
import styles from "./ProjectList.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../../context/firebase'

const ProjectList = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);


    console.log("🚀 ~ ProjectList ~ projects:", projects)
    useEffect(() => {
        if (!firebase.user) {
            alert('login Please')
            navigate('/')
        } else {
            firebase.getUserProjects().then((userProjects) => {
                const matchedProjects = userProjects.docs
                    .filter((doc) => doc.data().userId === firebase.user.uid)
                    .map((doc) => ({ id: doc.id, ...doc.data() }));

                console.log("🚀 ~ firebase.getUserProjects ~ matchedProjects:", matchedProjects)

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
        }
    }, [firebase.user])

    const handleClick = (projectId) => {
        navigate(`/project-details/${projectId}`);
    };

    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const sourceList = [...projects[source.droppableId]];
        const [movedItem] = sourceList.splice(source.index, 1);

        const destinationList = [...projects[destination.droppableId]];
        destinationList.splice(destination.index, 0, { ...movedItem, status: destination.droppableId });

        const updatedProjects = {
            ...projects,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList,
        };

        setProjects(updatedProjects);

        // 🔁 FIREBASE UPDATE CALL
        try {
            await firebase.updateProjectByUserIdAndProjectId(
                firebase.user.uid,
                movedItem.projectId,
                { status: destination.droppableId }
            );
            console.log("✅ Project status updated in Firestore");
        } catch (error) {
            console.error("❌ Failed to update Firestore:", error);
            // Optionally: revert UI state if update fails
        }
    };


    const statusLabels = {
        pending: "🕓 Pending",
        inProgress: "🚧 In Progress",
        completed: "✅ Completed"
    };

    return (
        <div className={styles.wrapper}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <main className={styles.board}>
                    {["pending", "inProgress", "completed"].map((statusKey) => (
                        <Droppable droppableId={statusKey} key={statusKey}>
                            {(provided) => (
                                <div
                                    className={styles.column}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2>
                                        {statusLabels[statusKey]} ({projects[statusKey]?.length || 0})
                                    </h2>
                                    {projects[statusKey]?.map((project, index) => (
                                        <Draggable
                                            key={String(project.id)}
                                            draggableId={String(project.id)}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    onClick={() => handleClick(project.projectId)}
                                                    className={styles.card}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3>{project.title}</h3>
                                                    <p><strong>ID:</strong> #{project.id}</p>
                                                    <p>{project.description}</p>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </main>
            </DragDropContext>
        </div>
    );
};

export default ProjectList;
