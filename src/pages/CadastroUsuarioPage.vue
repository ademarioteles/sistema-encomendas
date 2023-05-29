<template>
  <div class="bg-white" v-if="userExis == 'sindico' || userExis == 'porteiro'">
    <div class="cadastro q-pa-md">
      <q-form @submit="enviarUsuario()">
        <h5 style="font-size: 25px; color: teal; font-weight: bolder">
          CADASTRO DE USUÁRIO
        </h5>
        <q-radio
          keep-color
          v-if="userExis == 'sindico'"
          v-model="tipoUsuario"
          val="sindico"
          label="Sindico"
          color="teal"
          @click="deixarNulo()"
        />
        <q-radio
          keep-color
          v-if="userExis == 'sindico'"
          v-model="tipoUsuario"
          val="porteiro"
          label="Porteiro"
          color="teal"
          @click="deixarNulo()"
        />
        <q-radio
          checked-icon
          keep-color
          v-model="tipoUsuario"
          val="inquilino"
          label="Inquilino"
          color="teal"
          @click="deixarNulo()"
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
          v-if="tipoUsuario === 'sindico' || tipoUsuario === 'porteiro'"
          filled
          v-model="codigoDeAcesso"
          label="CHAVE DE ACESSO:"
          placeholder="1234"
          color="teal"
          type="password"
          :dense="dense"
          :rules="[(val) => (val && val.length > 2) || 'Digite uma chave']"
        />
        <!-- dados para o dialog -->
        <q-input
          label="APARTAMENTO"
          v-model="apartamento"
          stack-label
          counter
          maxlength="4"
          :dense="dense"
          v-if="tipoUsuario != 'porteiro'"
        >
          <template #append>
            <q-btn
              round
              dense
              flat
              icon="add"
              @click="adicionarApartamento"
              :disable="apartamento.trim() === ''"
            />
          </template>
        </q-input>

        <ul>
          <p v-for="(ap, index) in apartamentos" :key="ap.id">
            {{ ap }}
            <q-btn
              outline
              color="red"
              icon="remove"
              name="remove"
              label="Remover"
              @click="removeApartamento(index)"
            />
          </p>
        </ul>

        <q-btn
          type="submit"
          :loading="submitting"
          label="Enviar"
          class="full-width"
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
import { Notify } from "quasar";

export default defineComponent({
  name: "CadastroUsuarioPage",

  data() {
    const userExist = JSON.parse(sessionStorage.getItem("usuario"));

    return {
      tipoUsuario: ref("inquilino"),
      userExis: userExist.tipoUsuario,
      nome: ref(""),
      cpf: ref(""),
      codigoDeAcesso: ref(""),
      prompt: ref(false),
      apartamento: ref(""),
      apartamentos: [],
    };
  },
  methods: {
    adicionarApartamento() {
      this.apartamentos.push(this.apartamento);
      this.apartamento = "";
    },
    removeApartamento(index) {
      this.apartamentos.splice(index, 1);
    },
    deixarNulo() {
      this.cpf = ref("");
      this.nome = ref("");
      this.codigoDeAcesso = ref("");
      this.apartamentos = [];
    },
    async enviarUsuario() {
      await api
        .get(`/usuarios?cpf=${this.cpf}`, {})
        .then((res) => {
          if (
            res.data.length == 0 &&
            (this.tipoUsuario == "sindico" || this.tipoUsuario == "porteiro")
          ) {
            api
              .post("/usuarios", {
                nome: this.nome,
                cpf: this.cpf,
                codigoAcesso: this.codigoDeAcesso,
                tipoUsuario: this.tipoUsuario,
                apartamentos: this.apartamentos,
              })
              .then((res) => {
                Notify.create({
                  type: "positive",
                  message: "Cadrastro realizado com sucesso.",
                });
              })
              .catch((error) => {
                Notify.create({
                  type: "negative",
                  message: "Não foi possivel realizar o cadastro.",
                });
              });
          } else if (res.data.length == 0 && this.tipoUsuario == "inquilino") {
            api
              .post("/usuarios", {
                nome: this.nome,
                cpf: this.cpf,
                tipoUsuario: this.tipoUsuario,
                apartamentos: this.apartamentos,
              })
              .then((res) => {
                Notify.create({
                  type: "positive",
                  message: "Cadrasto realizado com sucesso.",
                });
              })
              .catch((error) => {
                Notify.create({
                  type: "negative",
                  message: "Não foi possivel realizar o cadastro.",
                });
              });
          } else {
            Notify.create({
              type: "negative",
              message: "Conta já existente na base.",
            });
          }
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar na base.",
          });
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
