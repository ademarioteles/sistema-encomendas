<template>
  <div class="container bg-white">
    <div style="width: 450px; text-align: center">
      <h5><b style="color: teal">ACESSAR SISTEMA</b></h5>
      <q-input
        filled
        v-model="cpf"
        label="CPF:"
        placeholder="000.000.000-01"
        color="teal"
        :dense="dense"
      />

      <q-radio
        keep-color
        v-model="tipoPessoa"
        val="porsin"
        label="Porteiro/Sindico"
        color="teal"
        @click="buscarRadio()"
      />
      <q-radio
        keep-color
        v-model="tipoPessoa"
        val="inq"
        label="Inquilino"
        color="teal"
        @click="buscarRadio()"
      />
      <q-input
        filled
        v-model="ph"
        label="PASSWORD:"
        placeholder="000.000.000-01"
        :dense="dense"
      />
      <br />
      <q-row>
        <q-col cols="auto">
          <q-btn val="Entrar" color="teal" label="Entrar" />
        </q-col>
      </q-row>
      <br />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      cpf: ref(""),
      tipoPessoa: ref(""),
      buscarRadio() {
        alert(this.cpf);
      },
    };
  },
});
</script>
