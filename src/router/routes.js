const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/encomendas",
    component: () => import("layouts/EncomendasLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/EncomendasPage.vue"),
      },
      {
        path: "cadastrar",
        component: () => import("pages/CadastrarEncomenda.vue"),
      },
      /*<<<<<<< HEAD*/
    ],
  },
  {
    path: "/",
    component: () => import("layouts/EncomendasLayout.vue"),
    children: [
      {
        path: "cadastrousuario",
        component: () => import("pages/CadastroUsuarioPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
