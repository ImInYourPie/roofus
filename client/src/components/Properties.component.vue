<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import PropertyCard from "./PropertyCard.component.vue";

export default {
  setup() {
    const store = useStore();

    const fetch = async () => {
      await store.dispatch("properties/getProperties");
    };

    const handleNew = () => {
      store.commit("properties/setIsNew", true);
      store.commit("properties/setForm", { adress: "" });
      store.commit("properties/setOpenForm", true);
    };

    onMounted(fetch);

    return {
      items: computed(() => store.state.properties.items),
      count: computed(() => store.state.properties.count),
      loading: computed(() => store.state.properties.loading),
      handleNew,
    };
  },
  components: { PropertyCard },
};
</script>

<template>
  <div class="d-flex align-center justify">
    <h3 class="my-2 mr-2">{{ count }} Properties</h3>
    <v-btn size="small" variant="outlined" color="primary" @click="handleNew"
      >New</v-btn
    >
  </div>
  <v-row>
    <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
      <PropertyCard :item="item" showEdit="true" />
    </v-col>
  </v-row>
</template>
