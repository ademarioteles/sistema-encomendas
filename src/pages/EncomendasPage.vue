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
            @click="mostrarPopupEncomenda(item)"
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
                color="teal"
                icon="check"
                label="Coletado"
                @click.stop="mostrarPopupColeta(item)"
              />
            </q-item-section>
            <q-item-section
              v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
            >
              <q-btn
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
                rounded=""
                flat
                color="red"
                icon="remove"
                name="remove"
                label="Remover"
                @click="mostrarPopupRemover(item)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </form>
    <q-dialog v-model="popupEncomendasAberto">
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
              {{ dataRecebimento }}
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Fechar"
            color="teal"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- dados para o dialog coletado -->
    <q-dialog
      v-if="tipoUsuario == 'sindico' || tipoUsuario == 'inquilino'"
      v-model="popupColetaAberto"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-form @submit="confirmarColeta()">
          <q-input
            filled
            color="teal"
            v-model="Coletor"
            label="Nome do Coletor"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor digite o nome de quem coletou a encomenda',
            ]"
          />
          <q-input
            filled
            type="date"
            color="teal"
            v-model="dataColeta"
            label="Data da Coleta"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Por favor selecione a data',
            ]"
          />
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Confirmar" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- dados para o dialog remover -->
    <q-dialog
      v-if="tipoUsuario == 'sindico' || tipoUsuario == 'inquilino'"
      v-model="popupRemoverAberto"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
              <div class="text-h6">Gostaria de apagar a encomenda {{ identificadorPopup.identificador }}?</div>
            </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Confirmar" @click="apagarEncomenda()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/api";
import { Notify } from "quasar";
const user = JSON.parse(sessionStorage.getItem("usuario"));

export default defineComponent({
  name: "EncomendasPage",
  data() {
    return {
      itens: [{}],
      popupEncomendasAberto: ref(false),
      identificadorPopup: ref(""),
      tipoUsuario: user.tipoUsuario,
      dataRecebimento: ref(""),
      dataColeta: ref(""),
      Coletor: ref(""),
      popupColetaAberto: ref(false),
      popupRemoverAberto: ref(false),
    };
  },
  mounted() {
    this.getEncomendas();
  },
  methods: {
    mostrarPopupRemover(item) {
      this.identificadorPopup = item;
      this.popupRemoverAberto = true;
    },
    mostrarPopupEncomenda(id) {
      this.identificadorPopup = id;
      this.formatData();
      this.popupEncomendasAberto = true;
    },
    mostrarPopupColeta(item) {
      this.identificadorPopup = item;
      this.popupColetaAberto = true;
    },
    async apagarEncomenda() {
      await api
        .delete(`/encomendas/${this.identificadorPopup.id}`, {})
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Encomenda Apagada!",
          });
          this.getEncomendas()
          this.popupRemoverAberto = false
        })
        .catch((error) => {
          alert(error);
        });
    },
    async confirmarColeta() {
      await api
        .patch(`/encomendas/${this.identificadorPopup.id}`, {
          coletado: true,
          dataColeta: this.dataColeta,
        })
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Coleta Confirmada!",
          });
          this.getEncomendas();
          this.popupColetaAberto = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
    async getEncomendas() {
      await api
        .get(`/encomendas`, {
          params: { apartamento: user.chaveAcesso, coletado: false },
        })
        .then((res) => {
          this.itens = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async formatData() {
      this.dataRecebimento = this.identificadorPopup.dataRecebimento;
      this.dataRecebimento = this.dataRecebimento.split("-");
      this.dataRecebimento =
        this.dataRecebimento[2] +
        "/" +
        this.dataRecebimento[1] +
        "/" +
        this.dataRecebimento[0];
    },
  },
});
</script>

<style></style>
