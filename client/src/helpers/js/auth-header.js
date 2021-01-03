export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return { 'access-token': user.access_token, 'uid': user.uid, 'client': user.client };
    } else {
        return {};
    }
}