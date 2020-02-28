// import something here
import { LocalStorage } from "quasar";

// "async" is optional
export default async ({ router /* app, router, Vue, ... */ }) => {
  // something to do

  router.beforeEach((to, from, next) => {
    // console.log("TCL: user", user);
    let loggedIn = LocalStorage.getItem("loggedIn");
    let emailVerified = LocalStorage.getItem("emailVerified");
    // console.log("TCL: emailVerified", emailVerified);
    // console.log("TCL: to.path", to.path);
    if (!loggedIn && to.path != "/auth") {
      next("/auth");
    } else {
      if (to.path == "/auth") {
        next();
      }
      if (from.path == "/completeAccount") {
        next();
      }
      // console.log(to.path);
      else if (
        !emailVerified &&
        to.path != "/verifyEmail" &&
        to.path != "/completeAccount"
      ) {
        next("/verifyEmail");
      } else {
        next();
      }
    }
  });
};
