<template>
  <!-- <li>
    <div>{{ task.name }} {{ index }}</div>
    <small>{{ task.dueDate }} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(index)">x</button>
  </li> -->
  <!-- <div class="q-pa-md" style="max-width: 350px"> -->
  <!-- <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered> -->
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      >
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon size="19px" name="event" color="yellow" class="q-mr-xs" />
        </div>
        <div class="column">
          <div class="row justify-end">
            <q-item-label caption>{{ task.dueDate | niceDate }} </q-item-label>
          </div>
          <div class="row justify-end">
            <q-item-label caption>{{ taskDueTime }} </q-item-label>
          </div>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          round
          flat
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditTaskModal"
        />
        <q-btn
          round
          flat
          dense
          color="negative"
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <EditTask
        :showEditTask="showEditTask"
        @close="showEditTask = false"
        :id="id"
        :task="task"
      />
    </q-dialog>
  </q-item>
  <!-- </q-list> -->
  <!-- </div> -->
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";

import EditTask from "./Modals/EditTask";
export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM D");
    },
    searchHighlight(value, search) {
      // console.log("TCL: searchHighlight -> (value, search)", (value, search));
      if (search) {
        let searchRegex = new RegExp(search, "ig");
        return value.replace(searchRegex, match => {
          return '<span class="bg-yellow-6">' + match + "</span>";
        });
      }
      return value;
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    showEditTaskModal() {
      this.showEditTask = true;
    },
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this task?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
          // console.log('>>>> OK')
        })

        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      console.log(
        "TCL: taskDueTime -> this.settings.show12HourTimeFormat",
        this.settings.show12HourTimeFormat,
        this.task.dueTime,
        date.formatDate(this.task.dueTime, "h:mmA")
      );
      if (this.settings.show12HourTimeFormat) {
        return date.formatDate(this.task.dueTime, "h:mmA");
      }
      return date.formatDate(this.task.dueTime, "HH:mm");
    }
  },
  components: { EditTask }
};
</script>

<style scoped></style>
