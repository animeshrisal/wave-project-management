import Vue from 'vue'
import Vuex from 'vuex'

import { users } from './user.module';
import { websocket } from './websocket.module';
import { notification }  from './notification.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    websocket,
    notification
  }
})
