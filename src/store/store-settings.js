import { LocalStorage, Dark } from "quasar";
const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false,
    showInDarkMode: false
  }
};
const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value;
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value;
  },
  setShowTasksInDarkMode(state, value) {
    state.settings.showInDarkMode = value;
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings);
  }
};

const actions = {
  //can be async
  setShow12HourTimeFormat({ commit, dispatch }, value) {
    commit("setShow12HourTimeFormat", value);
    dispatch("saveSettings");
    // localStorage.setItem("show12HourTimeFormat", value);
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit("setShowTasksInOneList", value);
    dispatch("saveSettings");
    // localStorage.setItem("showTasksInOneList", value);
  },
  setShowTasksInDarkMode({ commit, dispatch }, value) {
    Dark.set(value)
    commit("setShowTasksInDarkMode", value);
    dispatch("saveSettings");
    // localStorage.setItem("showTasksInOneList", value);
  },
  saveSettings({ state }) {
    LocalStorage.set("settings", state.settings);
  },
  getSettings({ commit }) {
    console.log("TCL: getSettings -> getSettings");
    let settings = LocalStorage.getItem("settings");
    if (settings) {
      if(settings.showInDarkMode){
        Dark.set(settings.showInDarkMode)
      }
      commit("setSettings", settings);
    }
  }
};
const getters = {
  settings: state => {
    return state.settings;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
