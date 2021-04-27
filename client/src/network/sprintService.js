import {
    handleResponse,
    authenticatedGetRequestOption,
    URL,
  } from "../helpers";

const getSprintList = (projectId) => {
    return fetch(`${URL}/projects/${projectId}/sprints/`, authenticatedGetRequestOption())
        .then(handleResponse)
        .then(tasks => {
            return tasks;
        })
}

const createSprint = () => {

}

const getSprintDetail = () => {

}

const updateSprint = () => {
    
}

const deleteSprint = () => {

}

const sprintService = {
    getSprintList,
    createSprint,
    getSprintDetail,
    updateSprint,
    deleteSprint
}

export default sprintService;
