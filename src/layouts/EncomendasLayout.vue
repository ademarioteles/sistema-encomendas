<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img class="q-mr-sm" src="./../assets/apartments.png" />Condominium
          Management
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header> Opções</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container v-if="userExis != null">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
const listInq = [
  {
    title: "Encomendas",
    caption: "Página de Encomendas",
    icon: "store",
    link: "/encomendas",
  },
  {
    title: "Histórico",
    caption: "Histórico das encomendas",
    icon: "book",
    link: "/encomendas/historico",
  },
];
const listPorsin = [
  {
    title: "Encomendas",
    caption: "Página de Encomendas",
    icon: "store",
    link: "/encomendas",
  },
  {
    title: "Cadastrar Usuario",
    caption: "Página de cadastro de usuario",
    icon: "people",
    link: "/cadastrousuario",
  },
  {
    title: "Cadastrar Encomendas",
    caption: "Página de cadastro de encomendas",
    icon: "store",
    link: "/encomendas/cadastrar",
  },

  {
    title: "Histórico",
    caption: "Histórico das encomendas",
    icon: "book",
    link: "/encomendas/historico",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const userExist = JSON.parse(sessionStorage.getItem("usuario"));

    return {
      essentialLinks: "",
      userExis: userExist,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    if (this.userExis != null) {
      if (this.userExis.tipoUsuario === "porsin") {
        this.essentialLinks = listPorsin;
      } else {
        this.essentialLinks = listInq;
      }
    } else {
      this.$router.push("/");
      this.essentialLinks = null;
     this.leftDrawerOpen = null;
    }
  },
});
</script>
