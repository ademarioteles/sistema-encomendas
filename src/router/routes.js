const routes = [
  {
    name: "indexPage",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "indexPage",
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
        path: "historico",
        component: () => import("pages/HistoricoPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/CadastroUsuarioLayout.vue"),
    children: [
      {
        path: "cadastrousuario",
        component: () => import("pages/CadastroUsuarioPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
