const state = { showNotification: false, message: ''};

const actions = {
    display({commit}, {message}){
        commit('showNotification', message)
    },
    close({commit}) {
        commit('closeNotification')
    }
}

const mutations = {
    showNotification(state, message) {
        state.showNotification = true;
        state.message = message
    },
    closeNotification(state) {
        state.showNotification = false;
        state.message = ''
    }
}

export const notification = {
    namespaced: true,
    state,
    actions,
    mutations
}
