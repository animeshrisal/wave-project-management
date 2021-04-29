import {
    handleResponse,
    authenticatedGetRequestOption,
    URL,
    authenticatedRequestGenerator,
  } from "../helpers";

const getSprintList = (projectId) => {
    return fetch(`${URL}/projects/${projectId}/sprints/`, authenticatedGetRequestOption())
        .then(handleResponse)
        .then(tasks => {
            return tasks;
        })
}

const getBoardData = (projectId, sprintId) => {
    return fetch(`${URL}/projects/${projectId}/sprints/${sprintId}/board/`, authenticatedGetRequestOption())
        .then(handleResponse)
        .then(tasks => {
            return tasks;
        })
}

const updateTaskStatus = (projectId, sprintId, values) => {
    const { taskId, taskStatus } = values
    return fetch(
        `${URL}/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}/`, 
        authenticatedRequestGenerator({ taskStatus }, 'PATCH'))
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
    getBoardData,
    updateTaskStatus
}

export default sprintService;
