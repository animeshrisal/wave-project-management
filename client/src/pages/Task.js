import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
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
    <div className="grid-container">
      {
        data.map(task =>
            <div> 
                <span>{task.name}</span>
                <span> {task.taskStatus}</span>
                <span>{task.taskPriority}</span>
            </div>
          )
      }
    </div>
  );
}
