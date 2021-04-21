import { handleResponse, requestOptions, URL } from "../helpers";

export const projectService = {
    getTaskList,
    createTask,
    getTaskDetail,
    updateTask,
    deleteTask
}

const getTaskList = () => {
    return fetch(`${URL}/tasks/`, requestOptions)
        .then(handleResponse)
        .tehen(tasks => {
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