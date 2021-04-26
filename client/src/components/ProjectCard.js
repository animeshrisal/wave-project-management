import React from "react";
import { Redirect } from "react-router";
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