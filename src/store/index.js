
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
import createPersistedState from 'vuex-persistedstate'  //-- https://github.com/robinvdvleuten/vuex-persistedstate

Vue.use(Vuex)

/* eslint-disable */
const store = new Vuex.Store({
    state: {

        clientesList: [],
        productosList: [],

        activateSearchClientes: false,
        activateSearchProductos: false,
        
        title: 'Todo Cerca',
        user: {},

        prueba: {
            domicilio: 'Av. San Martin 1444 - Buenos Aires',
            estudio: {
                nivel: 'terciario',
                institucion: 'Instituto de Formacion'
            }
        }
    },
    plugins: [createPersistedState({
        key: 'todocerca',    //-- The key to store the persisted state under. (default: vuex)
        path: [              //--  An array of any paths to partially persist the state. If no paths are given, the complete state is persisted
            'state.prueba.domicilio',
            'state.prueba.estudio.nivel'
        ]
    })],
    actions: {
        login(context) {
            context.commit('login')
        },
        
        setClientesRef: firebaseAction(({ bindFirebaseRef }, ref) => {
            bindFirebaseRef('clientesList', ref, { wait: true })
        }),        
        setProductosRef: firebaseAction(({ bindFirebaseRef }, ref) => {
            bindFirebaseRef('productosList', ref, { wait: true })
        })
    },

    mutations: {
        ...firebaseMutations,      

        toggleSearchBar(state){
            //----- state.route.path: propiedad que crea y mantiene la libreria 'vuex-router-sync' (main)
            console.log(state.route.path)
            if (state.route.path =='/clientes')  state.activateSearchClientes = !state.activateSearchClientes
            if (state.route.path =='/productos') state.activateSearchProductos = !state.activateSearchProductos
        }
    },

    getters: {
        clientesList: state => state.clientesList,
        productosList: state => state.productosList
    },
})

export default store