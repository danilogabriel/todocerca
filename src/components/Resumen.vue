<template>
  <div>
    Resumen
    <br><br>    
    <q-btn color="primary" @click="setDeviceId()">
        Set LocalStorage DeviceID
    </q-btn>
    <br><br>    
    <q-btn color="primary" @click="insertPedido()">
      Insert pedido 
    </q-btn>
    <br>
    <q-list inset-separator no-border link>
        <q-item v-for="(pedido,key) in pedidosList" :key="key">
          <q-item-main>
            <q-item-tile label>{{ ('00000'+ pedido.idCliente ).slice(-5)  }} </q-item-tile>
            <q-item-tile sublabel>{{  pedido['.key']  }} - {{ pedido.fecha }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold">$ {{ pedido.total }}</q-item-side>
        </q-item>
    </q-list>    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { QBtn } from 'quasar'
import { QList,QItem,QItemSide,QItemMain,QItemTile} from 'quasar'

export default {
  name: 'resumen',
  components:{ QBtn,QList,QItem,QItemSide,QItemMain,QItemTile },
  data(){
    return {

    }
  },
  created() {

  },  
  data(){
    return{
      pedidoDePrueba: {
        idCliente: 1,
        fecha: "",
        usuario: "xxxxx",
        subtotal: 100.5,
        descuento: 15,
        total: 90.45, 
        nota: "pedido 1",
        items: [
          { idProducto: "1-0001", precio: 12.5, cantidad: 5, cantBonificada:1, montoItem: 50.0, montoDesc: 12.5 },
          { idProducto: "1-0002", precio: 8.1, cantidad: 3, cantBonificada:1, montoItem: 16.2, montoDesc: 8.1 },
          { idProducto: "1-0003", precio: 9.3, cantidad: 3, cantBonificada:1, montoItem: 18.6, montoDesc: 9.3 },                    
          { idProducto: "1-0005", precio: 15.25, cantidad: 2, cantBonificada:1, montoItem: 15.25, montoDesc: 15.25 }          
        ]
      }
    }
  },
  activated() {
    let config = {
      title: "Todo cerca",
      search: false,
      cancel: false
    }
  },
  computed:
  {
    ...mapState(['pedidosList']),

    filteredPedidos() {
    },
  },  
  methods:{

    //-- Metodo creado para probar la persistencia de variables en el browser --
    setDeviceId(){
      var payload={
        key: 'DeviceID',
        value: 'SM-T95-9232476-00'
      }
      //--  al ACTION setLocalStorage se le pasa un objeto con la clave/valor que se quiere guardar
      this.$store.commit('setLocalStorage', payload)
    },

    insertPedido() {
      this.$store.dispatch('insertPedido', this.pedidoDePrueba) 
    },

    activated() {
      let config = {
        title: "Todo cerca",
        search: false
      }
      this.$store.commit('updateLayoutConf', config)
    }
  }
}
</script>

<style lang="stylus">

</style>
