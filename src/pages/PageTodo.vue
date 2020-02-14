<template>
  <q-page padding>
    <h1 class="text-center text-secondary text-bold">ToDoz</h1>
    <div class="row q-mb-lg">
      <Search />
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
    <NoTasks v-if="!Object.keys(tasksTodo).length && !search"></NoTasks>
    <TasksTodo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />
    <TasksCompleted
      :tasksCompleted="tasksCompleted"
      v-if="Object.keys(tasksCompleted).length"
    />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true"
      />
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
    //@ts-ignore
    Search
    // Task: require("./../components/Task/Task").default
  }
};
</script>

<style scoped></style>
