import {
  handleResponse,
  authenticatedGetRequestOption,
  URL,
  authenticatedRequestGenerator,
} from "../helpers";

const getSprintList = (projectId) => {
  return fetch(
    `${URL}/projects/${projectId}/sprints/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((sprints) => {
      return sprints;
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

const createSprint = (projectId, sprint) => {
    return fetch(
        `${URL}/projects/${projectId}/sprints/`,
        authenticatedRequestGenerator(sprint, "POST")
      );
};

const getSprintDetail = () => {};

const updateSprint = () => {};

const deleteSprint = () => {};

const sprintService = {
  getSprintList,
  createSprint,
  getSprintDetail,
  updateSprint,
  deleteSprint,
  getBoardData,
  updateTaskStatus,
};

export default sprintService;
