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

        <div>
          <q-btn
            color="black"
            round
            icon="directions"
            @click="sair()"
            label="Sair"
          />
        </div>
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
];
const listSind = [
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
];
const listPort = [
  {
    title: "Encomendas",
    caption: "Página de Encomendas",
    icon: "store",
    link: "/encomendas",
  },
  {
    title: "Cadastrar Encomendas",
    caption: "Página de cadastro de encomendas",
    icon: "store",
    link: "/encomendas/cadastrar",
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
  methods: {
    sair() {
      sessionStorage.removeItem("usuario");
      this.$router.push("/");
    },
  },
  mounted() {
    if (this.userExis != null) {
      if (this.userExis.tipoUsuario === "sindico") {
        this.essentialLinks = listSind;
      } else if (this.userExis.tipoUsuario === "porteiro") {
        this.essentialLinks = listPort;
      } else if (this.userExis.tipoUsuario === "inquilino") {
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
