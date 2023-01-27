<script>
import Properties from "../components/Properties.component.vue";
import Openhouses from "../components/Openhouses.component.vue";
import PropertyDialog from "../components/PropertyDialog.component.vue";
import OpenhouseDialog from "../components/OpenhouseDialog.component.vue";
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
    Openhouses,
    OpenhouseDialog,
  },
};
</script>

<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col><h1>Home</h1></v-col>
      <v-col
        ><v-btn @click="handleLogout" small variant="outlined"
          >Logout</v-btn
        ></v-col
      >
    </v-row>
    <Properties />

    <v-divider class="my-4"></v-divider>

    <Openhouses />
  </v-container>

  <PropertyDialog />
  <OpenhouseDialog />
</template>
