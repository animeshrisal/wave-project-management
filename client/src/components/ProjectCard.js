import React from "react";
import "./ProjectCard.scss"


const ProjectCard = ({ project, goToProjectDetails }) => {

    const goToProject = () => {
        goToProjectDetails(project.id)
    }

    return (
        <div onClick={goToProject} className="card">
            { project.name }
        </div>
    )
}

export default ProjectCard