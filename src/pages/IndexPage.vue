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
        v-model="ph"
        color="teal"
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
            color="black"
            label="Entrar"
            @click="buscarRadio()"
          />
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
