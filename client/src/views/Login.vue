<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <validation-provider
        v-slot="{ errors }"
        name="username"
        rules="required"
      >
        <v-text-field
          v-model="username"
          :error-messages="errors"
          label="Username"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="password"
          :error-messages="errors"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>

      <v-btn :loading="status.isLoading" class="mr-4" type="submit"> submit </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState("users", ["errors", "status"]),
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("users", ["login", "logout"]),

    onSubmit() {
      this.submitted = true;
      const { username, password } = this;

      this.login({ username, password }).catch(() => {
        this.$refs.observer.setErrors(this.errors);
      });
    },
  },
};
</script>
<style lang="scss">
.login-form {
  margin: 100px;
}
</style>