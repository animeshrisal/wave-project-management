import { userService } from '../services';
import router from '../router';
// import Vue from 'vue';

const user = localStorage.getItem('user');
const state = user ? { status: { isLoading: false }, user } : { status: { isLoading: false }, user: null, errors: {} };

const actions = {
    login({ commit }, { username, password }) {
        commit('loginRequest', { username });
        return userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    // Vue.prototype.$connect(`ws://localhost:8000?token=${user.token}`, { format: 'json' })
                    if (user.is_admin === true) {
                        router.push('/admin-dashboard')
                    } else {
                        router.push('/dashboard')
                    }
                },
                errors => {
                    commit('loginFailure', errors);
                    return Promise.reject(errors);
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { isLoading: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { isLoading: false };
        state.user = user;
    },
    loginFailure(state, errors) {
        state.status = { isLoading: false };
        state.user = null;
        state.errors = errors;
    },
    registerRequest(state, user) {
        state.status = { isLoading: true };
        state.user = user;
    },
    registerSuccess(state, user) {
        state.status = { isLoading: true };
        state.user = user;
    },
    registerFailure(state, errors) {
        state.status = { isLoading: false };
        state.user = null;
        state.errors = errors
    },
    logout(state) {
        state.status = { isLoading: false };
        state.user = null;
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
}