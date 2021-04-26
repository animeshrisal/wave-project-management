import React, { useState } from "react";

import { useQuery } from "react-query";
import { Redirect } from "react-router";
import ProjectCard from "../components/ProjectCard";
import projectService from "../network/projectService";

import "./Project.scss"

export default function Project(props) {
  const { isLoading, data, error } = useQuery(
    "projects",
    projectService.getProjectList
  );

  if (isLoading) return "Loading...";

  if (error) return "Error...";

  const goToProjectDetails = (id) => {
    props.history.push(`/projects/${id}`)
  }

  return (
    <React.Fragment>
      <div>
        Add new project
      </div>
      <div className="grid-container">
        {
          data.map(project => 
            <ProjectCard 
              goToProjectDetails={goToProjectDetails} 
              key={project.id} 
              className="grid-item" 
              project={project} 
              />
            )
        }
      </div>
    </React.Fragment>
  );
}
