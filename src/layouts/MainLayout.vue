<template>
  <q-layout view="lHh lpR fFf">
    <!-- <q-layout view="lHh Lpr lFf"> -->
    <q-header
      elevated
      :class="settings.showInDarkMode ? 'bg-dark' : 'bg-primary'"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          v-if="$q.platform.is.desktop || $q.platform.is.ipad"
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <!-- v-if="($q.platform.is.desktop && !$q.platform.is.electron) || ($q.platform.is.ipad && !$q.platform.is.electron)" -->
        <q-toolbar-title>
          What ToDoz
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          flat
          icon-right="account_circle"
          to="/auth"
          label="Login"
          class="absolute-right"
        ></q-btn>
        <q-btn
          v-else
          flat
          icon-right="exit"
          @click="logoutUser"
          label="Logout"
          class="absolute-right"
        ></q-btn>
        <!-- Quasar v{{ $q.version }} -->
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-tabs>
        <FooterTab
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- <q-route-tab name="todo" icon="list" label="ToDo" to="/" exact />
        <q-route-tab
          name="settings"
          icon="settings"
          label="Settings"
          to="/settings"
          exact
        /> -->
      </q-tabs>
    </q-footer>
    <!-- v-if="!this.$q.platform.is.electron" -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="768"
      :width="250"
      bordered
      :content-class="settings.showInDarkMode ? 'bg-dark' : 'bg-primary'"
    >
      <!-- v-if="loggedIn" -->
      <q-list dark>
        <q-item-label header class="text-blue-3 text-h5"
          >Where Todoz</q-item-label
        >
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item
          clickable
          exact
          class="text-grey-4 absolute-bottom"
          tag="a"
          v-if="$q.platform.is.electron"
          @click="quitApp"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Exit</q-item-label>
            <!-- <q-item-label> exit now</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import FooterTab from "components/FooterTab";
import { mapState, mapActions, mapGetters } from "vuex";
import { Platform } from "quasar";
if (Platform.is.electron) {
  // import { ipcRenderer } from "electron";
}
export default {
  name: "MainLayout",

  components: {
    EssentialLink,
    FooterTab
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Todoz",
          caption: "Todoz",
          icon: "list",
          link: null,
          to: "/"
        },
        {
          title: "Settings",
          caption: "Settings",
          icon: "settings",
          link: null,
          to: "/settings"
        }
        // {
        //   title: "About",
        //   caption: "About",
        //   icon: "info",
        //   link: null,
        //   to: "/about"
        // }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
    ...mapGetters("settings", ["settings"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    quitApp() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to quit todoz now?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
          if (this.$q.platform.is.electron) {
            const { ipcRenderer } = window.require("electron");
            ipcRenderer.send("quit-app");
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>
<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .q-footer {
    display: none;
  }
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
}
</style>
