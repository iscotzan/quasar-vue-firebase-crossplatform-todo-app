<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <!-- :class="!$q.platform.is.desktop ? 'full-page' : 'absolute'" -->
      <template v-if="tasksLoaded">
        <!-- <h1
          v-if="$q.platform.is.desktop || $q.platform.is.ipad"
          class="text-center text-secondary text-bold"
        >
          ToDoz
        </h1>
        <span
          v-else
          class="text-center text-secondary text-bold text-h6 q-mt-sm q-mb-lg"
          >ToDoz</span
        > -->
        <div
          :class="
            $q.platform.is.desktop || $q.platform.is.ipad
              ? 'row q-mb-lg'
              : 'row q-mb-lg'
          "
        >
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

        <q-scroll-area
          class="relative-position q-scroll-area-tasks"
        >
          <!-- style="height: auto !important;" -->
          <NoTasks
            v-if="
              !Object.keys(tasksTodo).length &&
                !search &&
                !settings.showTasksInOneList
            "
          ></NoTasks>

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
      </template>
      <template v-else>
        <div>
          <span class="absolute-center">
            <q-spinner-pie color="primary" size="5em" />
          </span>
          <q-tooltip :offset="[0, 8]">
            Loading Todoz
          </q-tooltip>
        </div>
      </template>
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
    ...mapGetters("settings", ["settings"]),
    ...mapState("tasks", ["search", "tasksLoaded"])
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

<style lang="scss" scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
  height: 10vh;
}
.electron {
  .q-scroll-area-tasks {
    .scroll {
      height: auto !important;
    }
  }
}
</style>
