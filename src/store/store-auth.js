import { firebaseAuth } from "./../boot/firebase";
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
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log("TCL: registerUser -> res ", res);
      })
      .catch(err => {
        console.error("TCL: registerUser -> err", err);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  loginUser({}, payload) {
    console.log("TCL: loginUser -> payload", payload);
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log("TCL: loginUser -> res", res);
      })
      .catch(err => {
        console.error("TCL: loginUser -> err", err);
      });
  },
  handleAuthStateChange({ commit }) {
    console.log("TCL: handleAuthStateChange -> handleAuthStateChange");
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit("setLoggedIn", true);
        this.$router.push("/").catch(err => {
          console.log("TCL: handleAuthStateChange -> err", err);
        });
      } else {
        commit("setLoggedIn", false);
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
