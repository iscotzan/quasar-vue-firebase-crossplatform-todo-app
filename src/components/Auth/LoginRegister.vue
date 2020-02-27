<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md ">
      <q-banner dense :class="settings.showInDarkMode ? 'bg-secondary col' : 'bg-grey-3 col'">
        <template v-slot:avatar>
          <q-icon name="account_circle" :color="settings.showInDarkMode ? 'blue-2' : 'primary'" />
        </template>
        {{ tab | titleCase }} to access your todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        type="email"
        ref="email"
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        v-model="formData.password"
        label="Password"
        stack-label
        ref="password"
        type="password"
        :rules="[val => val.length >= 6 || 'Please use at least 6 characters']"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab"></q-btn>
    </div>
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["tab"],

  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),

    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === "login") {
          console.log("login");
          this.loginUser(this.formData);
        } else {
          console.log("Reg user");
          this.registerUser(this.formData);
        }
      }
    },
    isValidEmailAddress(email) {
      console.log("TCL: isValidEmailAddress -> email", email);
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
