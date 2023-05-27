<template>
  <div class="">
    <h5 class="titulo" style="text-align: center">
      RASTREAMENTO DE ENCOMENDAS
    </h5>

    <div class="q-px-md">
      <div class="" style="">
        <q-card style="min-width: 350px">
          <q-tabs
            v-model="tab"
            dense
            class="bg-black text-white"
            active-color="teal"
            indicator-color="teal"
            align="justify"
          >
            <q-tab name="nrecebido" label="NÃO ENTREGUE" />
            <q-tab name="recebidos" label="ENTREGUE" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="bg-white text-black">
            <q-tab-panel name="nrecebido">
              <div class="text-h6 row">
                <img src="../assets/box.png" style="width: 35px" />
                ENCOMENDAS NÃO ENTREGUE
              </div>
              <form>
                <div class="encomendas-list">
                  <q-list color="amber">
                    <q-item
                      v-for="item in itens"
                      :key="item.id"
                      clickable
                      class="rastreamento"
                    >
                      <q-item-section @click="mostrarPopupEncomenda(item)">
                        <!--{{ item.texto }}-->

                        <span @click="mostrarPopupEncomenda(item)">
                          {{ item.identificador }}</span
                        >
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          rounded=""
                          flat
                          color="teal"
                          icon="check"
                          label="Entregue"
                          @click.stop="mostrarPopupColeta(item)"
                        />
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          rounded=""
                          flat
                          color="primary"
                          icon="edit"
                          name="edit"
                          label="Editar"
                          @click.stop="mostrarEditEncomenda(item)"
                        />
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
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
            </q-tab-panel>

            <q-tab-panel name="recebidos">
              <div class="text-h6 row">
                <img src="../assets/box.png" style="width: 35px" />
                ENCOMENDA ENTREGUE
              </div>
              <form>
                <div class="encomendas-list">
                  <q-list color="amber">
                    <q-item
                      v-for="entregue in itensEntregue"
                      :key="entregue.id"
                      clickable
                      class="rastreamento"
                    >
                      <q-item-section @click="mostrarPopupEncomenda(entregue)">
                        <!--{{ item.texto }}-->

                        <span @click="mostrarPopupEncomenda(entregue)">
                          {{ entregue.identificador }}</span
                        >
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          rounded=""
                          flat
                          color="primary"
                          icon="edit"
                          name="edit"
                          label="Editar"
                          @click.stop="mostrarEditEncomenda(entregue)"
                        />
                      </q-item-section>
                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          rounded=""
                          flat
                          color="red"
                          icon="remove"
                          name="remove"
                          label="Remover"
                          @click="mostrarPopupRemover(entregue)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="popupEditEncomendasAberto">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <p>
              <strong>Identificador:</strong>
              <q-input
                color="teal"
                v-model="identificadorSelecionado"
              ></q-input>
            </p>
            <p>
              <strong>Apartamento:</strong>
              <q-select
                label=" Apartamento"
                color="teal"
                v-model="apartamentoSelecionado"
                :options="listaApartamentos"
                estilo=" largura : 250px "
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor selecione um apartamento',
                ]"
              />
            </p>
            <p>
              <strong>Recebedor:</strong>
              <q-input color="teal" v-model="receborSelecionado"> </q-input>
            </p>
            <p>
              <strong>Data de Recebimento:</strong>
              <q-input
                color="teal"
                mask="##/##/####"
                v-model="dataRecebimento"
              ></q-input>
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="red" v-close-popup />
          <q-btn
            label="Confirmar"
            v-close-popup
            color="teal"
            @click="editEncomenda()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="popupEncomendasAberto">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div>
            <p>
              <strong>Identificador:</strong>
              {{ identificadorSelecionado }}
            </p>
            <p><strong>Apartamento:</strong> {{ apartamentoSelecionado }}</p>
            <p><strong>Recebedor:</strong> {{ receborSelecionado }}</p>
            <p>
              <strong>Data de Recebimento:</strong>
              {{ dataRecebimento }}
            </p>
          </div>
          <!-- EDIT ENCOMENDAS-->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- dados para o dialog coletado -->
    <q-dialog
      v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
      v-model="popupColetaAberto"
      persistent
    >
      <q-card style="min-width: 350px">
        <div class="q-pa-md q-gutter-sm">
          <q-form @submit="confirmarEntrega()">
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
              v-model="dataEntrega"
              mask="##/##/####"
              label="Data da Coleta"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Por favor selecione a data',
              ]"
            />
            <q-card-actions align="right" class="text-primary">
              <q-btn label="Cancelar" color="red" v-close-popup />
              <q-btn label="Confirmar" color="teal" type="submit" />
            </q-card-actions>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <!-- dados para o dialog remover -->
    <q-dialog
      v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
      v-model="popupRemoverAberto"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Gostaria de apagar a encomenda
            {{ identificadorPopup.identificador }}?
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn color="red" label="Cancelar" v-close-popup />
          <q-btn
            color="teal"
            label="Confirmar"
            v-close-popup
            @click="apagarEncomenda()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/api";
