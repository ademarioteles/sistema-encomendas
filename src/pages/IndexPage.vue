<template>
  <div class="bg-gray" style="max-width: 300px">
    <q-input
      filled
      v-model="ph"
      label="CPF:"
      placeholder="000.000.000-01"
      color="blue"
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
      color: ref("cyan"),
      buscarRadio(valor) {
        alert("hello");
      },
    };
  },
});
</script>
