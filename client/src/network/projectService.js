import {
  handleResponse,
  authenticatedGetRequestOption,
  authenticatedPostRequestGenerator,
  URL,
} from "../helpers";

export const getProjectList = () => {
  return fetch(`${URL}/projects/`, authenticatedGetRequestOption)
    .then(handleResponse)
    .then((projects) => {
      return projects;
    });
};

const createProject = () => {};

const getProjectDetail = () => {};

const updateProject = () => {};

const deleteProject = () => {};

const projectService = {
  getProjectList,
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
};

export default projectService;
