<template>
  <q-layout view="lHh lpR fFf">
    <!-- <q-layout view="lHh Lpr lFf"> -->
    <q-header elevated>
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

        <q-toolbar-title>
          What ToDo
        </q-toolbar-title>

        <q-btn flat icon-right="account_circle" to="/auth" label="Login" class="absolute-right"></q-btn>
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
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header class="text-blue-3 text-h5"
          >Where To Go</q-item-label
        >
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Todo",
          caption: "Todo",
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
        },
        {
          title: "About",
          caption: "About",
          icon: "info",
          link: null,
          to: "/about"
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
@media screen and (min-width: 768px) {
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
