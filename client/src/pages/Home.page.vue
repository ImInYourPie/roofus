<script>
import Properties from "../components/Properties.component.vue";
import PropertyDialog from "../components/PropertyDialog.component.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogout = () => {
      const success = store.dispatch("auth/logout");
      if (success) {
        router.push("/login");
      }
    };

    return { handleLogout };
  },
  components: {
    PropertyDialog,
    Properties,
  },
};
</script>

<template>
  <v-container>
    <v-row align="center">
      <v-col sm="10"><h1>Home</h1></v-col>
      <v-col class="d-flex justify-end"
        ><v-btn @click="handleLogout" small variant="outlined" color="error"
          >Logout</v-btn
        ></v-col
      >
    </v-row>
    <Properties />
  </v-container>

  <PropertyDialog />
</template>
