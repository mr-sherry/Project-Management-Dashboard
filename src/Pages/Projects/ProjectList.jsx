import React, { useEffect, useState } from "react";
import styles from "./ProjectList.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
    const { userId, projectList, projectsSort, loggedUser } = useUser();
    const navigate = useNavigate();

    const [projects, setProjects] = useState({
        userIds: '',
        pending: [],
        inProgress: [],
        completed: []
    });
    useEffect(() => {
        if (!loggedUser) {
            alert('login Please')
            navigate('/login')
        }
    }, [])

    // Navigate to ProjectDetails with correct path
    const handleClick = (projectId) => {
        navigate(`/project-details/${projectId}`);
    };

    useEffect(() => {
        const currentUserProjects = projectList.find(user => user.userIds === userId);
        if (currentUserProjects) {
            setProjects({
                userIds: currentUserProjects.userIds,
                pending: currentUserProjects.pending,
                inProgress: currentUserProjects.inProgress,
                completed: currentUserProjects.completed
            });
        }
    }, [projectList, userId]);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceList = [...projects[source.droppableId]];
        const [movedItem] = sourceList.splice(source.index, 1);

        const destinationList = [...projects[destination.droppableId]];
        destinationList.splice(destination.index, 0, movedItem);

        const updatedProjects = {
            ...projects,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList
        };

        setProjects(updatedProjects);
        projectsSort(userId, updatedProjects);
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
                                                    onClick={() => handleClick(project.id)}
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
