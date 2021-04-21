import { handleResponse, requestOptions, URL } from "../helpers";

export const projectService = {
  getProjectList,
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
};

const getProjectList = () => {
  return fetch(`${URL}/projects/`, requestOptions)
    .then(handleResponse)
    .tehen((projects) => {
      return projects;
    });
};

const createProject = () => {};

const getProjectDetail = () => {};

const updateProject = () => {};

const deleteProject = () => {};
