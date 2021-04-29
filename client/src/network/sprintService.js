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

const getBoardData = (projectId, sprintId) => {
    return fetch(`${URL}/projects/${projectId}/sprints/${sprintId}/board`, authenticatedGetRequestOption())
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
    deleteSprint,
    getBoardData
}

export default sprintService;
