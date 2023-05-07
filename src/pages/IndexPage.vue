<template>
  <div class="container bg-white">
    <div class="bg-gray" style="max-width: 300px">
      <h5><b>ACESSAR SISTEMA</b></h5>
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
      v-model="color"
      val="porsin"
      label="Porteiro/Sindico"
      color="teal"
      @click="buscarRadio()"
    />
    <q-radio
      keep-color
      v-model="color"
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
    <q-row>
      <q-col cols="auto">
        <q-btn
          val="Entrar"
          unelevated
          rounded
          color="secondary"
          label="Entrar"
        />
      </q-col>
    </q-row>
    <br />
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
