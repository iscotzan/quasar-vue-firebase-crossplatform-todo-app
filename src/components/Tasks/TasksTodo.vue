<template>
  <div>
    <ListBanner bgColor="bg-orange-4">ToDo</ListBanner>

    <q-list bordered>
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
</template>
<script>
import Task from "./Task";
import ListBanner from "./Modals/Shared/ListBanner";
export default {
  props: ["tasksTodo"],
  components: {
    task: Task,
    ListBanner
  }
};
</script>
