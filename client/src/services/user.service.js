import { handleResponse }  from '../helpers/js';

export const userService = {
    login,
    refreshToken,
    logout
}

function login(username, password) {
    const formData = new FormData()
    formData.append('username', username);
    formData.append('password', password)
    const requestOptions = {
        method: 'POST',
        body: formData
    }

    return fetch(`http://127.0.0.1:8000/token/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.access) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function refreshToken() {
    const requestOptions = {
        method: 'POST',
    }

    return fetch(`http://localhost:8000/token/refresh`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}
