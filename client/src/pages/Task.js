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

    const goToBoard = (taskId) => {
        props.history.push(`/projects/${projectId}/task/${taskId}/board`)
    }

  return (
    <div>
        <div onClick={() => goToBoard(1)}>Go to Board</div>
        <TaskTable goToBoard={goToBoard} data={data} />
    </div>
  );
}
