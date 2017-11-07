<template>
   <section> 
    <!-------------- Search -------------->
    <q-slide-transition>
      <q-toolbar color="primary" id="filterBar"
          v-show="filterList">
        <q-search inverted ref="filterRef"
          v-model="searchText" 
          color="none"
          :before="[
            {
              icon: 'arrow_back',
              handler () {
                toggleFilterList()
              }
            }
          ]"
          placeholder="Buscar..."
        />
      </q-toolbar>
    </q-slide-transition>
    <!------------ Lista Productos ---------->
    <q-list inset-separator no-border link>
        <q-item :to="'/clientedetail/' + usu.telefono" v-for="(usu,key) in filteredShops" :key="key">
          <!-- <q-item-side>{{ usu['.key'] }}</q-item-side> -->
          <q-item-side icon="person" inverted color="primary"></q-item-side>
          <q-item-main>
            <q-item-tile label>{{ usu.nombre }}</q-item-tile>
            <q-item-tile sublabel>{{ usu['.key'] }} - {{ usu.telefono }}</q-item-tile>
          </q-item-main>
          <!-- <q-item-side right>
            <q-item-tile icon="more_vert"/>
          </q-item-side> -->
        </q-item>
    </q-list>
  </section>
</template>

<script>
import { QToolbar } from 'quasar'
import {  QSlideTransition, QInfiniteScroll, QSpinnerDots, Loading } from 'quasar'
import { QSearch, QScrollArea,QField,QList,QListHeader,QItem,QItemSeparator,QItemSide,QItemMain,QItemTile} from 'quasar'
import { mapState } from 'vuex'
import db from '@/datasource.js'

export default {
  name: 'clientes',
  data: function () {
    return {
      searchText: '',
      usuarios: {}
    }
  },
  firebase: {
    usuarios: db.ref('usuarios')
  },
  computed:
  {
    ...mapState(['filterList']),
    filteredShops () {
      return this.usuarios.filter(item => {
        return item.nombre.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      })
    },
  },  
  components: {
    QToolbar,
    QSlideTransition, QInfiniteScroll, QSpinnerDots,
    QSearch,QScrollArea,QField,QList,QListHeader, QItem,QItemSeparator,QItemSide,QItemMain,QItemTile 
  }, 
  created: function(){

  },
   mounted() {
     console.log("Componente de Productos MONTADO") 
  },
  methods: {
    search () {
      var self=this;
      console.log("search con valor: " + self.searchText)
      return self.usuarios.filter( function(usu) {
             return usu.nombre.toLowerCase().indexOf( self.searchText.toLowerCase() )>=0;});      
    },
    toggleFilterList () {
      this.searchText = ""
      this.$store.dispatch('toggleFilterList')
    }
  }

}
</script>

<style lang="stylus">
  #filterBar {
    min-height: auto;
    position: fixed;
    top: 0px;
    z-index: 2500
  }
</style>
