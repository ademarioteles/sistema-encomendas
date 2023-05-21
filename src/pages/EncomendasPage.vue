<template>
  <div class="">
    <form>
      <h5 class="titulo" style="text-align: center">
        RASTREAMENTO DE ENCOMENDAS
      </h5>
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

              <img src="../assets/box.png" style="width: 35px" />

              <span v-if="item.entregue" class="status-entregue">
                {{ item.identificador }}</span
              >
              <span v-else class="status-pendente">{{
                item.identificador
              }}</span>
            </q-item-section>
            <q-item-section
              v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
            >
              <q-btn
                rounded=""
                flat
                v-if="!item.entregue"
                color="teal"
                icon="check"
                label="Recebido"
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
              <strong>Identificador:</strong>
              {{ identificadorPopup.identificador }}
            </p>
            <p>
              <strong>Apartamento:</strong> {{ identificadorPopup.apartamento }}
            </p>
            <p>
              <strong>Recebedor:</strong> {{ identificadorPopup.recebedor }}
            </p>
            <p>
              <strong>Data de Recebimento:</strong>
              {{ identificadorPopup.dataRecebimento }}
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
  name: "EncomendasPage",
  data() {
    return {
      itens: [{}],
      popupAberto: false,
      identificadorPopup: "",
      tipoUsuario: user.tipoUsuario,
    };
  },
  mounted() {
    this.getEncomendas();
  },
  methods: {
    async listarEncomendas() {},
    mostrarPopup(id) {
      this.identificadorPopup = id;

      this.popupAberto = true;
    },
    confirmarRecebimento(item) {
      const confirmacao = confirm(
        `Você confirma o recebimento da encomenda ${item.texto}?`
      );
      item.entregue = true;
      item.dataRecebimento = new Date().toLocaleDateString();
    },
    async getEncomendas() {
      await api
        .get(`/encomendas`, { params: { apartamento: user.chaveAcesso } })
        .then((res) => {
          this.itens = res.data;
          this.listarEncomendas();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style></style>
