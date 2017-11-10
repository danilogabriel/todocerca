<template>
   <section> 
    <!-------------- Search -------------->
    <q-slide-transition>
      <q-toolbar color="primary" id="filterBar"
          v-show="activateSearchClientes">
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
        <q-item :to="'/clientedetail/' + cli['.key']" v-for="(cli,key) in filteredShops" :key="key">
              
          <!-- <q-item-side>{{ cli['.key'] }}</q-item-side> -->
          <q-item-side icon="person" inverted color="primary"></q-item-side>
          <q-item-main>
            <q-item-tile label>{{ cli.nombre }} </q-item-tile>
            <q-item-tile sublabel>{{  ('00000'+ cli['.key'] ).slice(-5)  }} - {{ cli.domicilio }}</q-item-tile>
          </q-item-main>
          <q-item-side right>
              <q-chip small v-show="cli['.key']==6" color="red">2</q-chip>
          </q-item-side>
        </q-item>
    </q-list>
  </section>
</template>

<script>
import { QToolbar, QChip } from 'quasar'
import {  QSlideTransition, QInfiniteScroll, QSpinnerDots, Loading } from 'quasar'
import { QSearch, QScrollArea,QField,QList,QListHeader,QItem,QItemSeparator,QItemSide,QItemMain,QItemTile} from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'clientes',
  data: function () {
    return {
      searchText: ''
    }
  },
   
  computed:
  {
    ...mapState(['clientesList', 'filterSearchClientes', 'activateSearchClientes']),

    filteredShops : function () {
       return this.clientesList.filter(item => {
         return item.nombre.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
       })
    },
  },  
  components: {
    QToolbar,QChip,
    QSlideTransition, QInfiniteScroll, QSpinnerDots,
    QSearch,QScrollArea,QField,QList,QListHeader, QItem,QItemSeparator,QItemSide,QItemMain,QItemTile 
  }, 
  created: function(){

  },
  activated() {
    let config = {
      title: "Clientes",
      search: true
    }
    this.$store.commit('updateLayoutConf', config)
  },
  mounted() {
     console.log("Lista de Clientes montado") 
  },
  methods: {
    toggleSearchBar () {
      this.searchText = ""
      this.$store.commit('toggleSearchBar')
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
