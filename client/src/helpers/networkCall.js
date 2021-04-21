function authHeader() {
    const user = localStorage.getItem('user')
    if (user) {
        return { 'Authorization': `Bearer ${JSON.parse(user).access}` };
    } else {
        return {};
    }
}

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export function authenticatedPostRequestGenerator(values= {}) {

    const formData = new FormData();

    const requestOption = {
        method: 'POST',
        headers: authHeader(),
    }

    if  (Object.keys(values).length != 0){
        for ( var key in values ) {
            formData.append(camelToSnakeCase(key), formData[key]);
        }
    }

    return {...requestOption, body: formData}
}

export const authenticatedGetRequestOption = {
    method: 'GET',
    headers: authHeader()
}



