<template>
  <div
    class="cadastro q-pa-md"
    v-if="userExis == 'sindico' || userExis == 'porteiro'"
  >
    <q-form @submit="enviarEncomenda()">
      <h1 style="font-size: 22px; color: teal; font-weight: bolder">
        CADASTRO DE ENCOMENDAS
      </h1>

      <q-input
        filled
        v-model="identificador"
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
        mask="##/##/####"
        label="Data do Recebimento *"
        :max="getDataAtualFormatada()"
        lazy-rules
        :rules="[(val) => val !== null || 'Por favor, selecione a data']"
      />
      <q-btn label="Cadastrar" class="full-width" color="teal" type="submit" />
    </q-form>
  </div>
</template>

<script>
import { Notify, date } from "quasar";
import { ref } from "vue";
import { defineComponent } from "vue";
import api from "/api";

export default defineComponent({
  data() {
    const userExist = JSON.parse(sessionStorage.getItem("usuario"));
    return {
      identificador: ref(""),
      userExis: userExist.tipoUsuario,
      apartamento: ref(null),
      recebedor: ref(""),
      dataRecebimento: null,
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
          dataRecebimento: date.formatDate(this.dataRecebimento, "DD/MM/YYYY"),
          dataEntrega: null,
          entregue: false,
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
          const apartamentosEncontrados = res.data
            .flatMap(
              (apartamentosEncontrados) => apartamentosEncontrados.apartamentos
            )
            .filter((apartamentosEncontrados) => apartamentosEncontrados != "")
            .flat();
          this.listaApartamentos = apartamentosEncontrados;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar na base.",
          });
        });
    },
    getDataAtualFormatada() {
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, "0");
      const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
      const ano = dataAtual.getFullYear();
      return `${ano}-${mes}-${dia}`;
    },
  },
});
</script>
