import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import TaskTable from "../components/TaskTable";
import sprintService from "../network/sprintService";


export default function Task(props) {

    const { projectId } = useParams()
  const { isLoading, data, error } = useQuery(
    ["tasks", projectId],
    () => sprintService.getSprintList(projectId)
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
