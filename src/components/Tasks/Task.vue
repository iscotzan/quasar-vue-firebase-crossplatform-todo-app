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
    v-ripple
    clickable
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.completed }">
        {{ task.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon size="19px" name="event" color="yellow" class="q-mr-xs" />
        </div>
        <div class="column">
          <div class="row justify-end">
            <q-item-label caption>{{ task.dueDate }} </q-item-label>
          </div>
          <div class="row justify-end">
            <q-item-label caption>{{ task.dueTime }} </q-item-label>
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
          @click.stop="showEditTask = true"
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
import { mapActions } from "vuex";
import EditTask from "./Modals/EditTask";
export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
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
  components: { EditTask }
};
</script>

<style scoped></style>
