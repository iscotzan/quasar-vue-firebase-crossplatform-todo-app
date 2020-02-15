<template>
  <q-card>
    <ModalHeader>
      Edit Task
    </ModalHeader>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <ModalTaskName ref="modalTaskName" :name.sync="taskToSubmit.name" />
        <ModalDueDate :dueDate.sync="taskToSubmit.dueDate" />
        <ModalDueTime
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>
      <ModalButtons></ModalButtons>
    </form>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
import mixinAddEditTask from './../../../mixins/mixin-add-edit-task';
// const initialTaskToSubmit = {
//   completed: false,
//   name: "",
//   dueDate: "",
//   dueTime: ""
// };
export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  props: ["task", "id"],
  methods: {
    ...mapActions("tasks", ["updateTask"]),
   
    submitTask() {
      console.log("submit task");
      this.updateTask({ id: this.id, updates: this.taskToSubmit });
      // this.taskToSubmit = Object.assign({}, initialTaskToSubmit);
      this.$emit("close");
    }
  },

  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>
<style scoped></style>
