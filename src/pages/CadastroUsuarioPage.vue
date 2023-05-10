<template>
  <div class="container bg-white">
  <div class="formulario">
    <q-radio
      keep-color
      v-model="tipoUsuario"
      val="sindico"
      label="Porteiro/Sindico"
      color="teal"
    />
    <q-radio
      checked-icon
      keep-color
      v-model="tipoUsuario"
      val="inquilino"
      label="Inquilino"
      color="teal"
    />
    <q-input
      filled
      v-model="nome"
      label="NOME:"
      placeholder="Nome Completo"
      :dense="dense"
    />
    <q-input
      filled
      v-model="cpf"
      label="CPF:"
      placeholder="000.000.000-00"
      :dense="dense"
    />
    <q-input
      v-if="tipoUsuario === 'sindico'"
      filled
      v-model="codigoDeAcesso"
      label="CHAVE DE ACESSO:"
      placeholder="1234"
      :dense="dense"
    />

    <q-btn
      label="Adicionar apartamento"
      color="primary"
      @click="prompt = true"
    />
    <br />
    <!-- dados para o dialog -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Numero do Apartamento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="apartamento"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="Adicionar"
            v-close-popup
            @click="adicionarApartamento()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <ul>
      <li v-for="ap in apartamentos" :key="ap.value">
        {{ ap }}
      </li>
    </ul>
    <q-btn
        type="submit"
        :loading="submitting"
        label="Enviar"
        class="q-mt-md"
        color="teal"
        @click="enviarUsuario()"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    <br />
    </div>
  </div>
</template>

<script>
import api from "/api";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CadastroUsuarioPage",

  setup() {
    return {
      tipoUsuario: ref("inquilino"),
      nome: ref(""),
      cpf: ref(""),
      codigoDeAcesso: ref(""),
      prompt: ref(false),
      apartamento: ref(""),
      apartamentos: ref([]),
      adicionarApartamento() {
        this.apartamentos.push(this.apartamento);
        this.apartamento = "";
      },
      enviarUsuario() {
        api
          .post("/usuarios", {
            nome: this.nome,
            cpf: this.cpf,
            tipoUsuario: this.tipoUsuario,
            codigoDeAcesso: this.codigoDeAcesso,
            apartamentos: [this.apartamentos],
          })
          .then(() => {
            alert("Usuário cadastrado com sucesso");
          })
          .catch((error) => {
            alert(error);
          });
      },
    };
  },
});
</script>
