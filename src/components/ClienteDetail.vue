<template>
  <div>
      <q-card flat>
        <q-card-title>Cliente {{ clienteSeleccionado.id }} - {{ clienteSeleccionado.nombre }}</q-card-title>
        <q-card-main>
          Domicilio: {{ clienteSeleccionado.domicilio }}
          <div slot="right">
            Deuda: {{ clienteSeleccionado.deuda }}
          </div>
           Dias: {{ clienteSeleccionado.dias }}
        </q-card-main>
        <q-card-separator />
      </q-card>
      <q-list-header>Últimos pedidos</q-list-header>
      <q-list separator no-border link>
        <q-item :to="'/pedidodetail/' + pedido['.key']" v-for="(pedido,key) in pedidosFiltradosPorCliente" :key="key">
          <q-item-main>
            <q-item-tile label>Fecha: {{ pedido.fecha }} (Cliente: {{ ('00000'+ pedido.idCliente ).slice(-5)  }} ) </q-item-tile>
            <q-item-tile label>Subt: {{ pedido.subtotal | currency }} - Desc: {{ pedido.descuento | currency }} </q-item-tile>
            <q-item-tile sublabel>Estado: {{ pedido.estado }} - Usuario: {{ pedido.usuario }}</q-item-tile>
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
    this.$store.commit('updateLayoutConf', config)
    //----- Ni bien ingresa a esta pantalla se hace el set del obj clienteSeleccionado ------------------------
    this.clienteSeleccionado = this.clientesList.find(objCli => objCli.id === parseInt(this.$route.params.idCliente))
    //-----  Y se actualiza el State General con el Cliente seleccionado -----------------------------------------
    this.$store.commit('setClienteSeleccionado', this.clienteSeleccionado)
  },

  data: () => ({
    clienteSeleccionado: {}
  }),
  
  computed: {
    ...mapState([ 'pedidosList', 'clientesList']),

/*     clienteSeleccionado(){
        return this.clientesList.find(objCli => objCli.id === parseInt(this.clienteSeleccionado))
    }, */

    pedidosFiltradosPorCliente( ) {
        return this.pedidosList.filter(objPed => objPed.idCliente === this.clienteSeleccionado.id)
    }

/*     idCliente()  {
      return  parseInt(this.$route.params.idCliente)
    } */
  },

  methods: {
    nuevoPedido() {
      this.$router.push({ path: '/nuevopedido/' + this.clienteSeleccionado.id })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
