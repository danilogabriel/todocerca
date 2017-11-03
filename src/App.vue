<template>
  
    <q-layout ref="layout" view="lHh Lpr fFf"> 
  
      <q-toolbar slot="header">
        
        <q-btn flat @click="$refs.layout.toggleLeft()">
            <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          {{ title }}
          <!-- <span slot="subtitle">Gestion de Pedidos</span> -->
        </q-toolbar-title>

        <q-btn flat @click="toggleFilterList()">
          <q-icon name="search" />
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
   
      <q-toolbar slot="footer">
        <q-toolbar-title>
          
        </q-toolbar-title>
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
 
  import db from '@/datasource.js'            //---  importo la conexion
  var usuariosRef = db.ref('usuarios')        //---  defino de manera glogal el acceso a la base 
                                              //     de usuarios.
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
      //-- Ni bien se crea la app ejecuto el action pasandole la referencia de acceso 
      //   a la base de datos que trae Usuarios ("usuariosRef")
      this.$store.dispatch('setUsuariosRef', usuariosRef) 
    },
    methods: {
      toggleFilterList () {
        this.$store.dispatch('toggleFilterList')
      }
    },
    computed: {
      ...mapState(['title']),
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
  