<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-toolbar-title>
          <img class="q-mr-sm" src="./../assets/apartments.png" />Condominium
          Management
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const userExist = JSON.parse(sessionStorage.getItem("usuario"));

    return {
      userExis: userExist,
    };
  },
  mounted() {
    if (this.userExis != null) {
      this.$router.push("/encomendas");
      this.essentialLinks = null;
      this.leftDrawerOpen = null;
    }
  },
});
</script>
