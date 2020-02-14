<template>
  <q-card-section class="row">
    <div class="text-h6"><slot></slot></div>
    <q-space />
    <q-btn v-close-popup flat round color="primary" dense icon="close"></q-btn>
  </q-card-section>
</template>
