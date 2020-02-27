import { Notify, Loading } from "quasar";
export function goNotify(message, options = {}) {
  let defaultOptions = {
    color: null,
    textColor: null,
    caption: null,
    position: null,
    icon: null,
    actions: null,
    timeout: null,
    progress: null
  };
  let setup = Object.assign(defaultOptions, options);
  Loading.hide();
  Notify.create({
    message: message,
    color: setup.color ? setup.color : "secondary",
    textColor: setup.textColor ? setup.textColor : "white",
    timeout: setup.timeout ? setup.timeout : 2500,
    actions: setup.actions
      ? setup.actions
      : [{ icon: "close", color: "white" }],
    position: setup.position ? setup.position : "bottom",
    progress: setup.progress ? setup.progress : true,
    icon: setup.icon ? setup.icon : "announcement"
  });
}
