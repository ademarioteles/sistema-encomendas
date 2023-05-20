<template>
  <div class="bg-white">
    <div class="cadastro q-pa-md">
      <q-form @submit="enviarUsuario()" class="q-gutter-md">
        <h5 style="font-size: 25px; color: teal; font-weight: bolder">
          CADASTRO DE USUÁRIO
        </h5>
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
          color="teal"
          :rules="[(val) => (val && val.length > 2) || 'Digite um nome']"
        />
        <q-input
          filled
          v-model="cpf"
          label="CPF:"
          mask="###.###.###-##"
          placeholder="000.000.000-00"
          color="teal"
          :dense="dense"
          :rules="[
            (val) => (val && val.length > 10 && isCpf(val)) || 'Digite um cpf',
          ]"
        />
        <q-input
          v-if="tipoUsuario === 'sindico'"
          filled
          v-model="codigoDeAcesso"
          label="CHAVE DE ACESSO:"
          placeholder="1234"
          color="teal"
          type="password"
          :dense="dense"
          :rules="[(val) => (val && val.length > 2) || 'Digite uma chave']"
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
          <p v-for="ap in apartamentos" :key="ap.value">
            {{ ap }}
          </p>
        </ul>
        <q-btn
          type="submit"
          :loading="submitting"
          label="Enviar"
          class="q-mt-md"
          color="teal"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        <br />
      </q-form>
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
    };
  },
  methods: {
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
          Notify.create({
            type: "positive",
            message: "Encomenda Cadastrada",
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
    isCpf(cpf) {
      //verificar se o cpf esta dentro dos padrões
      const cpfReggex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      return cpfReggex.test(cpf);
    },
  },
});
</script>
