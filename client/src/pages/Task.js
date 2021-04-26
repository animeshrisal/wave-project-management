import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import TaskTable from "../components/TaskTable";
import taskService from "../network/taskService";


export default function Task(props) {

    const { projectId } = useParams()
  const { isLoading, data, error } = useQuery(
    ["tasks", projectId],
    () => taskService.getTaskList(projectId)
  );

  if (isLoading) return "Loading...";

  if (error) return "Error...";


  return (
    <TaskTable data={data} />
  );
}
