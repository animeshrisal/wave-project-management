import React from "react";
import "./ProjectCard.scss"


const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            { project.name }
        </div>
    )
}

export default ProjectCard