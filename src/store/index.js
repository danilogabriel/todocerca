
/*-------------------------------------------------------------------------------
Este proyecto utiliza vuexfire para mantener sincronizado el state con Firebase
https://www.npmjs.com/package/vuexfire
---------------------------------------------------------------------------------*/

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import vuexfire from 'vuexfire'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import { LocalStorage, SessionStorage } from 'quasar'
import moment from 'moment'                  //-- tratamiento de fechas en pedidos

Vue.use(Vuex)

import db from '@/datasource.js'              //---  importo la conexion
var clientesRef  = db.ref('clientes-chico')   //---  defino de manera glogal el acceso a la base 
var productosRef = db.ref('productos-chico')  //     de clientes y productos.
var pedidosRef = db.ref('pedidos')

/* eslint-disable */
const store = new Vuex.Store({
    state: {

        clientesList: [],
        productosList: [],
        pedidosList: [],

        activateSearchClientes: false,
        activateSearchProductos: false,

        totalCurrentOrder: 0,
        
        layout: {
            title: 'Todo Cerca',
            search: false,
            cancel: false,
            footer: false
        },

        user: null,    //-- Se pide por unica vez la primera vez que no este guardado en el localStor
        deviceID: ''   //-- cuando se guarden los pedidos se agregara el ID de Dispositivo y User
    },
    actions: {
        login(context) {
            context.commit('login')
        },
        setDatabaseRef: firebaseAction(({ bindFirebaseRef }) => {
            bindFirebaseRef('clientesList', clientesRef, { wait: true })
            bindFirebaseRef('productosList', productosRef, { wait: true })
            bindFirebaseRef('pedidosList', pedidosRef, { wait: true })
        }),        
        
        insertPedido(context, pedido){
            context.commit('insertPedido', pedido)
        }
    },

    mutations: {      
        ...firebaseMutations,

        setUserAndDeviceID(state, userAndDevice) {
            state.user = userAndDevice.user
            state.deviceID = userAndDevice.deviceID
        },
        
        getLocalStorageDeviceID(state){
            state.deviceID=LocalStorage.get.item('DeviceID')
            console.log("DeviceID: " + state.deviceID)            
        },

        updateTotalPedido(state, total){
            state.totalCurrentOrder = total
        },
        insertPedido(state, pedido){
            //-- El ID de cada pedido esta formado por el momento en que se graba
            //   en el formato YYMMDDHHmmssMMM (con milisegundos).
            //   Una vez capturado el timestamp ademas se fomatea y se asigna al atributo FECHA del pedido
            var now = Number(moment().format('YYMMDDHHmmssSSS'));
            pedido.fecha    = moment(now.toString(), "YYMMDDHHmmssSSS").format("DD/MM/YY HH:mm")
            pedido.usuario  = state.user
            pedido.deviceID = state.deviceID
            pedidosRef.child(now).set(pedido);
        },
        updateLayoutConf(state, payload) {
            state.layout.title = payload.title || "Todo cerca"
            state.layout.search = payload.search || false
            state.layout.cancel = payload.cancel || false
            state.layout.footer = payload.footer || false
        },
        toggleSearchBar(state){
            //----- state.route.path: propiedad que crea y mantiene la libreria 'vuex-router-sync' (main)
            console.log(state.route.path)
            if (state.route.path =='/clientes')  state.activateSearchClientes = !state.activateSearchClientes
            if (state.route.path =='/productos') state.activateSearchProductos = !state.activateSearchProductos
        }
    },

    getters: {
        clientesList: state => state.clientesList,
        productosList: state => state.productosList,
        pedidosList: state => state.pedidosList
    },
})

export default store