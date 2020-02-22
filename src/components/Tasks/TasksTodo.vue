<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <ListBanner v-if="!settings.showTasksInOneList" bgColor="bg-orange-4"
        >ToDo</ListBanner
      >

      <q-list>
        <div
          v-for="(task, key) in tasksTodo"
          :key="key"
          :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
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
  props: ["tasksTodo"],
  components: {
    task: Task,
    ListBanner
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>
