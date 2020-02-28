import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "./../boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";
const state = {
  loggedIn: false,
  emailVerified: false
};
const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setEmailVerified(state, value) {
    state.emailVerified = value;
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
        res.user
          .sendEmailVerification()
          .then(function() {
            // Email sent.
            // console.log("TCL: resend ->  Email sent");
          })
          .catch(function(error) {
            // console.log("TCL: resend -> error", error);
            showErrorMessage(error.message);
            // An error happened.
          });
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  loginUser({}, payload) {
    // console.log("TCL: loginUser -> payload", payload);
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
  updateEmailVerified({ commit, dispatch }, value) {
    console.log("TCL: updateEmailVerified -> value", value);
    LocalStorage.set("emailVerified", value);
    commit("setEmailVerified", value);
    dispatch("tasks/fbReadData", null, { root: true });
    this.$router.push("/completeAccount").catch(err => {
      console.log("TCL: handleAuthStateChange -> err", err);
    });
  },
  handleAuthStateChange({ commit, dispatch }) {
    // console.log("TCL: handleAuthStateChange -> handleAuthStateChange");

    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        // if (!user.emailVerified) {
        //   commit("setLoggedIn", true);
        //   this.$router.replace("/verifyEmail").catch(err => {
        //     console.log("TCL: handleAuthStateChange -> err ", err);
        //   });
        // } else {
        commit("setEmailVerified", user.emailVerified);
        LocalStorage.set("emailVerified", user.emailVerified);
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        if (user.emailVerified) {
          this.$router.push("/").catch(err => {
            console.log("TCL: handleAuthStateChange -> err", err);
          });
          dispatch("tasks/fbReadData", null, { root: true });
        } else {
          let emailVerified = LocalStorage.getItem("emailVerified");
          if (emailVerified) {
            console.log("seems like email is verified, stay here");
            //   this.$router.push("/completeAccount").catch(err => {
            //     console.log("TCL: handleAuthStateChange -> err", err);
            //   });
          } else {
            if (this.$router.currentRoute.path === "/completeAccount") {
              console.log("completeAccount");
            } else {
              this.$router.push("/verifyEmail").catch(err => {
                console.log("TCL: handleAuthStateChange -> err", err);
              });
              console.log("should veriffy email first");
            }
          }
        }
        // }
      } else {
        console.log("do not completeAccount");
        commit("tasks/setTasksLoaded", false, { root: true });
        commit("tasks/clearTasks", null, { root: true });
        commit("setLoggedIn", false);
        commit("setEmailVerified", false);
        LocalStorage.set("loggedIn", false);
        this.$router.push("/auth").catch(err => {
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
