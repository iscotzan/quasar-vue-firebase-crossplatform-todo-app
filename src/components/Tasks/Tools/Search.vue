<template>
  <q-input
    v-select-all
    v-model="searchField"
    class="col"
    label="Search"
    outlined
    @keyup.esc="searchField = ''"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "./../../../directives/select-all.directive";

export default {
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSearch"])
  },
  directives: {
    selectAll
  }
};
</script>
