import React, { useState } from "react";

import { useQuery } from "react-query";
import projectService from "../network/projectService";

import { Card } from 'antd';

export default function Project() {
  const { isLoading, data, error } = useQuery(
    "projects",
    projectService.getProjectList
  );

  if (isLoading) return "Loading...";

  if (error) return "Error...";

  return (
    <ul>
    </ul>
  );
}
