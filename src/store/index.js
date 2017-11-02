
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

Vue.use(Vuex)

/* eslint-disable */
const store = new Vuex.Store({
    state: {

        usuariosBaseDatos: [],

        title: 'Tu look!',
        filterList: false,
        user: {}
    },
    actions: {
        login(context) {
            context.commit('login')
        },
        toggleFilterList(context) {
            context.commit('toggleFilterList')
        },
        
        setUsuariosRef: firebaseAction(({ bindFirebaseRef }, ref) => {
            bindFirebaseRef('usuariosBaseDatos', ref, { wait: true })
        }),        

    },

    mutations: {
        ...firebaseMutations,      

        toggleFilterList(state) {
            state.filterList = !state.filterList
        }
    },

    getters: {
        usuariosBaseDatos: state => state.usuariosBaseDatos,
    },
})

export default store