// import something here
import { LocalStorage } from "quasar";
// "async" is optional
export default async ({ router /* app, router, Vue, ... */ }) => {
  // something to do
  // const router = new VueRouter({ ... })

  router.beforeEach((to, from, next) => {
    console.log("TCL: to, from, next", to, from, next);
    // ...
    let loggedIn = LocalStorage.getItem("loggedIn");
    if (!loggedIn && to.path !== "/auth"){
    console.log("TCL: !loggedIn && to.path !== /auth")
      next('/auth')
    }else{
      next()
    }
  });
};
