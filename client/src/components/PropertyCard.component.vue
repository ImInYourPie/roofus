<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["item", "showEdit"],
  setup(props) {
    const store = useStore();

    const handleEdit = () => {
      store.commit("properties/setForm", props.item);
      store.commit("properties/setOpenForm", true);
    };

    return {
      item: computed(() => props.item),
      showEdit: props.showEdit,
      handleEdit,
    };
  },
};
</script>

<template>
  <v-card variant="outlined">
    <v-card-title>{{ item.adress }}</v-card-title>
    <v-card-actions>
      <v-btn
        v-if="showEdit"
        size="small"
        variant="outlined"
        color="secondary"
        @click="() => handleEdit(item)"
        >Edit</v-btn
      >
      <v-btn
        :to="{ path: `/property/${item.id}`, force: true }"
        size="small"
        variant="outlined"
        color="info"
        >View</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
