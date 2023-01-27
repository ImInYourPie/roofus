<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const fetchData = async () => {
      await store.dispatch("users/getUsers");
      await store.dispatch("properties/getProperties");
    };

    const handleSave = async () => {
      const valid = await store.dispatch("openhouses/validateForm");
      if (!valid) return;

      if (store.state.openhouses.isNew) {
        await saveNewEntry();
        return;
      }
      await saveExistingEntry();
    };

    const saveNewEntry = async () => {
      await store.dispatch("openhouses/saveNewEntry");
    };

    const saveExistingEntry = async () => {
      await store.dispatch("openhouses/saveExistingEntry");
    };

    const handleClose = () => {
      store.commit("openhouses/setErrors", {
        visitors: "",
        visitorAmount: "",
        startDate: "",
        generic: "",
      });
      store.commit("openhouses/setOpenForm", false);
    };

    onMounted(fetchData);

    return {
      open: computed(() => store.state.openhouses.openForm),
      form: computed(() => store.state.openhouses.form),
      saving: computed(() => store.state.openhouses.saving),
      errors: computed(() => store.state.openhouses.errors),
      properties: computed(() => store.state.properties.items),
      users: computed(() => store.state.users.items),
      loadingUsers: computed(() => store.state.users.loading),
      handleSave,
      handleClose,
    };
  },
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="open" max-width="25vw">
      <v-card>
        <v-card-title>
          <span class="text-h5">Openhouse</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.visitorAmount"
                type="number"
                min="1"
                label="Visitor amount"
                full-width
                :error="!!errors.visitorAmount"
                :error-messages="errors.visitorAmount"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="form.property"
                :items="properties"
                :item-title="(property) => property.adress"
                :item-value="(property) => property.id"
                dense
                label="Property"
                :error="!!errors.property"
                :error-messages="errors.property"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="form.visitors"
                :loading="loadingUsers"
                :items="users"
                :item-title="(user) => user.name"
                :item-value="(user) => user.id"
                dense
                chips
                small-chips
                label="Visitors"
                multiple
                :error="!!errors.visitors"
                :error-messages="errors.visitors"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.startDate"
                type="date"
                label="Start date"
                full-width
                :error="!!errors.startDate"
                :error-messages="errors.startDate"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="saving"
            color="primary"
            variant="outlined"
            @click="handleSave"
          >
            Save
          </v-btn>
          <v-btn color="secondary" variant="outlined" @click="handleClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
