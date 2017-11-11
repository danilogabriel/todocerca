<template>
  <div class="layout-padding row justify-center">
      Nuevo Pedido de Cliente ID: {{ idCliente }}
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round icon="add" color="orange" class="animate-pop" @click="addProducto()"/>
      </q-fixed-position>

      <q-modal ref="modalAddProducto" position="bottom" :content-css="{padding: '20px'}">
        <h4>Agregar Producto</h4>
        <q-search v-model="productoFilter" placeholder="Buscar producto">
          <!-- <q-autocomplete @search="search" @selected="selected" /> -->
          <q-autocomplete />
        </q-search>

        <q-list no-border>
          <q-item>
            <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side>
            <q-item-main>
              <q-item-tile label>Descripcion</q-item-tile>
              <q-item-tile sublabel>ID - Stock: 123</q-item-tile>
            </q-item-main>
            <q-item-side right class="text-bold">$ 12.5</q-item-side>
          </q-item>
        </q-list>

        <div class="row items-center">
          <div class="col">Cantidad</div>
          <div class="col-auto">
            <q-input v-model="qty" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col">Promoción</div>
          <div class="col-auto">
            <q-input v-model="promo" />
          </div>
        </div>
        <div class="row items-center" v-show="this.promo > 0">
          <div class="col">Subtotal</div>
          <div class="col-auto">
            {{ subtotal }}
          </div>
        </div>
        <div class="row items-center" v-show="this.promo > 0">
          <div class="col">Descuento</div>
          <div class="col-auto">
            -{{ descuento }}
          </div>
        </div>
        <div class="row items-center">
          <div class="col">Total</div>
          <div class="col-auto">
            {{ total }}
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-btn color="secondary" @click="$refs.modalAddProducto.close()">Cancelar</q-btn>
          </div>
          <div class="col text-right">
            <q-btn color="primary" @click="$refs.modalAddProducto.close()">Agregar</q-btn>
          </div>
        </div>
      </q-modal>

  </div>
</template>

<script>
import {
  QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QItem, QItemSide, QItemMain, QItemTile, QInput
} from 'quasar'

export default {
  name: 'NuevoPedido',
  components: {
    QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QItem, QItemSide, QItemMain, QItemTile, QInput
  },
  activated() {
    let config = {
      title: "Nuevo pedido",
      search: false,
      cancel: true
    }
    this.$store.commit('updateLayoutConf', config)
  },
  data() {
    return {
      productoFilter: "",
      producto: {},
      qty: 1,
      promo: 0,
      precio: 12.5
    }
  },
  methods: {
    addProducto() {
      this.$refs.modalAddProducto.open()
    }
  },
  computed: {
    idCliente: function() {
      return this.$route.params.id
    },
    subtotal: function() {
      return this.precio * this.qty
    },
    descuento: function() {
      return this.precio * this.promo
    },
    total: function() {
      return this.subtotal - this.descuento
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
