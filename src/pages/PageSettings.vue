<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show todoz in dark mode</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showInDarkMode" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12HourTimeFormat" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showTasksInOneList" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <!-- <q-item class="absolute-bottom" v-if="$q.platform.is.electron" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Exit App</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="power_settings_new" />
        </q-item-section>
      </q-item> -->
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { openURL } from "quasar";
export default {
  computed: {
    ...mapGetters("settings", ["settings"]),
    show12HourTimeFormat: {
      get() {
        return this.settings.show12HourTimeFormat;
      },
      set(value) {
        this.setShow12HourTimeFormat(value);
      }
    },
    showTasksInOneList: {
      get() {
        return this.settings.showTasksInOneList;
      },
      set(value) {
        this.setShowTasksInOneList(value);
      }
    },
    showInDarkMode: {
      get() {
        return this.settings.showInDarkMode;
      },
      set(value) {
        this.setShowTasksInDarkMode(value);
      }
    }
  },
  methods: {
    ...mapActions("settings", [
      "setShow12HourTimeFormat",
      "setShowTasksInOneList",
      "setShowTasksInDarkMode"
    ]),
    visitOurWebsite() {
      return openURL("http://www.iscovici.com");
    },
    emailUs() {
      window.location.href =
        "mailto:ori@iscovici.com?subject=Todo App Feedback";
    }
  }
};
</script>
