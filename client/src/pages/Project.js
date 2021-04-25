import React, { useState } from "react";

import { useQuery } from "react-query";
import ProjectCard from "../components/ProjectCard";
import projectService from "../network/projectService";

import "./Project.scss"

export default function Project() {
  const { isLoading, data, error } = useQuery(
    "projects",
    projectService.getProjectList
  );

  if (isLoading) return "Loading...";

  if (error) return "Error...";

  return (
    <div className="grid-container">
      {
        data.map(project => <ProjectCard className="grid-item" project={project} />)
      }
    </div>
  );
}
