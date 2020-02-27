<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueDate"
      label="Due Date"
      @input="$emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" />
        <q-popup-proxy>
          <q-date
            :value="dueDate"
            mask="YYYY-MM-DD"
            color="purple"
            @input="$emit('update:dueDate', $event)"
          />
        </q-popup-proxy>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: ["dueDate"]
};
</script>
