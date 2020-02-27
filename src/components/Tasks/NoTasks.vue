<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-banner
      dense
      :class="settings.showInDarkMode ? 'bg-blue-3 col' : 'bg-grey-3 col'"
    >
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      <div class="">
        <q-badge
          size="large"
          color="primary"
          outline
          class="text-h5 rounded-borders q-pa-xs"
        >
          No tasks to do
        </q-badge>
      </div>
      <template v-slot:action>
        <q-btn
          flat
          color="primary"
          label="Add Task"
          @click="$root.$emit('showAddTask')"
        />
      </template>
    </q-banner>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>
