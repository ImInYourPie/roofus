<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import PropertyDialogComponent from "../components/PropertyDialog.component.vue";

export default {
  setup() {
    const { state, dispatch, commit } = useStore();

    const fetch = async () => {
      await dispatch("properties/getProperties");
    };

    const handleEdit = (property) => {
      commit("properties/setForm", property);
      commit("properties/setOpenForm", true);
    };

    const handleNew = () => {
      commit("properties/setIsNew", true);
      commit("properties/setForm", { adress: "" });
      commit("properties/setOpenForm", true);
    };

    onMounted(fetch);

    return {
      items: computed(() => state.properties.items),
      count: computed(() => state.properties.count),
      loading: computed(() => state.properties.loading),
      handleNew,
      handleEdit,
    };
  },
  components: { PropertyDialogComponent },
};
</script>

<template>
  <v-container>
    <h1>Home</h1>
    <div class="d-flex align-center justify">
      <h3 class="my-2 mr-2">{{ count }} Properties</h3>
      <v-btn size="small" variant="outlined" color="primary" @click="handleNew"
        >New</v-btn
      >
    </div>
    <h1 v-if="loading">Loading properties...</h1>
    <v-row v-else>
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
        <v-card variant="outlined">
          <v-card-title>{{ item.adress }}</v-card-title>
          <v-card-actions>
            <v-btn
              size="small"
              variant="outlined"
              color="secondary"
              @click="() => handleEdit(item)"
              >Edit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <PropertyDialogComponent />
</template>
