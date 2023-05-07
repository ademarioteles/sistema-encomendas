<template>
  <div class="container bg-white">
    <div class="formulario">
      <h5 class="titulo">ACESSAR SISTEMA</h5>
      <q-form @submit="onSubmit" aciton="" ref="formulario">
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
          v-model="tipoPessoa"
          val="porsin"
          label="Porteiro/Sindico"
          color="teal"
        />
        <q-radio
          keep-color
          v-model="tipoPessoa"
          val="inq"
          label="Inquilino"
          color="teal"
        />
        <q-input
          filled
          chave="apartamento"
          v-model="ap"
          label="Apartamento:"
          placeholder="404"
          color="teal"
          :rules="[
            (val) => (val && val.length > 0) || 'Digite a senha corretamente',
          ]"
        />
        <q-input
          filled
          class="chave"
          v-model="ac"
          label="Chave de Acesso:"
          placeholder="000.000.000-01"
          color="teal"
          :rules="[
            (val) => (val && val.length > 0) || 'Digite a senha corretamente',
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
      cpf: ref(""),
      tipoPessoa: ref(""),
      formulario: ref(""),
      isCpf(cpf) {
        //verificar se o cpf esta dentro dos padrões
        const cpfReggex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfReggex.test(cpf);
      },
      enviarDados() {
        if (this.formulario) {
          Notify.create({
            type: "positive",
            message: "Preencha corretamente os campos para prosseguir.",
          });
        } else if (this.tipoPessoa == "porsin") {
        } else {
          Notify.create({
            type: "negative",
            message: "Preencha corretamente os campos para prosseguir.",
          });
        }
      },
    };
  },
});
</script>
