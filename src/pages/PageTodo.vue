<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <h1 class="text-center text-secondary text-bold">ToDoz</h1>
      <div class="row q-mb-lg">
        <Search />
        <Sort />
      </div>
      <p
        v-if="
          search &&
            !Object.keys(tasksTodo).length &&
            !Object.keys(tasksCompleted).length
        "
      >
        No search results :(
      </p>

      <q-scroll-area class="relative-position q-scroll-area-tasks">
        <NoTasks v-if="!Object.keys(tasksTodo).length && !search"></NoTasks>

        <TasksTodo
          :tasksTodo="tasksTodo"
          v-if="Object.keys(tasksTodo).length"
        />

        <TasksCompleted
          class="q-mb-xl"
          :tasksCompleted="tasksCompleted"
          v-if="Object.keys(tasksCompleted).length"
        />
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          color="primary"
          size="24px"
          icon="add"
          class="all-pointer-events"
          @click="showAddTask = true"
        />
      </div>

      <q-dialog v-model="showAddTask">
        <addtask :showAddTask="showAddTask" @close="showAddTask = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import AddTask from "./../components/Tasks/Modals/AddTask";
import TasksTodo from "./../components/Tasks/TasksTodo";
import TasksCompleted from "./../components/Tasks/TasksCompleted";
import NoTasks from "./../components/Tasks/NoTasks";
import Search from "./../components/Tasks/Tools/Search";
import Sort from "./../components/Tasks/Tools/Sort";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"])
    // tasks() {
    //   return this.$store.getters["tasks/tasks"];
    // }
  },
  methods: {},
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    addtask: AddTask,
    TasksTodo,
    TasksCompleted,
    NoTasks,
    Search,
    Sort
    // Task: require("./../components/Task/Task").default
  }
};
</script>

<style scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
