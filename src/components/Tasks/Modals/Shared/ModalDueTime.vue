<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueTime"
      label="Due Time"
      @input="$emit('update:dueTime', $event)"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" />
        <q-popup-proxy>
          <q-time
            :value="dueTime"
            mask="YYYY-MM-DD HH:mm"
            color="purple"
            @input="$emit('update:dueTime', $event)"
          />
        </q-popup-proxy>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: ["dueTime"]
};
</script>
