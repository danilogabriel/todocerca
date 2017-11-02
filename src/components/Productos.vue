<template>

   <div> 

  <!-------------- Search -------------->
  <q-toolbar color="primary">
    <q-search inverted 
       v-model="searchText" 
       :debounce="600"
       color="none" 
       icon="search"
       @change="search"
    />
  </q-toolbar>
    <!------------ Lista Productos ---------->
    <div v-for="(usu,key) in UsuariosFiltrados" class="list striped">    
            <q-list striped> 
                <q-item to="/lista">
                  <q-item-side>{{ usu['.key'] }}</q-item-side>
                  <q-item-main>
                    <q-item-tile label>{{ usu.nombre }}</q-item-tile>
                    <q-item-tile sublabel>{{ usu.telefono }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-item-tile icon="more_vert"/>
                  </q-item-side>
                </q-item>
            </q-list>
    </div>

  </div>

</template>

<script>
import { QToolbar } from 'quasar'
import {  QInfiniteScroll, QSpinnerDots, Loading } from 'quasar'
import { QSearch, QScrollArea,QField,QList,QListHeader,QItem,QItemSeparator,QItemSide,QItemMain,QItemTile} from 'quasar'
import db from '@/datasource.js'
import VueEvents from 'vue-events'

function showSpinner () {
  Loading.show({message: "Cargando datos..."})
  setTimeout(() => {
    Loading.hide()
  }, 3000)
}

export default {
  name: 'productos',
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
    QInfiniteScroll, QSpinnerDots,
    QSearch,QScrollArea,QField,QList,QListHeader, QItem,QItemSeparator,QItemSide,QItemMain,QItemTile 
  }, 
  created: function(){

  },
   mounted() {
     showSpinner()
     console.log("Componente de Productos MONTADO") 
    // let usuariosRef = db.ref('usuarios')
    // console.log(typeof(usuariosRef))


/*
      var refUsuarios = db.ref('usuarios')
      refUsuarios.on("value", function(snapshot) {
        this.usuarios = snapshot.val()
        //console.log(snapshot.val());
      }, function (errorObject) {
        console.log("Error al cargar : " + errorObject.code);
      });
*/     
     
     
     
     
     //const usuref = db.ref('usuarios').once('value', snapshot => {
     //      console.log("se terminaron de cargar los usuarios")
     //      this.usuarios = usuref
     //      //this.$events.fire('UsuariosCargados', unUsuario);
     // })
  
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
