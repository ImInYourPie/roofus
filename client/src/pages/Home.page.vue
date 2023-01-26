<script>
import Properties from "../components/Properties.component.vue";
import Openhouses from "../components/Openhouses.component.vue";
import PropertyDialog from "../components/PropertyDialog.component.vue";

export default {
  components: {
    PropertyDialog,
    Properties,
    Openhouses,
  },
};
</script>

<template>
  <v-container>
    <h1>Home</h1>
    <Properties />

    <v-divider class="my-4"></v-divider>

    <Openhouses />
  </v-container>

  <PropertyDialog />
</template>
