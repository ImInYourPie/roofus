<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const handleEdit = (openhouse) => {
      store.commit("openhouses/setIsNew", false);
      store.commit("openhouses/setForm", {
        ...openhouse,
        property: route.params.propertyId,
        startDate: new Date(openhouse.startDate).toISOString().substring(0, 10),
      });
      store.commit("openhouses/setOpenForm", true);
    };

    const handleNew = () => {
      store.commit("openhouses/setIsNew", true);
      store.commit("openhouses/setForm", {
        property: route.params.propertyId,
        visitors: [],
        visitorAmount: 1,
        startDate: new Date().toISOString().substring(0, 10),
      });
      store.commit("openhouses/setOpenForm", true);
    };

    return {
      items: computed(() => store.state.openhouses.items),
      count: computed(() => store.state.openhouses.count),
      loading: computed(() => store.state.openhouses.loading),
      handleNew,
      handleEdit,
    };
  },
};
</script>

<template>
  <div class="d-flex align-center justify">
    <h3 class="my-2 mr-2">{{ count }} Openhouses</h3>
    <v-btn size="small" variant="outlined" color="primary" @click="handleNew"
      >New</v-btn
    >
  </div>
  <v-row v-if="items.length > 0">
    <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
      <v-card variant="outlined">
        <v-card-title>{{ item.property.adress }}</v-card-title>
        <v-card-text
          >Visitor amount: {{ item.visitorAmount }}, Current count:
          {{ item.visitors.length }}
        </v-card-text>
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

  <v-row v-else>
    <v-col class="text-xs-center" cols="12">
      <p class="headline">No openhouses found.</p>
      <p>Please add a new openhouse to see it here.</p>
    </v-col>
  </v-row>
</template>
