import Vue from "vue";
import { uid } from "quasar";
import { firebaseDB, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";
import { goNotify } from "../functions/function-notify";
const state = {
  // showAddTaskModal: false,
  tasks: {},
  search: "",
  sort: "dueDate",
  tasksLoaded: false
};
const mutations = {
  //not async
  updateTask(state, payload) {
    // console.log(payload);
    Object.assign(state.tasks[payload.id], payload.updates);
  },

  deleteTask(state, id) {
    // console.log("delete", id);
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    const { id, task } = payload;
    Vue.set(state.tasks, id, task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setTasksLoaded(state, value) {
    state.tasksLoaded = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
  clearTasks(state) {
    state.tasks = {};
  }
};

const actions = {
  //can be async

  updateTask({ dispatch }, payload) {
    // console.log("updateTask", payload);
    // commit("updateTask", payload);
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = { id: taskId, task: task };
    // commit("addTask", payload);
    dispatch("fbAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbDeleteTask({}, taskId) {
    // console.log("TCL: fbAddTask -> payload", payload);
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDB.ref(`tasks/${userId}/${taskId}`);
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        goNotify("task removed!", {
          color: "negative",
          icon: "remove_circle_outline"
        });
      }
    });
  },
  fbUpdateTask({}, payload) {
    // console.log("TCL: fbAddTask -> payload", payload);
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDB.ref(`tasks/${userId}/${payload.id}`);
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        const keys = Object.keys(payload.updates);
        if (keys.includes("completed") && keys.length === 1) {
          //user toggled task completed
          return;
        }
        goNotify("task updated!", { color: "info", icon: "update" });
      }
    });
  },
  fbAddTask({}, payload) {
    // console.log("TCL: fbAddTask -> payload", payload);
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDB.ref(`tasks/${userId}/${payload.id}`);
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        goNotify("task added!", {
          color: "positive",
          icon: "playlist_add_check"
        });
      }
    });
  },
  fbReadData({ commit }) {
    // console.log("TCL: fbReadData -> fbReadData");
    const userId = firebaseAuth.currentUser.uid;
    const userTasks = firebaseDB.ref(`tasks/${userId}`);

    //initial check for data
    userTasks.once(
      "value",
      snapshot => {
        console.log("TCL: fbReadData -> snapshot", snapshot);
        commit("setTasksLoaded", true);
      },
      error => {
        // console.log("TCL: fbReadData ->  error", error);
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );
    //child added
    userTasks.on("child_added", snapshot => {
      let task = snapshot.val();
      // console.log("TCL: fbReadData -> task", task);
      let payload = {
        id: snapshot.key,
        task
      };
      commit("addTask", payload);
    });
    userTasks.on("child_changed", snapshot => {
      let task = snapshot.val();
      // console.log("TCL: fbReadData -> task", task);
      let payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTask", payload);
    });
    userTasks.on("child_removed", snapshot => {
      let taskId = snapshot.key;
      commit("deleteTask", taskId);
    });
  }
};
const getters = {
  tasksSorted: state => {
    let sortedTasks = {},
      keysOrdered = Object.keys(state.tasks);
    // console.log("TCL: keysOrdered", keysOrdered, state);
    keysOrdered.sort((a, b) => {
      // console.log(state.tasks[a][state.sort], state.tasks[b][state.sort]);
      if (
        state.tasks[a][state.sort] === undefined &&
        state.tasks[b][state.sort] === undefined
      ) {
        return 0;
      } else if (state.tasks[b][state.sort] === undefined) {
        return 1;
      } else if (state.tasks[a][state.sort] === undefined) {
        return -1;
      }
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });
    keysOrdered.forEach(key => {
      sortedTasks[key] = state.tasks[key];
    });
    // console.log("TCL: sortedTasks", sortedTasks);
    return sortedTasks;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted(state),
      filteredTasks = {};
    if (state.search.length) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          filteredTasks[key] = task;
        }
      });
      return filteredTasks;
    } else {
      return tasksSorted;
    }
  },
  tasksTodo: state => {
    let tasksFiltered = getters.tasksFiltered(state, getters);
    // console.log("TCL: tasksFiltered", tasksFiltered);
    let tasks = {};

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: state => {
    let tasksFiltered = getters.tasksFiltered(state, getters);
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
