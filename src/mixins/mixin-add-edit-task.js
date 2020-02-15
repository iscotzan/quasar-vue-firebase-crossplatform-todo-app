import ModalHeader from "./../components/Tasks/Modals/Shared/ModalHeader";
import ModalTaskName from "./../components/Tasks/Modals/Shared/ModalTaskName";
import ModalDueDate from "./../components/Tasks/Modals/Shared/ModalDueDate";
import ModalDueTime from "./../components/Tasks/Modals/Shared/ModalDueTime";
import ModalButtons from "./../components/Tasks/Modals/Shared/ModalButtons";
export default {
  methods: {
    submitForm() {
      // console.log("submit form", this.$refs.name);
      const { name } = this.$refs.modalTaskName.$refs;
      if (!name.hasError) {
        this.submitTask();
      }
      name.validate();
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
