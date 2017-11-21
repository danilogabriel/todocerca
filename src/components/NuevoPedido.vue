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
      <q-list highlight separator no-border v-else>
        <q-list-header>Detalle del pedido</q-list-header>
        <q-item :ref="prod.id" :id="prod.id" v-for="(prod,key) in pedido" :key="key" v-touch-hold="onTouchHoldProducto">
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
        <q-search ref="productFilterRef" v-model="productoFilter" placeholder="Buscar producto" @change="checkInput">
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
                    <!-- <h6>
                      <q-icon name="format_list_numbered" color="primary" size="1.3rem"></q-icon>
                      Cantidad
                    </h6>
                    <q-input type="text" autofocus v-model="qty" /> -->
                    <q-field
                      label="Cantidad"
                      icon="format_list_numbered"
                      :label-width="4"
                    >
                      <q-input type="text" autofocus v-model="qty" />
                    </q-field>
                  </div>
                  <div class="col">
                    <!-- <h6>
                      <q-icon name="star" color="amber-9" size="1.3rem"></q-icon>
                      Promoción
                    </h6>
                    <q-input type="text" v-model="promo" /> -->
                    <q-field
                      label="Promoción"
                      icon="star"
                      :label-width="4"
                    >
                      <q-input type="text" v-model="promo" />
                    </q-field>
                  </div>
                </div>
              </q-card-main>
              <q-card-main v-show="!validForm && errorMsg.length > 0" class="bg-red-4">{{ this.errorMsg }}</q-card-main>
            </q-card>
            <q-card flat color="blue-grey-2" class="text-dark">
              <template v-if="this.promo > 0">
                <q-card-main>
                  <div class="row items-center lg-gutter">
                    <div class="col">Subtotal</div>
                    <div class="col-auto strong">{{ subtotal | currency }}</div>
                    <div class="col">Descuento</div>
                    <div class="col-auto strong">{{ descuento | currency }}</div>
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
            <q-btn flat @click="$refs.modalAddProducto.close()">Cancelar</q-btn>
            <q-btn icon="add" color="primary" :disabled="!validForm" @click="agregarProducto">Agregar</q-btn>
        </div>
      </q-modal>

  </div>
</template>

<script>
<<<<<<< HEAD
import { mapState, mapMutations, mapActions } from 'vuex'
=======
>>>>>>> 314c749a217e126af8b6840890536dd2fe6bcbc3
import {
  QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, 
  QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert, QCard, QCardMain, QCardSeparator,
  ActionSheet
} from 'quasar'
<<<<<<< HEAD
=======
import { TouchHold } from 'quasar'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
>>>>>>> 314c749a217e126af8b6840890536dd2fe6bcbc3

export default {
  name: 'NuevoPedido',
  components: {
    QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, 
    QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert, QCard, QCardMain, QCardSeparator,
    ActionSheet
  },
  directives: {
    TouchHold
  },
  activated() {

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

      // pedidoNew y itemNew: ahora vienen del modulo 'Pedidos.js' del global state
  }),


  methods: {
    //-----------  Agregado por Danilo para insertar pedido en Firebase ---------
    //...mapState('pedidos', ['pedidoNew', 'itemNew']),

    ...mapActions(['addItem', 'insertPedido']),
    ...mapMutations(['SET_CLIENTE']),

    finalizarPedido() {     
        this.insertPedido( ) //----------  VUEX
        this.pedido = []
        this.$router.go(-1)
    },
    //-------------------------------------------------------------------------
    /* Touch event para eliminar un producto */
    onTouchHoldProducto(obj) {
      let self = this
      let producto = this.pedido.find(prod => prod.id === obj.evt.target.offsetParent.id)

      let indexOfProd = this.pedido.indexOf(producto)

      ActionSheet.create({
        title: producto.label,
        gallery: true,
        actions: [
          {
            label: 'Eliminar producto',
            icon: 'delete',
            handler () {
              if (indexOfProd > -1) {
                self.pedido.splice(indexOfProd, 1)
                self.updateTotalPedido(self.totalPedido)
              }
            }
          },
          // {
          //   label: 'Editar',
          //   icon: 'edit',
          //   handler () {
          //     // Toast.create('Shared!')
          //   }
          // },
        ],
        dismiss: {
          label: 'Cancelar',
          handler () {
            // Toast.create('Cancelled...')
          }
        }
      })
    },
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
      var itemNewCopy = Object.assign({}, this.itemNew)  //-- clona un objeto Item
      itemNewCopy.idProducto     = this.productSelectedDetail.id
      itemNewCopy.precio         = this.productSelectedDetail.price
      itemNewCopy.cantidad       = this.qty
      itemNewCopy.cantBonificada = this.promo
      itemNewCopy.montoDesc      = itemNewCopy.precio * itemNewCopy.cantBonificada
      itemNewCopy.montoItem      = (itemNewCopy.precio * itemNewCopy.cantidad) - itemNewCopy.montoDesc
            
      this.addItem(itemNewCopy)  //-- action de Vuex mapeada: addItem

      //this.pedidoNew.subtotal  += itemNewCopy.montoItem      
      //this.pedidoNew.total     += itemNewCopy.montoItem
      //this.pedidoNew.descuento = 0 //-- Recordar:  este es el descuento gral del pedido
      
      //this.updateTotalPedido(  this.pedidoNew.total )  //------  VUEX
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
      if (this.qty.length == 0) this.errorMsg = ''
      if (!this.productSelected) return false
      if (this.productSelectedDetail.stock == 0) return false
      if (!this.isNumber(this.qty)) return false

      if (this.qty > this.productSelectedDetail.stock) {
        this.errorMsg = "La cantidad pedida no puede superar el stock diponible para el artículo seleccionado"
        return false
      }
      if (this.qty <= 0 && this.isNumber(this.qty)) {
        this.errorMsg = "La cantidad pedida debe ser un número positivo"
        return false
      }
      if (this.promo < 0) {
        this.errorMsg = "La cantidad bonificada debe ser cero o un número positivo"
        return false
      }
      if (this.isNumber(this.qty) && this.qty < this.promo) { 
        this.errorMsg = "La cantidad pedida no puede ser menor a la bonificada"
        return false
      }
      if (!this.isNumber(this.promo)) {
        this.errorMsg = "La cantidad bonificada deben ser números"
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
          sublabel: product.id + ( product.stock == 0 ? ' - ARTÍOC' : ' - Stock: ' + product.stock),
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
