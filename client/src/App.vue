<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/login">Login</router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: "App",
  computed: {
    ...mapState({
      account: state => state.users,
    })
  },
  created: {
    connectWebSocket: () => {
      if(this.account.access)
      Vue.prototype.$connect(`ws://localhost:8000?token=${this.account.access}`, { format: 'json' })
    }
  },
  data: () => ({
    //
  }),
};
</script>
