<template>
  <div>
      <q-card flat>
        <q-card-title>Cliente {{ clienteSeleccionado.id }} - {{ clienteSeleccionado.nombre }}</q-card-title>
        <q-card-separator />
      </q-card>
      <q-list-header>Fecha Pedido: {{ pedidoSeleccionado.fecha }} </q-list-header>
      <q-list separator no-border link>
        <q-item v-for="(item,key) in pedidoSeleccionado.items" :key="key">
          <q-item-main>
            <q-item-tile label>{{ item.idProducto }}-{{ descripcionProducto(item.idProducto)  }} ) </q-item-tile>
            <q-item-tile sublabel>Cant: {{ item.cantidad}} -  Promo: {{ item.cantBonificada }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold"> {{ item.montoItem | currency }}</q-item-side>
        </q-item>
      </q-list>          
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { QBtn, QFixedPosition } from 'quasar'
import { QCard, QCardMain, QCardTitle, QCardSeparator, QListHeader, QList, QItem, QIcon, QItemSide, QItemMain, QItemTile} from 'quasar'

export default {
  name: 'ClienteDetail',
  components: {
    QBtn, QFixedPosition,
    QCard, QCardMain, QCardTitle, QCardSeparator, QListHeader, QList, QItem, QIcon, QItemSide, QItemMain, QItemTile
  },
  activated() {
    let config = {
      title: "Detalle del Pedido",
      search: false,
      cancel: false
    }
    this.$store.commit('updateLayoutConf', config)
    //----- Ni bien ingresa a esta pantalla se hace el set del obj clienteSeleccionado ------------------------
    console.log("Pedido Seleccionado: " + this.$route.params.idPedido)
    this.pedidoSeleccionado = this.pedidosList.find(objPedido => parseInt(objPedido['.key']) === parseInt(this.$route.params.idPedido))
  },

  data: () => ({
    pedidoSeleccionado: 0
  }),
  
  computed: {
    ...mapState([ 'pedidosList', 'clientesList', 'productosList', 'clienteSeleccionado'])

  },

  methods: {
    descripcionProducto(idProd){
       var producto = this.productosList.find(objProd => objProd.id === idProd)
       return producto.descripcion
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
