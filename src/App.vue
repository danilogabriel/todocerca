<template>
  
    <q-layout ref="layout" view="hHr LpR lFf"> 
  
      <q-toolbar slot="header">
        
        <q-btn flat @click="$refs.layout.toggleLeft()">
            <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Todo Cerca
          <span slot="subtitle">Gestion de Pedidos</span>
        </q-toolbar-title>
  
      </q-toolbar>
      <!--
    <q-toolbar slot="header" color="primary">
      <q-search inverted 
         v-model="searchText" 
         :debounce="600"
         color="none" 
         icon="search"
         @change="search"
      />
    </q-toolbar>
  -->
  
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Seleccione ...</q-list-header>
        <q-side-link item to="/pedidos">
          <q-item-side icon="local_grocery_store" />
          <q-item-main label="Pedidos" sublabel="Todos los Pedidos" />
        </q-side-link>
        <q-side-link item to="/clientes">
          <q-item-side icon="person" />
          <q-item-main label="Clientes" sublabel="Gestionar clientes" />
        </q-side-link>
        <q-side-link item to="/productos">
          <q-item-side icon="free_breakfast" />
          <q-item-main label="Productos" sublabel="Base de Productos" />
        </q-side-link>
        <q-side-link item to="/resumen">
          <q-item-side icon="home" />
          <q-item-main label="Resumen" sublabel="Ultimas actividades" />
        </q-side-link>
      </q-list>
    </div>
  
   
      
      <router-view />
   
      <q-toolbar slot="footer">
        <q-toolbar-title>
          
        </q-toolbar-title>
      </q-toolbar> 
  
    </q-layout>
         
  </template>
  
  <script>
  import firebase from 'firebase'
  import {
    QSearch,
    QLayout,QFixedPosition, QToolbar,QToolbarTitle,QBtn,QIcon,QItemSide,QItemMain,QSideLink,QListHeader,QList
  } from 'quasar'
 

  import db from '@/datasource.js'            //---  importo la conexion
  var usuariosRef = db.ref('usuarios')        //---  defino de manera glogal el acceso a la base 
                                              //     de usuarios.



  export default {
    components: { 
      QSearch,
      QLayout,QFixedPosition, QToolbar,QToolbarTitle,QBtn,QIcon,QItemSide,QItemMain,QSideLink,QListHeader,QList},
    name:'app',
    data () {
      return {
  
      }
    },
    created() {
      //-- Ni bien se crea la app ejecuto el action pasandole la referencia de acceso 
      //   a la base de datos que trae Usuarios ("usuariosRef")
      this.$store.dispatch('setUsuariosRef', usuariosRef) 
    }
  }
  </script>
  
  <style lang="stylus">
  
  </style>
  