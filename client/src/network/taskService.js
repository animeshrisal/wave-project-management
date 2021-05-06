import {
    handleResponse,
    authenticatedGetRequestOption,
    URL,
    authenticatedRequestGenerator,
  } from "../helpers";
  
  const getTaskList = (projectId, sprintId) => {
    return fetch(
      `${URL}/projects/${projectId}/sprints/${sprintId}/tasks`,
      authenticatedGetRequestOption()
    )
      .then(handleResponse)
      .then((tasks) => {
        return tasks;
      });
  };
  
  const getBoardData = (projectId, sprintId) => {
    return fetch(
      `${URL}/projects/${projectId}/sprints/${sprintId}/board/`,
      authenticatedGetRequestOption()
    )
      .then(handleResponse)
      .then((tasks) => {
        return tasks;
      });
  };
  
  const updateTaskStatus = (projectId, sprintId, values) => {
    const { taskId, taskStatus } = values;
    return fetch(
      `${URL}/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}/`,
      authenticatedRequestGenerator({ taskStatus }, "PATCH")
    );
  };
  
  const createTask = (projectId, sprintId, task) => {
      return fetch(
          `${URL}/projects/${projectId}/sprints/${sprintId}/tasks/`,
          authenticatedRequestGenerator(task, "POST")
        );
  };
  
  const getTaskDetail = (projectId, sprintId) => {
    return fetch(
        `${URL}/projects/${projectId}/sprints/${sprintId}/`,
        authenticatedGetRequestOption()
      )
        .then(handleResponse)
        .then((tasks) => {
          return tasks;
        });
  };
  
  const updateTask = () => {};
  
  const deleteTask = () => {};
  
  const taskService = {
    getTaskList,
    createTask,
    getTaskDetail,
    updateTask,
    deleteTask,
    getBoardData,
    updateTaskStatus,
  };
  
  export default taskService;
  