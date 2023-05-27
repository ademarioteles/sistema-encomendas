<template>
  <div class="">
    <h5 class="titulo" style="text-align: center">LISTA DE USUÁRIOS</h5>

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
            <q-tab name="sindico" label="SINDICOS" />
            <q-tab name="porteiro" label="PORTEIROS" />
            <q-tab name="inquilino" label="INQUILINOS" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="bg-white text-black">
            <q-tab-panel name="sindico">
              <div class="text-h6 row">
                <img src="../assets/business-man.jpg" style="width: 45px" />
                SINDICOS
              </div>
              <form>
                <div class="Usuarios-list">
                  <q-list color="amber">
                    <q-item
                      v-for="sindico in sindicosEncontrados"
                      :key="sindico.id"
                      clickable
                      class="rastreamento"
                    >
                      <q-item-section @click="mostrarPopupUsuario(sindico)">
                        <span @click="mostrarPopupUsuario(sindico)">
                          {{ sindico.nome }}
                        </span>
                      </q-item-section>

                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          :disable="tipoUsuario == 'porteiro'"
                          rounded=""
                          flat
                          color="primary"
                          icon="edit"
                          name="edit"
                          label="Editar"
                          @click.stop="mostrareditUsuario(sindico)"
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
                          @click="mostrarPopupRemover(sindico)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </form>
            </q-tab-panel>

            <q-tab-panel name="porteiro">
              <div class="text-h6 row">
                <img style="width: 45px" src="../assets/security.jpg" />
                PORTEIROS
              </div>
              <form>
                <div class="Usuarios-list">
                  <q-list color="amber">
                    <q-item
                      v-for="porteiro in porteirosEncontrados"
                      :key="porteiro.id"
                      clickable
                      class="rastreamento"
                    >
                      <q-item-section @click="mostrarPopupUsuario(porteiro)">
                        <span @click="mostrarPopupUsuario(porteiro)">
                          {{ porteiro.nome }}
                        </span>
                      </q-item-section>

                      <q-item-section
                        v-if="
                          tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'
                        "
                      >
                        <q-btn
                          :disable="tipoUsuario == 'porteiro'"
                          rounded=""
                          flat
                          color="primary"
                          icon="edit"
                          name="edit"
                          label="Editar"
                          @click.stop="mostrareditUsuario(porteiro)"
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
                          @click="mostrarPopupRemover(porteiro)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </form>
            </q-tab-panel>
            <q-tab-panel name="inquilino">
              <div class="text-h6 row">
                <img src="../assets/man.jpg" style="width: 40px" />
                INQUILINOS
              </div>
              <form>
                <div class="Usuarios-list">
                  <q-list color="amber">
                    <q-item
                      v-for="item in inquilinosEncontrados"
                      :key="item.id"
                      clickable
                      class="rastreamento"
                    >
                      <q-item-section @click="mostrarPopupUsuario(item)">
                        <span @click="mostrarPopupUsuario(item)">
                          {{ item.nome }}
                        </span>
                      </q-item-section>
                      <q-item-section>
                        <q-btn
                          v-if="
                            (item.tipoUsuario == 'inquilino' &&
                              tipoUsuario == 'porteiro') ||
                            item.tipoUsuario == 'porteiro' ||
                            (item.tipoUsuario == 'inquilino' &&
                              tipoUsuario == 'sindico')
                          "
                          rounded=""
                          flat
                          color="primary"
                          icon="edit"
                          name="edit"
                          label="Editar"
                          @click.stop="mostrareditUsuario(item)"
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
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="popupeditUsuariosAberto">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <p>
              <strong>Nome:</strong>
              <q-input color="teal" v-model="nomeSelecionado"></q-input>
            </p>
            <p>
              <strong>Apartamento(s):</strong>
            </p>
            <div class="row" v-if="apartamentoSelecionado.length > 0">
              <q-input
                color="teal"
                placeholder="adicione apartamentos"
                v-model="apartamento"
              >
              </q-input
              ><q-btn
                flat
                icon="add"
                stack-label
                counter
                maxlength="4"
                @click="adicionarApartamento()"
                :disable="apartamento.trim() === ''"
              ></q-btn>
            </div>
            <div v-else>
              <p>Não possui apartamentos.</p>
            </div>
            <div
              class="row"
              v-for="(item, index) in apartamentoSelecionado"
              :key="item.id"
            >
              <q-field color="teal">
                <p>
                  {{ item }}
                  <q-btn
                    type=""
                    icon="remove"
                    color="red"
                    flat
                    label="remover"
                    @click="removeApartamento(index)"
                  />
                </p>
              </q-field>
            </div>
            <p>
              <strong>CPF:</strong>
              <q-input color="teal" v-model="cpfSelecionado"> </q-input>
            </p>
            <p>
              <strong>Tipo:</strong>
              <br />
              <q-radio
                v-if="tipoUsuario == 'sindico'"
                keep-color
                v-model="tipoSelecionado"
                val="sindico"
                label="Sindico"
                color="teal"
              />
              <q-radio
                v-if="tipoUsuario == 'sindico'"
                keep-color
                v-model="tipoSelecionado"
                val="porteiro"
                label="Porteiro"
                color="teal"
              />
              <q-radio
                v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
                keep-color
                v-model="tipoSelecionado"
                val="inquilino"
                label="Inquilino"
                color="teal"
              />
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="red" v-close-popup />
          <q-btn
            label="Confirmar"
            color="teal"
            v-close-popup
            @click="editUsuario()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="popupUsuariosAberto">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div>
            <p>
              <strong>Nome:</strong>
              {{ nomeSelecionado }}
            </p>

            <p><strong>Apartamento(s):</strong></p>
            <div v-if="apartamentoSelecionado.length > 0">
              <p v-for="ap in apartamentoSelecionado" :key="ap.value">
                {{ ap }}
              </p>
            </div>
            <div v-else>
              <p>Não possui apartamentos.</p>
            </div>
            <p><strong>CPF:</strong> {{ cpfSelecionado }}</p>
            <p>
              <strong>Tipo de usuário:</strong>
              {{ tipoSelecionado }}
            </p>
          </div>
          <!-- EDIT Usuarios-->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- dados para o dialog coletado -->

    <!-- dados para o dialog remover -->
    <q-dialog
      v-if="tipoUsuario == 'sindico' || tipoUsuario == 'porteiro'"
      v-model="popupRemoverAberto"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Gostaria de apagar o {{ tipoSelecionado }} {{ nomeSelecionado }}?
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn color="red" label="Cancelar" v-close-popup />
          <q-btn color="teal" label="Confirmar" @click="apagarUsuario()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/api";