import { Notify, date } from "quasar";
const user = JSON.parse(sessionStorage.getItem("usuario"));

export default defineComponent({
  name: "EncomendasPage",
  data() {
    return {
      itens: [{}],
      itensEntregue: [{}],
      popupEncomendasAberto: ref(false),
      popupEditEncomendasAberto: ref(false),
      identificadorPopup: ref(""),
      receborSelecionado: ref(),
      apartamentoSelecionado: ref(),
      identificadorSelecionado: ref(),
      tipoUsuario: user.tipoUsuario,
      dataRecebimento: ref(""),
      dataEntregue: ref(""),
      tab: ref("recebidos"),
      Coletor: ref(""),
      popupColetaAberto: ref(false),
      popupRemoverAberto: ref(false),
      listaApartamentos: [],
    };
  },
  mounted() {
    this.getEncomendas();
  },
  methods: {
    async editEncomenda() {
      await api
        .patch(`/encomendas/${this.identificadorPopup.id}`, {
          identificador: this.identificadorSelecionado,
          dataRecebimento: this.dataRecebimento,
          recebedor: this.receborSelecionado,
          apartamento: this.apartamentoSelecionado,
        })
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Edição Realizada!",
          });
          this.getEncomendas();
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao editar.",
          });
        });
    },
    carregarDadosPop() {
      this.dataRecebimento = this.identificadorPopup.dataRecebimento;
      this.receborSelecionado = this.identificadorPopup.recebedor;
      this.apartamentoSelecionado = this.identificadorPopup.apartamento;
      this.identificadorSelecionado = this.identificadorPopup.identificador;
    },

    mostrarPopupRemover(item) {
      this.identificadorPopup = item;
      this.popupRemoverAberto = true;
    },
    mostrarPopupEncomenda(id) {
      this.identificadorPopup = id;
      this.carregarDadosPop();
      this.popupEncomendasAberto = true;
    },
    mostrarEditEncomenda(id) {
      this.identificadorPopup = id;
      this.carregarDadosPop();
      this.getApartamentos();
      this.popupEditEncomendasAberto = true;
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
          this.getEncomendas();
          this.popupRemoverAberto = false;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao apagar.",
          });
        });
    },
    async confirmarEntrega() {
      await api
        .patch(`/encomendas/${this.identificadorPopup.id}`, {
          entregue: true,
          dataEntrega: date.formatDate(this.dataEntrega, "DD/MM/YYYY"),
        })
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Entrega Confirmada!",
          });
          this.getEncomendas();
          this.tab = "recebidos";
          this.popupColetaAberto = false;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao confirmar encomenda.",
          });
        });
    },
    async getEncomendas() {
      await api
        .get(`/encomendas`, {
          params: { entregue: false },
        })
        .then((res) => {
          this.itens = res.data;
        })
        .catch((error) => {
          Notify.create({
            type: "positive",
            message: "Erro ao consultar encomenda.",
          });
        });

      await api
        .get(`/encomendas`, {
          params: { entregue: true },
        })
        .then((res) => {
          this.itensEntregue = res.data;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar encomenda.",
          });
        });
    },
    async getApartamentos() {
      await api
        .get("/usuarios")
        .then((res) => {
          const apartamentosEncontrados = res.data
            .flatMap(
              (apartamentosEncontrados) => apartamentosEncontrados.apartamentos
            )
            .filter((apartamentosEncontrados) => apartamentosEncontrados != "")
            .flat();
          this.listaApartamentos = apartamentosEncontrados;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar na base.",
          });
        });
    },
  },
});
</script>

<style></style>
