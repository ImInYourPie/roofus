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
    <v-card style="height: 50vh">
      <v-card-title v-if="loading">Loading...</v-card-title>
      <v-card-title v-else>Property on: {{ main.adress }} </v-card-title>
      <v-card-text>
        <PropertyCard v-if="!!prev" :item="prev" />
        <PropertyCard v-if="!!next" :item="next" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
