<template>
  <q-card>
    <ModalHeader>
      Add Task
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
import ModalHeader from "./Shared/ModalHeader";
import ModalTaskName from "./Shared/ModalTaskName";
import ModalDueDate from "./Shared/ModalDueDate";
import ModalDueTime from "./Shared/ModalDueTime";
import ModalButtons from "./Shared/ModalButtons";
const initialTaskToSubmit = {
  completed: false,
  name: "",
  dueDate: "",
  dueTime: ""
};
export default {
  data() {
    return {
      taskToSubmit: Object.assign({}, initialTaskToSubmit)
    };
  },

  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm() {
      // console.log("submit form", this.$refs.name);
      const { name } = this.$refs.modalTaskName.$refs;
      if (!name.hasError) {
        this.submitTask();
      }
      name.validate();
    },
    submitTask() {
      console.log("submit task");
      this.addTask(this.taskToSubmit);
      this.taskToSubmit = Object.assign({}, initialTaskToSubmit);
      this.$emit("close");
    }
  },
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButtons
  }
};
</script>
<style scoped></style>
