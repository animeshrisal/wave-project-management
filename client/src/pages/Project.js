import React, { useState } from "react";

import { useQuery } from "react-query";
import projectService from "../network/projectService";

export default function Project() {

  const { isLoading, data, error } = useQuery(
    "projects",
    projectService.getProjectList
  );

  if (isLoading) return 'Loading...'

  if (error) return 'Error...'

  return (
    <ul>
      {data.map((data) => (
        <li key={data.id}>{data.title}</li>
      ))}
    </ul>
  );
}
