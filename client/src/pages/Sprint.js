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

    const goToBoard = (sprintId) => {
        props.history.push(`/projects/${projectId}/sprint/${sprintId}/board`)
    }

  return (
    <div>
      { data.map(sprint => (
        <div>
          <div onClick={() => goToBoard(sprint.id)}>Go to Board</div>
          <TaskTable goToBoard={goToBoard} data={sprint.tasks} />
        </div>
      ))}
    </div>
  );
}
