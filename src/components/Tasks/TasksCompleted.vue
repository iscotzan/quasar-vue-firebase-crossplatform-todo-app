<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div :class="{ 'q-mt-lg': !settings.showTasksInOneList }">
      <ListBanner v-if="!settings.showTasksInOneList" bgColor="bg-green-4"
        >Completed</ListBanner
      >

      <q-list>
        <div
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :class="settings.showInDarkMode ? 'bg-green-7' : 'bg-green-1'"
        >
          <!-- @click="task.completed = !task.completed" -->
          <q-separator />
          <q-space />
          <task :task="task" :id="key" />
        </div>
      </q-list>
    </div>
  </transition>
</template>
<script>
import Task from "./Task";
import ListBanner from "./Modals/Shared/ListBanner";
import { mapGetters } from "vuex";

export default {
  props: ["tasksCompleted"],
  components: {
    task: Task,
    ListBanner
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>
