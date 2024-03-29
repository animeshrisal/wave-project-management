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
  return fetch(
    `${URL}/projects/`,
    authenticatedRequestGenerator(project, "POST")
  );
};

const inviteMember = (projectId, user) => {
  return fetch(
    `${URL}/projects/${projectId}/project_member/`, authenticatedRequestGenerator(user, "POST")
  )
}

const removeMember = (projectId, user) => {
  return fetch(
    `${URL}/projects/${projectId}/project_member/`, authenticatedRequestGenerator(user, "DELETE")
  )
}

const getProjectMembers = (projectId) => {
  return fetch(
    `${URL}/projects/${projectId}/project_member/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((projectMembers) => {
      return projectMembers
    })
  
}

const getProjectDetail = () => {};

const updateProject = () => {};

const deleteProject = () => {};

const projectService = {
  getProjectList,
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
  inviteMember,
  removeMember,
  getProjectMembers
};

export default projectService;
