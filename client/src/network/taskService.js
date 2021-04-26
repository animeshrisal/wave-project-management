import {
    handleResponse,
    authenticatedGetRequestOption,
    URL,
  } from "../helpers";

const getTaskList = (projectId) => {
    return fetch(`${URL}/projects/${projectId}/tasks/`, authenticatedGetRequestOption())
        .then(handleResponse)
        .then(tasks => {
            return tasks;
        })
}

const createTask = () => {

}

const getTaskDetail = () => {

}

const updateTask = () => {
    
}

const deleteTask = () => {

}

const taskService = {
    getTaskList,
    createTask,
    getTaskDetail,
    updateTask,
    deleteTask
}

export default taskService;
