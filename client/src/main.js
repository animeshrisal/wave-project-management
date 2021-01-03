import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://localhost:8000', {
  connectManually: true,
  store: store,
  format: 'json', 
  passToStoreHandler: function (eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return }
    let method = 'commit'
    let target = eventName.toUpperCase()
    let msg = event
    if (this.format === 'json' && event.data) {
      msg = JSON.parse(event.data)
      if (msg.mutation) {
        target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
      } else if (msg.action) {
        method = 'dispatch'
        target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/')
      }
    }
    // Write this if multiple stores are used and namespace options are enabled
    target = "websocket/" + target
    this.store[method](target, msg)
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
