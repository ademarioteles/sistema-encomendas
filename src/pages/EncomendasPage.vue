<template>
  <div class="">
    <form>
      <h5 class="titulo" style="text-align: center">
        RASTREAMENTO DE ENCOMENDAS
      </h5>
      <div class="encomendas-list">
        <q-list>
          <q-item
            v-for="item in itens"
            :key="item.id"
            clickable
            class="rastreamento"
            @click="mostrarPopup(item)"
          >
            <q-item-section>
              {{ item.texto }}
              <span v-if="item.entregue" class="status-entregue">{{
                item.identificador
              }}</span>
              <span v-else class="status-pendente">{{
                item.identificador
              }}</span>
            </q-item-section>
            <q-item-section class="icon-section q-ml-md">
              <div class="row">
                <q-btn
                  color="teal"
                  v-if="!item.entregue"
                  @click.stop="confirmarRecebimento(item)"
                >
                  <q-icon left size="3em" name="check" />
                  <div>Recebido</div>
                </q-btn>
                <q-btn color="blue" @click.stop="confirmarRecebimento(item)">
                  <q-icon left size="3em" name="edit" />
                  <div>Editar</div>
                </q-btn>
                <q-btn color="red" @click.stop="confirmarRecebimento(item)">
                  <q-icon left size="3em" name="remove" />
                  <div>Excluir</div>
                </q-btn>
              </div>
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

export default defineComponent({
  name: "EncomendasPage",
  data() {
    return {
      itens: [{}],
      popupAberto: false,
      identificadorPopup: "",
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
        .get(`/encomendas/`)
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
