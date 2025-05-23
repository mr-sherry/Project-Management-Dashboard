import React, { useEffect, useState } from "react";
import styles from "./ProjectList.module.css";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useUser } from "../../context/UserContext";


const ProjectList = () => {
    const { projectList, projectsSort } = useUser()
    const [projects, setProjects] = useState(projectList);
    console.log("🚀 ~ ProjectList ~ projects:", projects)

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        const sourceList = [...projects[source.droppableId]];
        const [movedItem] = sourceList.splice(source.index, 1);

        const destinationList = [...projects[destination.droppableId]];
        destinationList.splice(destination.index, 0, movedItem);

        setProjects({
            ...projects,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList
        });
    };
    useEffect(() => {
        projectsSort(projects)
    }, [projects])
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
                                        {statusKey === "pending" && "🕓 Pending"}
                                        {statusKey === "inProgress" && "🚧 In Progress"}
                                        {statusKey === "completed" && "✅ Completed"}
                                    </h2>
                                    {projects[statusKey].map((project, index) => (
                                        <Draggable
                                            key={project.id}
                                            draggableId={project.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
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
