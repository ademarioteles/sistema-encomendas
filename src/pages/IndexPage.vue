<template>
  <div class="">
    <div class="cadastro q-pa-md">
      <h5 class="titulo">ACESSAR SISTEMA DE ENCOMENDAS</h5>
      <img src="../assets/index.jpg" style="width: 40%; height: 5%" />
      <q-form @submit.prevent="onSubmit" action="/encomendas">
        <q-input
          filled
          v-model="cpf"
          mask="###.###.###-##"
          label="CPF:"
          placeholder="000.000.000-01"
          color="teal"
          :rules="[
            (val) =>
              (val && val.length > 0 && isCpf(val)) ||
              'Digite o CPF corretamente',
          ]"
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

        <q-radio
          keep-color
          v-model="tipoPessoa"
          val="sindico"
          label="Sindico"
          color="teal"
          @click="verificarOpcao()"
        />
        <q-radio
          keep-color
          v-model="tipoPessoa"
          val="porteiro"
          label="Porteiro"
          color="teal"
          @click="verificarOpcao()"
        />
        <q-radio
          keep-color
          v-model="tipoPessoa"
          val="inquilino"
          label="Inquilino"
          color="teal"
          @click="verificarOpcao()"
        />
        <br />
        <q-btn
          class="full-width"
          val="Entrar"
          type="submit"
          color="teal"
          label="Entrar"
        />
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
      isInq: true,
      isPorSin: false,
      cpf: ref(""),
      tipoPessoa: ref("inquilino"),
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
      const usuarioEncontrado = this.usuario.find(
        (u) => u.cpf === this.cpf && u.tipoUsuario == this.tipoPessoa
      );
      if (usuarioEncontrado) {
        if (this.isInq) {
          const apartamentoEncontrado = this.usuario
            .flatMap((u) => u.apartamentos)
            .flat()
            .find((a) => a === this.ac);

          if (apartamentoEncontrado) {
            let b = {
              cpf: this.cpf,
              tipoUsuario: this.tipoPessoa,
              chaveAcesso: this.ac,
            };
            b = JSON.stringify(b);
            sessionStorage.setItem("usuario", b);
            this.validData = true;
            return;
          }
        } else if (this.isPorSin) {
          if (usuarioEncontrado.codigoDeAcesso === this.ac) {
            let b = { cpf: this.cpf, tipoUsuario: this.tipoPessoa };
            b = JSON.stringify(b);
            sessionStorage.setItem("usuario", b);
            this.validData = true;
            return;
          }
        }
      }
      Notify.create({
        type: "negative",
        message: "Dados Invalidos.",
      });
      return;
    },
    verificarOpcao() {
      if (this.tipoPessoa == "sindico") {
        //Verificar se o Radio Porteiro/Sindico foi selecionado
        this.isPorSin = true;
        this.isInq = false;
        this.ac = ref("");
      } else if (this.tipoPessoa == "porteiro") {
        //Verificar se o Radio Inquilino foi selecionado
        this.isPorSin = true;
        this.isInq = false;
        this.ac = ref("");
      } else if (this.tipoPessoa == "inquilino") {
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
          Notify.create({
            type: "negative",
            message: "Erro ao consultar na base.",
          });
        });
    },
  },
});
</script>
