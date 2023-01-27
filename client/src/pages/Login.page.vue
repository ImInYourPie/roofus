<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { axiosInstance } from "../libs/axios";

export default {
  setup() {
    const {
      state: { auth },
      dispatch,
    } = useStore();

    const router = useRouter();

    const handleSubmit = async (e) => {
      const valid = await dispatch("auth/validateForm");
      if (valid) {
        const success = await dispatch("auth/login");

        if (success) {
          axiosInstance.defaults.headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
          };
          router.push({ name: "Home" });
        }
      }
    };

    return { auth, handleSubmit };
  },
};
</script>

<template>
  <v-row class="d-flex" align="center" justify="center">
    <v-form ref="form" lazy-validation>
      <v-col cols="12" sm="8" md="4">
        <v-card class="mx-auto" width="400">
          <v-card-title class="my-2">
            <h1 class="text-center">Login</h1>
          </v-card-title>
          <v-card-text class="my-2">
            <h4 v-if="auth.errors.invalidCreds" class="text-center text-error">
              Invalid credentials
            </h4>
            <v-form>
              <v-text-field
                label="Email"
                v-model="auth.email"
                type="email"
                required
                :error="!!auth.errors.email"
                :error-messages="auth.errors.email"
              />
              <v-text-field
                label="Password"
                v-model="auth.password"
                type="password"
                required
                :error="!!auth.errors.password"
                :error-messages="auth.errors.password"
              />
              <v-btn
                class="ma-2"
                @click="handleSubmit"
                :disabled="auth.loading"
                :loading="auth.loading"
                color="primary"
                >Submit</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-form>
  </v-row>
</template>
