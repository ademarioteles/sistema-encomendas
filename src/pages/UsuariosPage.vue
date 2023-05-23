<template>
  <div class="">
    <form>
      <h5 class="titulo" style="text-align: center">LISTA DE USUÁRIOS</h5>
      <div class="encomendas-list">
        <q-list color="amber">
          <q-item
            v-for="item in itens"
            :key="item.id"
            clickable
            class="rastreamento"
            @click="mostrarPopup(item)"
          >
            <q-item-section>
              <!--{{ item.texto }}-->

              <span>{{ item.nome }}</span>
            </q-item-section>

            <q-item-section
              v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
            >
              <q-btn
                v-if="!item.entregue"
                rounded=""
                flat
                color="blue"
                icon="edit"
                name="edit"
                label="Editar"
                @click.stop="confirmarRecebimento(item)"
              />
            </q-item-section>
            <q-item-section
              v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
            >
              <q-btn
                v-if="!item.entregue"
                rounded=""
                flat
                color="red"
                icon="remove"
                name="remove"
                label="Remover"
                @click.stop="confirmarRecebimento(item)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </form>
    <q-dialog v-model="popupAberto">
      <q-card>
        <q-card-section>
          <div>
            <p>
              <strong>Nome:</strong>
              {{ identificadorPopup.nome }}
            </p>
            <p>
              <strong>CPF:</strong>
              {{ identificadorPopup.cpf }}
            </p>
            <p>
              <strong>Apartamentos:</strong>
              {{ identificadorPopup.apartamentos }}
            </p>
            <p>
              <strong>Tipo de Usuario:</strong>
              {{ identificadorPopup.tipoUsuario }}
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="teal" @click="popupAberto = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import api from "/api";
const user = JSON.parse(sessionStorage.getItem("usuario"));

export default defineComponent({
  name: "UsuariosPage",
  data() {
    return {
      itens: [{}],
      popupAberto: false,
      identificadorPopup: "",
      tipoUsuario: user.tipoUsuario,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async listarUser() {},
    mostrarPopup(id) {
      this.identificadorPopup = id;

      this.popupAberto = true;
    },

    async getUsers() {
      await api
        .get(`/usuarios`, { params: { apartamento: user.chaveAcesso } })
        .then((res) => {
          this.itens = res.data;
          this.listarUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style></style>
