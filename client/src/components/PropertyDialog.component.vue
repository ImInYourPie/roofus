<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const handleSave = async () => {
      const valid = store.dispatch("properties/validateForm");
      if (!valid) return;

      if (store.state.properties.isNew) {
        await saveNewEntry();
        return;
      }
      await saveExistingEntry();
    };

    const saveNewEntry = async () => {
      await store.dispatch("properties/saveNewEntry");
    };

    const saveExistingEntry = async () => {
      await store.dispatch("properties/saveExistingEntry");
    };

    const handleClose = () => {
      store.commit("properties/setErrors", { adress: "", generic: "" });
      store.commit("properties/setOpenForm", false);
    };

    return {
      open: computed(() => store.state.properties.openForm),
      form: computed(() => store.state.properties.form),
      saving: computed(() => store.state.properties.saving),
      errors: computed(() => store.state.properties.errors),
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
          <span class="text-h5">Property</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.adress"
                label="Address"
                required
                full-width
                :error="!!errors.adress || !!errors.generic"
                :error-messages="errors.adress || errors.generic"
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
