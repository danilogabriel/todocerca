<template>
  <div>
      <q-card flat>
        <q-card-title>Cliente {{ this.idCliente }}</q-card-title>
        <q-card-main>
          datos
        </q-card-main>
        <q-card-separator />
      </q-card>
      <q-list-header>Últimos pedidos</q-list-header>
      <q-list separator no-border link>
        <q-item v-for="(pedido,key) in pedidosList" :key="key">
          <q-item-main>
            <q-item-tile label>{{ ('00000'+ pedido.idCliente ).slice(-5)  }} </q-item-tile>
            <q-item-tile label>Subt: {{ pedido.subtotal | currency }} - Desc: {{ pedido.descuento | currency }} </q-item-tile>
            <q-item-tile sublabel>{{  pedido['.key']  }} - {{ pedido.fecha }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold"> {{ pedido.total | currency }}</q-item-side>
        </q-item>
      </q-list>

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round color="primary" icon="add_shopping_cart" class="animate-pop" @click="nuevoPedido()"/>
      </q-fixed-position>             
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
      title: "Detalle del cliente",
      search: false,
      cancel: false
    }
    this.$store.commit('setClienteSeleccionado', this.$route.params.idCliente)
    this.$store.commit('updateLayoutConf', config)
  },

  data: () => ({
    
  }),
  
  computed: {
    ...mapState([ 'pedidosList']),

    pedidosListFiltradosPorCliente( idCli ) {

       return this.pedidosList.filter( (pedido,idCli) => parseInt(pedido.idCliente) == parseInt(idCli) )
    },

    idCliente: function() {
      return this.$route.params.idCliente
    }
  },

  methods: {
    nuevoPedido() {
      this.$router.push({ path: `/nuevopedido/${this.idCliente}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
