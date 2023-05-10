<template>
  <div class="tabela bg-white">
    <form class="encomendas-form">
      <h5 class="titulo">RASTREAMENTO</h5>
      <div class="encomendas-list">
        <q-list dense bordered class="rounded-borders">
          <q-item v-for="item in itens" :key="item.id" clickable>
            <q-item-section>
              {{ item.texto }}
              <span v-if="item.entregue" class="status-entregue">Entregue</span>
              <span v-else class="status-pendente">Pendente</span>
            </q-item-section>
            <q-icon name="directions" size="30px" />
          </q-item>
        </q-list>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EncomendasPage",
  data() {
    return {
      itens: [
        { id: 1, texto: "IDENTIFICADOR 1" },
        { id: 2, texto: "IDENTIFICADOR 2" },
        { id: 3, texto: "IDENTIFICADOR 3" },
        { id: 4, texto: "IDENTIFICADOR 4" },
        { id: 5, texto: "IDENTIFICADOR 5", entregue: true },
        { id: 6, texto: "IDENTIFICADOR 6", entregue: true },
        { id: 7, texto: "IDENTIFICADOR 7", entregue: true },
        { id: 8, texto: "IDENTIFICADOR 8", entregue: true },
        { id: 9, texto: "IDENTIFICADOR 9", entregue: true },
        { id: 10, texto: "IDENTIFICADOR 10", entregue: true },
      ],
    };
  },
});
</script>

<style>
.titulo {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.encomendas-list {
  margin-top: 2rem;
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
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
