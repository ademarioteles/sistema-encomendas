<template>
  <div class="cadastro q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <h1 style="font-size: 22px; color: teal; font-weight: bolder">
        CADASTRO DE ENCOMENDAS
      </h1>

      <q-input
        filled
        v-model="indentificacao"
        label="Código do Item *"
        color="teal"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor digite algo o código',
        ]"
      />

      <q-select
        preenchido
        v-model="Apartamento"
        label=" Apartamento"
        color="teal"
        :options="numeroapartamento"
        estilo=" largura : 250px "
        comportamento=" menu "
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor selecione um apartamento',
        ]"
      />

      <q-input
        filled
        color="teal"
        v-model="Recebedor"
        label="Cpf do recebedor *"
        mask="###.###.###.##"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Por favor digite algo quem é o recebedor',
        ]"
      />

      <q-input
        filled
        type="date"
        color="teal"
        v-model="datarecebimento"
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
import useQuasar from "quasar/src/composables/use-quasar.js";
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const indentificacao = ref(null);
    const Apartamento = ref(null);
    const Recebedor = ref(null);
    const datarecebimento = ref(null);

    return {
      indentificacao,
      Apartamento,
      Recebedor,
      datarecebimento,
    };
  },
  onSubmit() {},
  numeroapartamento() {},
});
</script>
