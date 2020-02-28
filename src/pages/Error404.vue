<template>
  <div
    class="fixed-center text-center bg-grey-1 q-pa-md shadow-2 rounded-borders"
  >
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn color="secondary" style="width:200px;" to="/" label="Go back" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Error404",
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>
