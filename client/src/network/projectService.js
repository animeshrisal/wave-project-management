import {
  handleResponse,
  authenticatedGetRequestOption,
  URL,
  authenticatedRequestGenerator,
} from "../helpers";

export const getProjectList = () => {

  return fetch(`${URL}/projects/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((projects) => {
      return projects;
    });
};

const createProject = (project) => {
  return fetch(`${URL}/projects/`, authenticatedRequestGenerator(project, 'POST'))
};

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
