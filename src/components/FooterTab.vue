<template>
  <q-route-tab
    :name="title"
    :icon="icon"
    :label="caption"
    :to="to"
    exact
    v-if="to"
  />
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },
    to: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
