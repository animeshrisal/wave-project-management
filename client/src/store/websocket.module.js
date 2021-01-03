import Vue from 'vue';

const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  }
}

const actions = {
  sendMessage({commit}, {event, message}) {
    commit('SOCKET_MESSAGE_SENT')
    Vue.prototype.$socket.sendObj(
      {
        event,
        message: message
      })
      
  },

  receiveMessage({ dispatch, commit },{ data }){
    const { event, message } = data
    commit('SOCKET_ONMESSAGE', message)
    if(event == 'notification') { 
      dispatch('notification/display', { message: message.message }, { root: true })
    }
  }
};

const mutations = {
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state)  {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    SOCKET_MESSAGE_SENT(state) {
      state.socket.messageSent = true;
    },
}

export const websocket = {
    namespaced: true,
    state,
    actions,
    mutations
}