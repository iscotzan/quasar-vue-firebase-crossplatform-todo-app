<template>
  <div id="q-app" >
    <router-view />
  </div>
</template>

<script>
import { mapActions,
//  mapGetters 
 } from "vuex";
// get status
// console.log(this.$q.dark.isActive) // true, false

// // get configured status
// console.log(this.$q.dark.mode) // "auto", true, false

// // set status
// this.$q.dark.set(true) // or false or "auto"

// toggle
// this.$q.dark.toggle()
export default {
  name: "App",
  mounted() {
    this.getSettings();
    this.handleAuthStateChange();
  },
  methods: {
    ...mapActions("settings", ["getSettings"]),
    ...mapActions("auth", ["handleAuthStateChange"])
  },
  // computed: {
  //   ...mapGetters("settings", ["settings"])
  // }
};
</script>
