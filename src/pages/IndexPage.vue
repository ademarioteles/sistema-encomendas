<template>
  <div class="container bg-white">
    <div class="formulario">
      <h5 class="titulo">ACESSAR SISTEMA</h5>
      <q-form @submit="onSubmit" aciton="">
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
          placeholder=""
          color="teal"
          :rules="[
            (val) =>
              (val && val.length > 0 && isPorSin == true) ||
              'Digite a senha corretamente',
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
              'Digite a senha corretamente',
          ]"
        />
        <br />

        <q-btn
          val="Entrar"
          type="submit"
          color="teal"
          label="Entrar"
          @click="enviarDados()"
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
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
    };
  },

  methods: {
    isCpf(cpf) {
      //verificar se o cpf esta dentro dos padrões
      const cpfReggex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      return cpfReggex.test(cpf);
    },
    enviarDados() {
      if (this.formulario == "porsin") {
      } else if (this.tipoPessoa == "porsin") {
      } else {
        Notify.create({
          type: "negative",
          message: "Preencha corretamente os campos para prosseguir.",
        });
      }
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
  },
});
</script>
<!-- 

    Notify.create({
            type: "positive",
            message: "Preencha corretamente os campos para prosseguir.",
          });

-->
