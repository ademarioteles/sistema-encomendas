<template>
  <div
    class="cadastro q-pa-md"
    v-if="userExis == 'sindico' || userExis == 'porteiro'"
  >
    <q-form @submit="enviarEncomenda()" class="q-gutter-md">
      <h1 style="font-size: 22px; color: teal; font-weight: bolder">
        CADASTRO DE ENCOMENDAS
      </h1>

      <q-input
        filled
        v-model="indentificador"
        label="Nome para Encomenda *"
        color="teal"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor digite o nome do objeto',
        ]"
      />

      <q-input
        filled
        color="teal"
        v-model="recebedor"
        label="Nome do recebedor *"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Por favor digite o responsavel pela encomenda',
        ]"
      />

      <q-select
        label=" Apartamento"
        color="teal"
        v-model="apartamento"
        :options="listaApartamentos"
        estilo=" largura : 250px "
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor selecione um apartamento',
        ]"
      />

      <q-input
        filled
        type="date"
        color="teal"
        v-model="dataRecebimento"
        label="Data do Recebimento *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Por favor selecione a data',
        ]"
      />

      <q-btn label="Cadastrar" color="teal" type="submit" />
    </q-form>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { ref } from "vue";
import { defineComponent } from "vue";
import api from "/api";

export default defineComponent({
  data() {
    const userExist = JSON.parse(sessionStorage.getItem("usuario"));
    return {
      indentificador: ref(""),
      userExis: userExist.tipoUsuario,
      apartamento: ref(null),
      recebedor: ref(""),
      dataRecebimento: ref(""),
      usuario: {},
      listaApartamentos: [],
    };
  },
  mounted() {
    this.getApartamentos();
  },
  methods: {
    enviarEncomenda() {
      api
        .post("/encomendas", {
          identificador: this.identificador,
          apartamento: this.apartamento,
          recebedor: this.recebedor,
          dataRecebimento: this.dataRecebimento,
        })
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Encomenda Cadastrada",
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
    async getApartamentos() {
      await api
        .get("/usuarios")
        .then((res) => {
          this.usuario = res.data;
          this.validarDados();
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar na base.",
          });
        });
    },
    validarDados() {
      const apartamentosEncontrados = this.usuario
        .flatMap(
          (apartamentosEncontrados) => apartamentosEncontrados.apartamentos
        )
        .flat();
      this.listaApartamentos = apartamentosEncontrados;
    },
  },
});
</script>