import { Notify, TouchSwipe, date } from "quasar";
const user = JSON.parse(sessionStorage.getItem("usuario"));

export default defineComponent({
  name: "UsuariosPage",
  data() {
    return {
      sindicosEncontrados: [{}],
      porteirosEncontrados: [{}],
      inquilinosEncontrados: [{}],
      popupUsuariosAberto: ref(false),
      popupeditUsuariosAberto: ref(false),
      identificadorPopup: ref(""),
      cpfSelecionado: ref(),
      apartamentoSelecionado: [],
      nomeSelecionado: ref(),
      tipoUsuario: user.tipoUsuario,
      tipoSelecionado: ref(""),
      dataEntregue: ref(""),
      tab: ref("porteiro"),
      apartamento: ref(""),
      popupColetaAberto: ref(false),
      popupRemoverAberto: ref(false),
    };
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {
    adicionarApartamento() {
      this.apartamentoSelecionado.push(this.apartamento);
      this.apartamento = "";
    },
    removeApartamento(index) {
      this.apartamentoSelecionado.splice(index, 1);
    },
    async editUsuario() {
      await api.get(`/usuarios?cpf=${this.cpfSelecionado}`, {}).then((res) => {
        console.log(this.cpfSelecionado);
        console.log(this.identificadorPopup.cpf);
        if (
          (res.data.length == 0 &&
            this.cpfSelecionado != this.identificadorPopup.cpf) ||
          (res.data.length > 0 &&
            this.cpfSelecionado == this.identificadorPopup.cpf)
        ) {
          api
            .patch(`/usuarios/${this.identificadorPopup.id}`, {
              nome: this.nomeSelecionado,
              cpf: this.cpfSelecionado,
              tipoUsuario: this.tipoSelecionado,
              apartamentos: this.apartamentoSelecionado,
            })
            .then(() => {
              Notify.create({
                type: "positive",
                message: "Edição Realizada!",
              });
              this.getUsuarios();
            })
            .catch((error) => {
              Notify.create({
                type: "negative",
                message: "Erro ao editar.",
              });
            });
        } else {
          Notify.create({
            type: "negative",
            message: "O usuario já existe na base.",
          });
        }
      });
    },

    carregarDadosPop() {
      this.tipoSelecionado = this.identificadorPopup.tipoUsuario;
      this.cpfSelecionado = this.identificadorPopup.cpf;
      this.apartamentoSelecionado = this.identificadorPopup.apartamentos;
      this.nomeSelecionado = this.identificadorPopup.nome;
      this.apartamento = "";
    },

    mostrarPopupRemover(item) {
      this.identificadorPopup = item;
      this.popupRemoverAberto = true;
      this.carregarDadosPop();
    },
    mostrarPopupUsuario(id) {
      this.identificadorPopup = id;
      this.carregarDadosPop();
      this.popupUsuariosAberto = true;
    },
    mostrareditUsuario(id) {
      this.identificadorPopup = id;
      this.carregarDadosPop();
      this.popupeditUsuariosAberto = true;
    },
    mostrarPopupColeta(item) {
      this.identificadorPopup = item;
      this.popupColetaAberto = true;
    },
    async apagarUsuario() {
      await api
        .delete(`/usuarios/${this.identificadorPopup.id}`, {})
        .then(() => {
          Notify.create({
            type: "positive",
            message: "Usuario Apagado!",
          });
          this.getUsuarios();
          this.popupRemoverAberto = false;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao apagar.",
          });
        });
    },

    async getUsuarios() {
      await api
        .get(`/usuarios`, {
          params: { tipoUsuario: "inquilino" },
        })
        .then((res) => {
          this.inquilinosEncontrados = res.data;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar.",
          });
        });

      await api
        .get(`/usuarios`, {
          params: { tipoUsuario: "sindico" },
        })
        .then((res) => {
          this.sindicosEncontrados = res.data;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar.",
          });
        });

      await api
        .get(`/usuarios`, {
          params: { tipoUsuario: "porteiro" },
        })
        .then((res) => {
          this.porteirosEncontrados = res.data;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Erro ao consultar.",
          });
        });
    },
  },
});
</script>

<style></style>
