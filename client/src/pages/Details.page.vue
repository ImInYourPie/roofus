<script>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PropertyCard from "../components/PropertyCard.component.vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetch = async () => {
      await store.dispatch("property/getPropertyById", {
        propertyId: route.params.propertyId,
      });
    };

    onMounted(fetch);

    watch(
      () => route.params.propertyId,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          fetch();
        }
      },
    );

    return {
      main: computed(() => store.state.property.main),
      prev: computed(() => store.state.property.prev),
      next: computed(() => store.state.property.next),
      loading: computed(() => store.state.property.loading),
    };
  },
  components: { PropertyCard },
};
</script>

<template>
  <v-container>
    <v-btn :to="{ name: 'Home' }" small variant="outlined" color="primary"
      >Go home</v-btn
    >
    <v-divider class="my-3"></v-divider>
    <v-card style="height: 50vh">
      <v-card-title v-if="loading">Loading...</v-card-title>
      <v-card-title v-else>Property on: {{ main.adress }} </v-card-title>
      <v-card-text v-if="!loading">
        <p>Previous:</p>
        <PropertyCard v-if="!!prev" :item="prev" />
        <v-card v-else variant="outlined">
          <v-card-title>No previous house</v-card-title>
        </v-card>
        <p class="mt-2">Next:</p>
        <PropertyCard v-if="!!next" :item="next" />
        <v-card v-else variant="outlined">
          <v-card-title>No next house</v-card-title>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>
