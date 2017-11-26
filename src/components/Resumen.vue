<template>
  <div>
    <div class="row">
      <q-card class="col">
        <q-card-title>Resumen de pedidos</q-card-title>
        <q-card-main>
          <div id="chart"></div>
        </q-card-main>
      </q-card>
      <q-card class="col">
        <q-card-title>Accesos directos</q-card-title>
        <q-card-main class="group">
          <q-btn outline icon="add" class="full-width" color="primary" @click="$router.push('/clientes')">
            Nuevo pedido
          </q-btn>

          <q-btn class="full-width" color="primary" @click="insertPedido(pedidoDePrueba)">
            Insert pedido 
          </q-btn>
        </q-card-main>
      </q-card>
    </div>
    <div class="row">
      <q-card class="col">
        <q-card-title>Últimos pedidos</q-card-title>
        <q-list separator no-border link>
          <q-item v-for="(pedido,key) in pedidosList" :key="key">
            <q-item-main>
              <q-item-tile label>  {{ ('00000'+ pedido.idCliente ).slice(-5) }} - {{ getNombreCliente(pedido.idCliente) }} </q-item-tile>
              <q-item-tile label>Fecha: {{ pedido.fecha }}  -  Estado: {{ pedido.estado }}</q-item-tile>
              <q-item-tile sublabel>Usuario: {{ pedido.usuario }}  -  DeviceID: {{ pedido.deviceID }}</q-item-tile>
            </q-item-main>
            <q-item-side right class="text-bold">$ {{ pedido.total }}</q-item-side>
          </q-item>
        </q-list>    
      </q-card>
    </div>
    <!-- <div class="layout-padding">
      <h6>Resumen</h6>
      <q-btn color="primary" @click="setDeviceId()">
          Set LocalStorage DeviceID
      </q-btn>
      <q-btn color="primary" @click="insertPedido()">
        Insert pedido 
      </q-btn>
    </div>
    <q-list separator no-border link>
        <q-item v-for="(pedido,key) in pedidosList" :key="key">
          <q-item-main>
            <q-item-tile label>{{ ('00000'+ pedido.idCliente ).slice(-5)  }} </q-item-tile>
            <q-item-tile sublabel>{{  pedido['.key']  }} - {{ pedido.fecha }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold">$ {{ pedido.total }}</q-item-side>
        </q-item>
    </q-list> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { QBtn } from 'quasar'
import { QCard, QCardMain, QCardTitle, QList, QItem, QIcon, QItemSide, QItemMain, QItemTile} from 'quasar'
import Chart from 'frappe-charts/dist/frappe-charts.min.esm'
import 'frappe-charts/dist/frappe-charts.min.css'

export default {
  name: 'resumen',
  components:{ QCard, QCardMain, QCardTitle, QBtn, QList, QItem, QIcon, QItemSide, QItemMain, QItemTile },
  mounted() {
    let chart = new Chart({
      parent: "#chart", // or a DOM element
      // title: "Historial de pedidos",
      data: this.chartData,
      type: 'pie', // or 'bar, 'line', 'scatter', 'pie', 'percentage'
      height: 150,
      colors: ['violet'],
      format_tooltip_x: d => (d + '').toUpperCase(),
      format_tooltip_y: d => d + ' pts'
    })
  },  
  data: () => ({
    chartData: {
      labels: ["9am-12pm", "1pm-4pm", "5pm-8pm"],
      datasets: [ { values: [25, 40, 30] } ]
    }
  }),
  activated() {
    let config = {
      title: "Todo cerca",
      search: false,
      cancel: false
    }
    this.updateLayoutConf(config)
  },
  computed: {
    ...mapState(['clientesList','pedidosList']),
    filteredPedidos() {
    },
  },  
  methods:{
    ...mapMutations(['updateLayoutConf', 'setLocalStorage', 'insertPedido']),

    getNombreCliente(idCli) {
      var objCliente = this.clientesList.find(objCli => objCli.id === parseInt(idCli))
      return objCliente.nombre
    }
  }
}
</script>

<style lang="stylus">

</style>
