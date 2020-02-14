<template>
  <q-banner
    dense
    inline-actions
    :class="bgColor"
    class="text-white text-center list-header"
  >
    <span class="text-bold text-subtitle-1">
      <slot></slot>
    </span>
  </q-banner>
</template>
<script>
export default {
  props: ["bgColor"]
};
</script>
<style scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
