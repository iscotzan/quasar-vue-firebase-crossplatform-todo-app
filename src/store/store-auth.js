import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "./../boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";
const state = {
  loggedIn: false
};
const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};

const actions = {
  //can be async
  registerUser({}, payload) {
    console.log("registerUser ", payload);
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log("TCL: registerUser -> res ", res);
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  loginUser({}, payload) {
    console.log("TCL: loginUser -> payload", payload);
    Loading.show();
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log("TCL: loginUser -> res", res);
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  handleAuthStateChange({ commit }) {
    console.log("TCL: handleAuthStateChange -> handleAuthStateChange");
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch(err => {
          console.log("TCL: handleAuthStateChange -> err", err);
        });
      } else {
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch(err => {
          console.log("TCL: handleAuthStateChange -> err ", err);
        });
      }
    });
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
