<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      class="col"
      @input="$emit('update:name', $event)"
      autofocus
      v-select-all
      clearable
      clear-icon="close"
      ref="name"
      label="Task Name"
      :rules="[val => !!val || 'Field is required']"
    >
    </q-input>
  </div>
</template>
<script>
import { selectAll } from "./../../../../directives/select-all.directive";
export default {
  props: ["name"],

  directives: { selectAll }
};
</script>
