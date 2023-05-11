<template>
  <div class="tabela bg-white">
    <form class="encomendas-form">
      <h5 class="titulo">RASTREAMENTO</h5>
      <div class="encomendas-list">
        <q-list>
          <q-item
            v-for="item in itens"
            :key="item.id"
            clickable
            class="item-encomenda"
            @click="mostrarPopup(item)"
          >
            <q-item-section>
              {{ item.texto }}
              <span v-if="item.entregue" class="status-entregue">{{ item.identificador }}</span>
              <span v-else class="status-pendente">{{ item.identificador }}</span>
            </q-item-section>
            <q-item-section class="icon-section q-ml-md">
              <q-icon
                name="check"
                class="icon-confirmar"
                size="35px"
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
            <p><strong>Identificador:</strong> {{ identificadorPopup.identificador }}</p>
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
  mounted(){
    this.getEncomendas()
  },
  methods: {
    async listarEncomendas() {

    },
    mostrarPopup(id) {
      this.identificadorPopup = id;
      console.log(id);
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
        .get("/encomendas")
        .then((res) => {
          this.itens = res.data;
          this.listarEncomendas()
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
.titulo {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
}
.encomendas-list {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.q-item {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.q-item-section {
  color: #26a69a;
  flex: 2;
}
.status-pendente {
  background-color: teal;
  color: rgb(246, 242, 242);
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  margin-left: 8px;
}
.status-entregue {
  background-color: rgb(90, 102, 102);
  color: rgb(246, 242, 242);
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  margin-left: 8px;
}
.tabela {
  font-size: 1rem;
  margin-bottom: 1rem;
  display: center;
  align-items: center;
}
.item-encomenda {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.item-encomenda .q-item-section:first-child {
  flex: 1;
}

.item-encomenda .q-item-section:last-child {
  flex: none;
  margin-left: 8px;
}

.icon-section {
  display: flex;
  justify-content: center;
}

.icon-confirmar {
  cursor: pointer;
}
</style>
