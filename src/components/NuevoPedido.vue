<template>
  <div>
      <q-toolbar color="primary">
        <q-toolbar-title>
          Cliente ID: {{ idCliente }}
        </q-toolbar-title>
        <q-btn flat @click="finalizarPedido()">
            <q-icon name="send" />
        </q-btn>
      </q-toolbar>
      <!-- <div>Nuevo Pedido de Cliente ID: {{ idCliente }}</div> -->
      <div v-if="pedido.length == 0" class="row items-center justify-center" style="margin-top: 18%; color: #757575">
          <div class="col-auto text-center">
            <q-icon name="shopping_basket" size="9rem"/>
            <h6>Aún no hay ningún producto agregado</h6>
            <div>Para comenzar tocá el botón <q-chip color="orange">+</q-chip></div>
            <div>que está abajo a tu derecha</div>
          </div>
      </div>
      <q-list separator no-border v-else>
        <q-list-header>Detalle del pedido</q-list-header>
        <q-item v-for="(prod,key) in pedido" :key="key">
          <!-- <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side> -->
          <q-item-main>
            <q-item-tile label>{{ prod.label }}</q-item-tile>
            <q-item-tile sublabel>
              <div class="row items-center">
                <div class="col-4">
                  <strong>{{ prod.qty }}</strong> unidad{{ prod.qty == 1 ? '' : 'es'}} 
                </div>
                <div v-show="prod.promo > 0" class="col-auto">
                  <q-icon name="star" color="amber-9" size="1.2rem"></q-icon>
                </div>
                <div v-show="prod.promo > 0" class="col">
                  {{ prod.promo }} bonificada{{ prod.promo == 1 ? '' : 's'}}
                </div>
              </div>
            </q-item-tile>
          </q-item-main>
          <q-item-side right class="text-nowrap">
            <div><small>{{ prod.price | currency }} x {{ prod.qty - prod.promo }}</small></div>
            <div class="text-bold text-primary">{{ prod.price * ( prod.qty - prod.promo ) | currency }}</div>
            <!-- <div><small>{{ prod.qty }} x {{ prod.price | currency }}</small></div> -->
          </q-item-side>
        </q-item>
      </q-list>

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round icon="add" color="orange" class="animate-pop" @click="$refs.modalAddProducto.open()"/>
      </q-fixed-position>

      <q-modal ref="modalAddProducto" maximized position="bottom" :content-css="{padding: '20px'}" @open="$refs.productFilterRef.focus()">
        <h5>Agregar Producto</h5>
        <q-search autofocus ref="productFilterRef" v-model="productoFilter" placeholder="Buscar producto" @change="checkInput">
          <q-autocomplete :min-characters="3" @selected="selected" :filter="myFilter" :static-data="{field: 'value', list: parsedProducts}"/>
        </q-search>
        <template v-if="productSelected">
          <q-card flat color="blue-grey-2" class="text-dark">
            <q-list>
              <q-item>
                <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side>
                <q-item-main>
                  <q-item-tile label>{{ productSelectedDetail.label }}</q-item-tile>
                  <q-item-tile sublabel class="text-grey-8">{{ productSelectedDetail.sublabel }}</q-item-tile>
                </q-item-main>
                <q-item-side right class="text-bold">{{ productSelectedDetail.stamp }}</q-item-side>
              </q-item>
            </q-list>
          </q-card>

          <q-alert v-if="productSelectedDetail.stock == 0" color="negative"
              style="margin: 1.5rem .5rem">Artículo sin stock, por favor elegí otro</q-alert>
          <template v-else>
            <q-card flat color="blue-grey-2" class="text-dark">
              <q-card-main>
                <div class="row lg-gutter">
                  <div class="col">
                    <h6>
                      <q-icon name="format_list_numbered" color="primary" size="1.3rem"></q-icon>
                      Cantidad
                    </h6>
                    <q-input type="text" v-model="qty" />
                  </div>
                  <div class="col">
                    <h6>
                      <q-icon name="star" color="amber-9" size="1.3rem"></q-icon>
                      Promoción
                    </h6>
                    <q-input type="text" v-model="promo" />
                  </div>
                </div>
              </q-card-main>
              <q-card-main v-show="!validForm" class="bg-red-4">{{ this.errorMsg }}</q-card-main>
            </q-card>
            <q-card flat color="blue-grey-2" class="text-dark">
              <template v-if="this.promo > 0">
                <q-card-main>
                  <div class="row items-center lg-gutter">
                    <div class="col">Subtotal</div>
                    <div class="col-auto">{{ subtotal | currency }}</div>
                  </div>
                </q-card-main>
                <q-card-main>
                  <div class="row items-center">
                    <div class="col">Descuento</div>
                    <div class="col-auto">{{ descuento | currency }}</div>
                  </div>
                </q-card-main>
                <q-card-separator />
              </template>
              <q-card-main class="bg-blue-grey-3">
                <div class="row items-center">
                  <div class="col">
                    <h6>Total</h6>
                  </div>
                  <div class="col-auto">
                    <h6>{{ total | currency }}</h6>
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </template>
        </template>

        <div class="group text-right">
            <q-btn @click="$refs.modalAddProducto.close()">Cancelar</q-btn>
            <q-btn color="primary" :disabled="!validForm" @click="agregarProducto">Agregar</q-btn>
        </div>
      </q-modal>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, 
  QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert, QCard, QCardMain, QCardSeparator
} from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'NuevoPedido',
  components: {
    QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, 
    QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert, QCard, QCardMain, QCardSeparator
  },
  activated() {

    this.pedidoNew.idCliente= this.idCliente

    let config = {
      title: "Nuevo pedido",
      search: false,
      cancel: true,
      footer: true
    }
    this.$store.commit('updateLayoutConf', config)
  },
  data: () => ({
      productoFilter: "",
      pedido: [],
      qty: 1,
      promo: 0,
      productSelected: false,
      productSelectedDetail: {},
      errorMsg: '',
      

      pedidoNew: {
          idCliente: 0,
          fecha: "",
          usuario: "",
          deviceID: "",
          subtotal: 0,
          descuento: 0,
          total: 0, 
          nota: "",
          items: [ ]
      }, 
      itemNew: { 
        idProducto: "", 
        precio: 0, 
        cantidad: 0, 
        cantBonificada:0, 
        montoItem: 0, 
        montoDesc: 0 
      },
  }),
  methods: {

    //-----------  Agregado por Danilo para insertar pedido en Firebase ---------
    ...mapMutations(['updateTotalPedido', 'insertPedido']),

    finalizarPedido() {
      
      this.insertPedido( this.pedidoNew ) //----------  VUEX
      this.updateTotalPedido(0)           //----------  VUEX

      this.pedidoNew = {}
      this.pedido = []
      this.$router.go(-2)
    },
    //-------------------------------------------------------------------------

    myFilter(terms, { field, list }) {
      const token = terms.toLowerCase()
      return list.filter(item => {
        return item[field].toLowerCase().indexOf(token) >= 0
      })
    },
    selected (item) {
      this.productSelected = true
      this.productSelectedDetail = item
    },
    checkInput(val) {
      if (val.length == 0) {
        this.productSelected = false
        this.productSelectedDetail = {}
        this.qty = 1
        this.promo = 0
      }
    },
    agregarProducto() {

      this.productSelectedDetail["qty"] = this.qty
      this.productSelectedDetail["promo"] = this.promo

      this.pedido.push(this.productSelectedDetail)
      
      //---------  Nuevo Item dentro de Nuevo Pedido ----------
      var itemNewdCopy = Object.assign({}, this.itemNew)  //-- clona un objeto Item
      itemNewdCopy.idProducto     = this.productSelectedDetail.id
      itemNewdCopy.precio         = this.productSelectedDetail.price
      itemNewdCopy.cantidad       = this.qty
      itemNewdCopy.cantBonificada = this.promo
      itemNewdCopy.montoItem      = this.subtotal - this.descuento
      itemNewdCopy.montoDesc      = this.descuento
      
      this.pedidoNew.items.push(itemNewdCopy)

      this.pedidoNew.subtotal  = this.totalPedido      
      this.pedidoNew.total     = this.totalPedido 
      this.pedidoNew.descuento = 0 //-- Recordar:  este es el descuento gral del pedido
      
      this.updateTotalPedido( this.totalPedido )  //------  VUEX
      //----------------------------------------------------------

      this.$refs.productFilterRef.clear()
      this.$refs.modalAddProducto.close()
    },
    isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  },
  computed: {
    ...mapState(['productosList']),
    validForm() {
      if (!this.productSelected) return false
      if (this.productSelectedDetail.stock == 0) return false
      if (this.qty > this.productSelectedDetail.stock) {
        this.errorMsg = "La cantidad pedida no puede superar el stock diponible para el artículo seleccionado"
        return false
      }
      if (this.qty <= 0 || this.qty == '') {
        this.errorMsg = "La cantidad pedida debe ser un número positivo"
        return false
      }
      if (this.promo < 0) {
        this.errorMsg = "La cantidad bonificada debe ser cero o un número positivo"
        return false
      }
      if (this.qty < this.promo) { 
        this.errorMsg = "La cantidad pedida no puede ser menor a la bonificada"
        return false
      }
      if (!this.isNumber(this.qty) || !this.isNumber(this.promo)) {
        this.errorMsg = "La cantidad pedida o la cantidad bonificada deben ser números"
        return false
      }

      this.errorMsg = ''
      return true
    },
    parsedProducts() {
      return this.productosList.map(product => {
        let color = product.stock > 0 ? "primary" : "faded"
        return {
          label: product.descripcion,
          sublabel: product.id + ( product.stock == 0 ? ' - ARTÍCULO SIN STOCK' : ' - Stock: ' + product.stock ),
          icon: "add_shopping_cart",
          leftColor: color,
          rightColor: color,
          stamp: this.$options.filters.currency(product.precio),
          value: product.descripcion,
          price: product.precio,
          id: product.id,
          stock: product.stock
        }
      })
    },
    totalPedido() {
      return this.pedido.reduce(function (sum, prod) {
          return sum + ( prod.price * prod.qty );
        }, 0);
    },
    idCliente() {
      return this.$route.params.idCliente
    },
    subtotal() {
      return this.validForm ? this.productSelectedDetail.price * this.qty : 0
    },
    descuento() {
      return this.validForm ? this.productSelectedDetail.price * this.promo : 0
    },
    total() {
      return this.validForm ? this.subtotal - this.descuento : 0
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
