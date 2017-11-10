<template>
   <section> 
    <!-------------- Search -------------->
    <q-slide-transition>
      <q-toolbar color="primary" id="filterBar"
          v-show="activateSearchProductos">
        <q-search inverted ref="filterRef"
          v-model="searchText" 
          color="none"
          :before="[
            {
              icon: 'arrow_back',
              handler () {
                toggleSearchBar()
              }
            }
          ]"
          placeholder="Buscar..."
        />
      </q-toolbar>
    </q-slide-transition>
    <!------------ Lista Productos ---------->
    <q-list inset-separator no-border link>
        <q-item :to="'/clientedetail/' + prod['.key']" v-for="(prod,key) in filteredProducts" :key="key">
          <q-item-side icon="person" inverted color="primary"></q-item-side>
          <q-item-main>
            <q-item-tile label>{{ prod.descripcion }}</q-item-tile>
            <q-item-tile sublabel>{{ prod['.key'] }} - Stock: {{ prod.stock }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold">$ {{ prod.precio }}</q-item-side>
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
  name: 'productos',
  components: {
    QToolbar,
    QSlideTransition, QInfiniteScroll, QSpinnerDots,
    QSearch,QScrollArea,QField,QList,QListHeader, QItem,QItemSeparator,QItemSide,QItemMain,QItemTile 
  }, 
  
  data: function () {
    return {
      searchText: ''
    }
  },
  activated() {
    updateLayout()
  },
  beforeMount() {
    updateLayout()
  },
  mounted() {
     console.log("Lista de Productos montado") 
  },

  computed:
  {
    ...mapState(['productosList', 'filterClientesList', 'activateSearchProductos']),

    filteredProducts : function () {
       return this.productosList.filter(item => {
         return item.descripcion.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
       })
    },
  },  

  methods: {
    toggleSearchBar () {
      this.searchText = ""
      this.$store.commit('toggleSearchBar')
    },
    updateLayout () {
      let config = {
        title: "Productos",
        search: true
      }
      this.$store.commit('updateLayoutConf', config)
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
