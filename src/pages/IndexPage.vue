<template>
  <div class="container bg-white">
    <div class="formulario">
      <h5 class="titulo">ACESSAR SISTEMA</h5>
      <q-form @submit.prevent="onSubmit" action="/encomendas">
        <q-input
          filled
          v-model="cpf"
          label="Cpf:"
          placeholder="000.000.000-01"
          color="teal"
          :rules="[
            (val) =>
              (val && val.length > 0 && isCpf(val)) ||
              'Digite o CPF corretamente',
          ]"
        />

        <q-radio
          keep-color
          class="porteiro"
          v-model="tipoPessoa"
          val="porsin"
          label="Porteiro/Sindico"
          color="teal"
          @click="verificarOpcao()"
        />
        <q-radio
          class="inquilino"
          keep-color
          v-model="tipoPessoa"
          val="inq"
          label="Inquilino"
          color="teal"
          @click="verificarOpcao()"
        />
        <q-input
          v-if="isPorSin"
          filled
          v-model="ac"
          label="Chave de Acesso:"
          type="password"
          placeholder=""
          color="teal"
          :rules="[
            (val) =>
              (val && val.length > 0 && isPorSin == true) ||
              'Digite a chave de acesso corretamente',
          ]"
        />
        <q-input
          v-if="isInq"
          filled
          v-model="ac"
          label="Número do apartamento:"
          placeholder="404"
          color="teal"
          :rules="[
            (val) =>
              (val && val.length > 0 && isInq == true) ||
              'Digite o nº do apartamento corretamente',
          ]"
        />
        <br />

        <q-btn val="Entrar" type="submit" color="teal" label="Entrar" />
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/api";
import { Notify } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      isInq: false,
      isPorSin: false,
      cpf: ref(""),
      tipoPessoa: ref(),
      ac: ref(),
      usuario: {},
      validData: false,
    };
  },

  methods: {
    onSubmit: async function (evt) {
      await this.getUsuario();
      if (this.validData) {
        evt.target.submit();
      }
    },
    isCpf(cpf) {
      //verificar se o cpf esta dentro dos padrões
      const cpfReggex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      return cpfReggex.test(cpf);
    },
    validarDados() {
      const usuarioEncontrado = this.usuario.find((u) => u.cpf === this.cpf);
      if (!usuarioEncontrado) {
        Notify.create({
          type: "negative",
          message: "Dados Invalidos.",
        });
        return;
      }
      if (this.isInq) {
        const apartamentoEncontrado = this.usuario
          .flatMap((u) => u.apartamentos)
          .flat()
          .find((a) => a === this.ac);

        if (apartamentoEncontrado) {
          this.validData = true;
          return;
        }
      } else if (this.isPorSin) {
        if (usuarioEncontrado.codigoDeAcesso === this.ac) {
          this.validData = true;
          return;
        }
      }
      Notify.create({
        type: "negative",
        message: "Dados Invalidos.",
      });
    },
    verificarOpcao() {
      if (this.tipoPessoa == "porsin") {
        //Verificar se o Radio Porteiro/Sindico foi selecionado
        this.isPorSin = true;
        this.isInq = false;
        this.ac = ref("");
      } else if (this.tipoPessoa == "inq") {
        //Verificar se o Radio Inquilino foi selecionado
        this.isPorSin = false;
        this.isInq = true;
        this.ac = ref("");
      }
    },
    async getUsuario() {
      await api
        .get("/usuarios")
        .then((res) => {
          this.usuario = res.data;
          this.validarDados();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
