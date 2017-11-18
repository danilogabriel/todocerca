<template>
  
    <q-layout ref="layout" view="lHh Lpr fFf"> 
  
      <q-toolbar slot="header">
        
        <q-btn flat @click="$refs.layout.toggleLeft()">
            <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          {{ layout.title }}
          <!-- <span slot="subtitle">Gestion de Pedidos</span> -->
        </q-toolbar-title>

        <q-btn flat @click="toggleSearchBar()" v-show="layout.search">
          <q-icon name="search" />
        </q-btn>
        <q-btn flat @click="cancelar()" v-show="layout.cancel">
          <q-icon name="delete" />
        </q-btn>
 
      </q-toolbar>
  
    <div slot="left">
      <q-list no-border inset-separator>
        <q-item>
          <q-item-side icon="person" inverted color="primary"/>
          <q-item-main>
            <q-item-tile label>Nombre del vendedor</q-item-tile>
            <q-item-tile sublabel>Cerrar sesión</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item-separator color="primary"></q-item-separator>
        <q-list-header>Menú</q-list-header>
        <q-side-link item to="/resumen">
          <q-item-side icon="home" />
          <q-item-main label="Resumen"/>
        </q-side-link>
        <q-side-link item to="/clientes">
          <q-item-side icon="person" />
          <q-item-main label="Clientes" />
        </q-side-link>
        <q-side-link item to="/pedidos">
          <q-item-side icon="local_grocery_store" />
          <q-item-main label="Pedidos" />
        </q-side-link>
        <q-side-link item to="/productos">
          <q-item-side icon="free_breakfast" />
          <q-item-main label="Productos" />
        </q-side-link>
      </q-list>
    </div>
  
   
      <keep-alive>
        <router-view />
      </keep-alive>
   
      <q-toolbar slot="footer" v-if="layout.footer" color="amber-9" class="text-dark">
          <!-- <div class="col">{{footerText.left}}</div> -->
          <!-- <div class="col text-right">Total</div> -->
          <q-btn flat color="none" class="full-width">Finalizar pedido ($0,00)</q-btn>
      </q-toolbar> 
  
    </q-layout>
         
  </template>
  
  <script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'
  import {
    QSearch,
    QLayout,QFixedPosition, QToolbar,QToolbarTitle,QBtn,QIcon,QItemSide,QItemMain,QSideLink,QListHeader,QList,
    QItem,QItemSeparator,QItemTile
  } from 'quasar'
 
//  import db from '@/datasource.js'             //---  importo la conexion
//  var clientesRef  = db.ref('clientes-chico')   //---  defino de manera glogal el acceso a la base 
//  var productosRef = db.ref('productos-chico')  //     de clientes y productos.

  export default {
    components: { 
      QSearch,
      QLayout,QFixedPosition, QToolbar,QToolbarTitle,QBtn,QIcon,QItemSide,QItemMain,QSideLink,QListHeader,QList,
      QItem,QItemSeparator,QItemTile},
    name:'app',
    data () {
      return {
  
      }
    },
    created() {
      //-- Ni bien se crea la app ejecuto el action que bindea todas las collection de la base de datos
      this.$store.dispatch('setDatabaseRef') 

      //--  Este es un MUTATION solo para probar como se guarda algo en el LocalStorage
      this.$store.commit('getLocalStorageDeviceID')
    },
    methods: {
      cancelar() {
        this.$router.go(-1)
      },
      toggleSearchBar () {

        /*     IMPORTANTE !!!!!   (comente esta linea para dejar referencia de como estaba antes)
             
             El problema aqui es que se esta llamando a un ACTION (dispatch) en lugar de un 
             MUTATION (commit).  Recordemos que ACTION es solo cuando hay involucrada alguna
             operacion asincrona (llamado a API por ej.).
             En este caso debe ser MUTATION porque solo se esta cambiando un valor del STATE.
        */
        //this.$store.dispatch('toggleFilterList')
        
        
        //this.$store.commit('toggleFilterList')
        this.$store.commit('toggleSearchBar')
      }
    },
    computed: {
      ...mapState(['layout']),
    }
  }
  </script>
  
  <style lang="stylus">

  #user-panel {
    min-height: 80px;
    padding: 3px;
    border-bottom: #027be3 solid 2px;
  }
  
  </style>
  