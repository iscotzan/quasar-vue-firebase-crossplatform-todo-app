<template>
  <div class="q-mt-lg">
    <ListBanner bgColor="bg-green-4">Completed</ListBanner>

    <q-list bordered>
      <div
        v-for="(task, key) in tasksCompleted"
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
  props: ["tasksCompleted"],
  components: {
    task: Task,
    ListBanner
  }
};
</script>
