<template>
  
    <q-layout ref="layout" view="lHh Lpr fFf" > 
  
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
            <q-item-tile label>{{ user }}</q-item-tile>
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
<<<<<<< HEAD
          <!-- <div class="col text-right">Total</div> -->"
          <q-btn flat color="none" @click="completarDatosPedido()" class="full-width">
               Finalizar pedido ( {{ this.$store.state.pedidos.pedidoNew.subtotal | currency }} )
=======
          <!-- <div class="col text-right">Total</div> -->
          <q-btn flat :disabled="this.$store.state.totalCurrentOrder == 0" color="none" @click="" class="full-width">
               Finalizar pedido <strong>({{ this.$store.state.totalCurrentOrder | currency }})</strong>
>>>>>>> 314c749a217e126af8b6840890536dd2fe6bcbc3
          </q-btn>
      </q-toolbar> 
  
    </q-layout>
         
  </template>
  
  <script>
  import firebase from 'firebase'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { LocalStorage } from 'quasar'
  import {
    Dialog, Toast, QSearch,
    QLayout, QFixedPosition, QToolbar, QToolbarTitle, QBtn, QIcon, QItemSide, QItemMain, QSideLink, QListHeader, QList,
    QItem, QItemSeparator, QItemTile
  } from 'quasar'
 
//  import db from '@/datasource.js'             //---  importo la conexion
//  var clientesRef  = db.ref('clientes-chico')   //---  defino de manera glogal el acceso a la base 
//  var productosRef = db.ref('productos-chico')  //     de clientes y productos.

  export default {
    components: { 
      Toast, QSearch,
      QLayout, QFixedPosition, QToolbar, QToolbarTitle, QBtn, QIcon, QItemSide, QItemMain, QSideLink, QListHeader, QList,
      QItem, QItemSeparator, QItemTile
    },
    name:'app',
    data: () => ({
      usuarioSolicitado: ''       
    }),
    mounted() {
      if (LocalStorage.has('todoCerca.DeviceID')) {
        let userAndDevice = { 
          user: '', 
          deviceID: '' 
        } 
        userAndDevice.user = LocalStorage.get.item('todoCerca.User') 
        userAndDevice.deviceID = LocalStorage.get.item('todoCerca.DeviceID')
        this.$store.commit('setUserAndDeviceID', userAndDevice)        
      } else {
         this.pedirUsuario()
      }
    },
    created() {
      //-- Ni bien se crea la app ejecuto el action que bindea todas las collection de la base de datos
      this.$store.dispatch('setDatabaseRef') 
    },
    methods: {

      ...mapActions(['insertPedido']),     
      ...mapMutations(['SET_DESCUENTO_GLOBAL', 'SET_NOTA']),

      completarDatosPedido(){
          Dialog.create({
            noBackdropDismiss: true,
            noEscDismiss: true,
            title: 'Finalizar Pedido',
            //message: 'Puede ingresar un comentario y el % de Descuento del pedido',
            form: {
              descuento: {
                type: 'text',
                label: '% Descuento',
                model: ''
              },
              nota: {
                type: 'text',
                label: 'Nota',
                model: ''
              }
            },
            buttons: [  { 
                          label: 'Confirmar',
                          raised: true,
                          color: 'primary',
                          preventClose: true,
                          handler: (data, close) => {
                              if (parseFloat(data.descuento) > 100) {
                                  Toast.create.warning('Excede el maximo de descuento')
                                  return
                              }
                              close()
                              this.finalizarPedido(data.descuento, data.nota)
                          }
                        }
            ]
          })

      },
      pedirUsuario() {
        Dialog.create({
          noBackdropDismiss: true,
          noEscDismiss: true,
          title: 'Identificación',
          message: 'Ingrese por unica vez su nombre de usuario',
          form: {
            usuario: {
              type: 'text',
              label: 'Nombre de Usuario',
              model: ''
            }
          },
          buttons: [ 'Cancel',
                      { 
                        label: 'Confirmar',
                        raised: true,
                        color: 'primary',
                        preventClose: true,
                        handler: (data, close) => {
                            //  Using ES6 arrow functions 
                            //  now "this" points to the method's outer JS scope,
                            //  in this case your Vue component scope
                            //  With handler() {   }  SIN ARROW FUNCTION
                            // "this" refers to the scope of this method only,
                            //  not your Vue component
                            if (!data.usuario.length) {
                                Toast.create.warning('Debe ingresar un nombre')
                                return
                            }
                            close()
                            this.setUserAndDeviceID(data.usuario)
                        }
                      }
          ]
        })
      },
      finalizarPedido(descuento, nota){
          //------- Actualizar en el state DESCUENTO y NOTA --------
          if (parseFloat(descuento) > 0) { 
            this.SET_DESCUENTO_GLOBAL(parseInt(descuento))
          }
          if (nota.length>0)  {
            this.SET_NOTA(nota)
          }

          //-----------------Action de confirmar pedido -----------
          this.insertPedido()
          this.$router.go(-1)
      },
      setUserAndDeviceID(usuario) {
        var userAndDevice = { 
                              user: '', 
                              deviceID: '' 
        } 
        userAndDevice.deviceID = 'XXX-999'
        userAndDevice.user = usuario
        console.log('El usuario cargado es: ' + userAndDevice.user)          
        LocalStorage.set('todoCerca.User', userAndDevice.user)
        LocalStorage.set('todoCerca.DeviceID', userAndDevice.deviceID)
        this.$store.commit('setUserAndDeviceID', userAndDevice)
      },
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
      ...mapState(['user', 'layout']),
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
  