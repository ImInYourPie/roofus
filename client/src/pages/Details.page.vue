<script>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import PropertyCard from "../components/PropertyCard.component.vue";
import Openhouses from "../components/Openhouses.component.vue";
import OpenhouseDialog from "../components/OpenhouseDialog.component.vue";
import Loading from "../components/Loading.component.vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const fetch = async () => {
      const success = await store.dispatch("property/getPropertyById", {
        propertyId: route.params.propertyId,
      });

      if (!success) router.push({ name: "404" });

      store.dispatch("openhouses/getOpenhousesByProperty", {
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
  components: { PropertyCard, Openhouses, OpenhouseDialog, Loading },
};
</script>

<template>
  <v-container>
    <v-btn :to="{ name: 'Home' }" small variant="outlined" color="primary"
      >Go home</v-btn
    >
    <Loading v-if="loading" />

    <v-divider v-if="!loading" class="my-3"></v-divider>

    <v-card v-if="!loading" style="height: auto">
      <v-card-title>Property on: {{ main.adress }} </v-card-title>
      <v-card-text>
        <v-row align="baseline">
          <v-col sm="6">
            <p>Previous:</p>
            <PropertyCard v-if="!!prev" :item="prev" />
            <v-card v-else variant="outlined">
              <v-card-title>No previous house</v-card-title>
            </v-card>
          </v-col>
          <v-col sm="6">
            <p class="mt-2">Next:</p>
            <PropertyCard v-if="!!next" :item="next" />
            <v-card v-else variant="outlined">
              <v-card-title>No next house</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mt-3"></v-divider>
        <v-row>
          <v-container>
            <Openhouses />
          </v-container>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

  <OpenhouseDialog />
</template>
