/*------------------------------------------------------------------------------------------------------

         MODULO DE ESTADO PARA GESTION DE PEDIDOS

    Estados posibles de un pedido: 
    
    1-pendiente (tiene al menos un producto, esta en la base de datos, pero no se confirmo)
    2-guardado (se cerró el pedido y se guardo correctamente finalizado en la base de datos)
    3-sincronizado  (el sistema de facturación ya lo bajó para su procesamiento)
-------------------------------------------------------------------------------------------------------*/

const state = {
   
    pedidoNew: {
        idCliente: 0,
        fecha: "",
        usuario: "",
        deviceID: "",
        subtotal: 0,
        descuento: 0,
        total: 0, 
        nota: "",
        estado: 1,
        items: [ ]
    }, 
    
    itemNew: { 
      idProducto: "", 
      precio: 0, 
      cantidad: 0, 
      cantBonificada:0, 
      montoItem: 0, 
      montoDesc: 0 
    },
}
  

const getters = {
  
}
  
const actions = {

    addItem(context, item){
        context.commit('ADD_ITEM', item)
        context.commit('UPDATE_SUBTOTAL_PEDIDO')   //-- es subtotal, ya que solo es la suma de los items
                                                   //   para que sea total hay que applicarle el descuento
                                                   //   global del pedido 
    },

    insertPedido({ state, commit, rootState }) {
        commit('INSERT_PEDIDO',rootState )
        commit('RESET_PEDIDO')
    } 
}  

const mutations = {
    RESET_PEDIDO(state){
        state.pedidoNew.idCliente = 0,
        state.pedidoNew.fecha     = "",
        state.pedidoNew.usuario   = "",
        state.pedidoNew.deviceID  = "",
        state.pedidoNew.subtotal  = 0,
        state.pedidoNew.descuento = 0,
        state.pedidoNew.total     = 0, 
        state.pedidoNew.nota      = "",
        state.pedidoNew.estado    = 1,        
        state.pedidoNew.items     = [ ]
    },

    SET_CLIENTE(state, idCliente) {
        state.pedidoNew.idCliente = idCliente
    },

    SET_DESCUENTO_GLOBAL(state, descuentoGlobalPedido){
        state.pedidoNew.descuento = parseFloat(descuentoGlobalPedido)
        if (descuentoGlobalPedido>0) {
            state.pedidoNew.total = state.pedidoNew.subtotal * ( (100-descuentoGlobalPedido)/100)
        }    
    },

    SET_NOTA(state, nota) {
        state.pedidoNew.nota = nota 
    }, 

    UPDATE_SUBTOTAL_PEDIDO(state){
        var suma = state.pedidoNew.items.reduce(function(sum,item) {
                        return sum + ((item.precio * item.cantidad)-(item.precio * item.cantBonificada))
                   }, 0)
        state.pedidoNew.subtotal =  suma
    },

    ADD_ITEM(state, item){
        state.pedidoNew.items.push(item)
    },
    
    //------------- Actualiza informacion sobre un pedido ya creado previamente ----------
    UPDATE_PEDIDO(state){

    },

    //------------- Crea un pedido por primera vez en la base de datos -------------------
    INSERT_PEDIDO(state, rootState){
        //-- El ID de cada pedido esta formado por el momento en que se graba
        //   en el formato YYMMDDHHmmssMMM (con milisegundos).
        //   Una vez capturado el timestamp ademas se fomatea y se asigna al atributo FECHA del pedido
        let timeStamp = Date.now()
        let timeStampFormato = date.formatDate(timeStamp, 'DD/MM/YY HH:mm:ss')
        let pedidoID = parseInt(date.formatDate(timeStamp, 'YYMMDDHHmmssSSS') )

        state.pedidoNew.idCliente = rootState.idClienteSeleccionado
        state.pedidoNew.fecha     = timeStampFormato
        state.pedidoNew.usuario   = rootState.user
        state.pedidoNew.deviceID  = rootState.deviceID
        db.ref('pedidos').child(pedidoID).set( state.pedidoNew )
        
        //state.pedidoNew.usuario  = "demooooo"
        //state.pedidoNew.deviceID = "device Demooo"


        //rootState.pedidosList.push(state.pedidoNew)

        //pedidosRef.child(now).set(pedido)
        
        //pedidosRef.child(pedidoID).set( state.pedidoNew )
    },
}
import db from '@/datasource.js'
import { date } from 'quasar'  
export default {
    //namespaced: true,
    state,
    getters,
    actions,
    mutations
}