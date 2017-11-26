
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
import { date } from 'quasar'

import pedidos from './pedidos.js'  //-- modulo de state para la gestion de pedidos

Vue.use(Vuex)

import db from '@/datasource.js'              //---  importo la conexion
var clientesRef  = db.ref('clientes-chico')   //---  defino de manera glogal el acceso a la base 
var productosRef = db.ref('productos-chico')  //     de clientes y productos.
var pedidosRef = null   //-- mas abajo en las actions se utilizara esta ref a la base Firebase pero filtrada por DeviceID

/* eslint-disable */
const store = new Vuex.Store({
    state: {

        clientesList: [],
        productosList: [],
        pedidosList: [],

        activateSearchClientes: false,
        activateSearchProductos: false,
        
        clienteSeleccionado: {},
        
        layout: {
            title: 'Todo Cerca',
            search: false,
            cancel: false,
            footer: false
        },

        user: null,    //-- Se pide por unica vez la primera vez que no este guardado en el localStor
        deviceID: ''   //-- cuando se guarden los pedidos se agregara el ID de Dispositivo y User
    },

    getters: {
        pedidosByIdCliente(state, idCli){
            return state.pedidosList.filter(pedido => pedido.idCliente === idCli)
        }
    },
    actions: {
        login(context,state) {
            context.commit('login')
        },
        setClientesYProductosRef: firebaseAction(({ bindFirebaseRef }) => {
            bindFirebaseRef('clientesList', clientesRef, { wait: true })
            bindFirebaseRef('productosList', productosRef, { wait: true })
        }),             
        setPedidosRef: firebaseAction(({ state, bindFirebaseRef }) => {
            pedidosRef = db.ref('pedidos').orderByChild('deviceID').equalTo(state.deviceID)
            bindFirebaseRef('pedidosList', pedidosRef, { wait: true })
        }),             
    },

    mutations: {      
        ...firebaseMutations,
        
        setClienteSeleccionado(state, objCliente){    //-- se actualiza el Cliente en el state Global y en el pedido
            state.clienteSeleccionado = objCliente
        },
        setUserAndDeviceID(state, userAndDevice) {
            console.log("Se configura User y DeviceID (" + userAndDevice.user + "/"+ userAndDevice.deviceID + ")")
            state.user = userAndDevice.user
            state.deviceID = userAndDevice.deviceID
        },
        
        getLocalStorageDeviceID(state){
            state.deviceID=LocalStorage.get.item('DeviceID')
            console.log("DeviceID: " + state.deviceID)            
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
    
    modules: {
        pedidos
    },    
})

export default store