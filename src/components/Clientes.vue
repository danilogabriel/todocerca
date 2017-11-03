<template>

   <div> 

  <!-------------- Search -------------->
  <q-slide-transition>
    <q-toolbar color="primary" style="min-height: auto; position: sticky; top: 50px; z-index: 200">
      <q-search flat inverted 
        v-model="searchText" 
        :debounce="600"
        color="primary" 
        icon="search"
        @change="search"
        style="box-shadow: none"
        placeholder="Buscar"
      />
    </q-toolbar>
  </q-slide-transition>
    <!------------ Lista Productos ---------->
    <q-list inset-separator no-border link>
        <q-item :to="'/clientedetail/' + usu.telefono" v-for="(usu,key) in UsuariosFiltrados" :key="key">
          <!-- <q-item-side>{{ usu['.key'] }}</q-item-side> -->
          <q-item-side icon="person" inverted color="primary"></q-item-side>
          <q-item-main>
            <q-item-tile label>{{ usu.nombre }}</q-item-tile>
            <q-item-tile sublabel>{{ usu.telefono }}</q-item-tile>
          </q-item-main>
          <!-- <q-item-side right>
            <q-item-tile icon="more_vert"/>
          </q-item-side> -->
        </q-item>
    </q-list>

  </div>

</template>

<script>
import { QToolbar } from 'quasar'
import {  QSlideTransition, QInfiniteScroll, QSpinnerDots, Loading } from 'quasar'
import { QSearch, QScrollArea,QField,QList,QListHeader,QItem,QItemSeparator,QItemSide,QItemMain,QItemTile} from 'quasar'
import db from '@/datasource.js'

function showSpinner () {
  Loading.show({message: "Cargando datos..."})
  setTimeout(() => {
    Loading.hide()
  }, 3000)
}

export default {
  name: 'clientes',
  data: function () {
    return {
      searchText: null,
      usuarios: {}
    }
  },
  firebase: {
    usuarios: db.ref('usuarios')
  },
  computed:
  {
    
      UsuariosFiltrados:function()
      {   
          if (this.searchText != null) {
             var self=this;
             return this.usuarios.filter(function(usu){return usu.nombre.toLowerCase().indexOf(self.searchText.toLowerCase())>=0;});
          } else {
              return this.usuarios
          }
      }
  },  
  components: {
    QToolbar,
    QSlideTransition, QInfiniteScroll, QSpinnerDots,
    QSearch,QScrollArea,QField,QList,QListHeader, QItem,QItemSeparator,QItemSide,QItemMain,QItemTile 
  }, 
  created: function(){

  },
   mounted() {
     showSpinner()
     console.log("Componente de Productos MONTADO") 
  },
  methods: {
    search() {
      var self=this;
      console.log("search con valor: " + self.searchText)
      return self.usuarios.filter( function(usu) {
             return usu.nombre.toLowerCase().indexOf( self.searchText.toLowerCase() )>=0;});      
    }
  }

}
</script>

<style lang="stylus">

</style>
