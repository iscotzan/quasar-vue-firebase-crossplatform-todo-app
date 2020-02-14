import Vue from "vue";
import { uid } from "quasar";
const state = {
  // showAddTaskModal: false,
  tasks: {
    id1: {
      id: 0,
      completed: false,
      name: "Go get coffee and cookies",
      dueDate: "2020/05/09",
      dueTime: "4:30"
    },
    id2: {
      id: 1,
      completed: false,
      name: "Go shop",
      dueDate: "2020/05/09",
      dueTime: "4:30"
    },
    id3: {
      id: 2,
      completed: false,
      name: "Go bananas",
      dueDate: "2020/20/09",
      dueTime: "6:30"
    },
    id4: {
      id: 3,
      completed: false,
      name: "Go sleep",
      dueDate: "2020/23/09",
      dueTime: "4:10"
    }
  },
  search: ""
};
const mutations = {
  //not async
  updateTask(state, payload) {
    console.log(payload);
    Object.assign(state.tasks[payload.id], payload.updates);
  },

  deleteTask(state, id) {
    console.log("delete", id);
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    const { id, task } = payload;
    Vue.set(state.tasks, id, task);
  },
  setSearch(state, value) {
    state.search = value;
  }
};

const actions = {
  //can be async

  updateTask({ commit }, payload) {
    // console.log("updateTask", payload);
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = { id: taskId, task: task };
    commit("addTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  }
};
const getters = {
  tasksFiltered: state => {
    let filteredTasks = {};
    if (state.search.length) {
      Object.keys(state.tasks).forEach(key => {
        let task = state.tasks[key];
        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          filteredTasks[key] = task;
        }
      });
      return filteredTasks;
    } else {
      return state.tasks;
    }
  },
  tasksTodo: state => {
    let tasksFiltered = getters.tasksFiltered(state);
    console.log("TCL: tasksFiltered", tasksFiltered);
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
    let tasksFiltered = getters.tasksFiltered(state);
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
