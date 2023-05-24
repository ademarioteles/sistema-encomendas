<template v-if="template">
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

        <q-toolbar-title class="preconnect">
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
const listSindPor = [
  {
    title: "Encomendas",
    caption: "Página de Encomendas",
    icon: "local_shipping",
    link: "/encomendas",
  },
  {
    title: "Cadastrar Usuario",
    caption: "Página de cadastro de usuario",
    icon: "person_add",
    link: "/usuarios/cadastrar",
  },
  {
    title: "Usuarios",
    caption: "Página de usuarios",
    icon: "supervised_user_circle",
    link: "/usuarios",
  },
  {
    title: "Cadastrar Encomendas",
    caption: "Página de cadastro de encomendas",
    icon: "add_shopping_cart",
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
      template: ref(),
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
      if (
        this.userExis.tipoUsuario == "sindico" ||
        this.userExis.tipoUsuario == "porteiro"
      ) {
        this.essentialLinks = listSindPor;
        this.template = true;
      } else {
        this.$router.push("/encomendas/");
        this.template = true;
      }
    } else {
      this.$router.push("/");
      this.essentialLinks = null;
      this.leftDrawerOpen = null;
    }
  },
});
</script>
