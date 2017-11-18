<template>
  <div>
      <q-toolbar color="primary">
        <q-toolbar-title>
          Cliente ID: {{ idCliente }}
        </q-toolbar-title>
      </q-toolbar>
      <!-- <div>Nuevo Pedido de Cliente ID: {{ idCliente }}</div> -->
      <div class="fullscreen row items-center justify-center" style="color: #757575">
          <div class="col-auto text-center">
            <q-icon name="shopping_basket" size="9rem"/>
            <h6>Aún no hay ningún producto agregado</h6>
            <div>Para comenzar tocá el botón <q-chip color="orange">+</q-chip></div>
            <div>que está abajo a tu derecha</div>
          </div>
      </div>
      <q-list separator no-border v-show="pedido.lenght > 1">
        <q-list-header>Detalle del pedido</q-list-header>
        <q-item v-for="(prod,key) in pedido" :key="key">
          <!-- <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side> -->
          <q-item-main>
            <q-item-tile label>
              <div style="color: #757575">
                <small>
                  <strong>{{ prod.qty }}</strong> unidad{{ prod.qty == 1 ? '' : 'es'}} 
                  <span v-show="prod.promo > 0">| {{ prod.promo }} bonificada{{ prod.promo == 1 ? '' : 's'}}</span>
                </small>
              </div>
              <div>{{ prod.label }}</div>
            </q-item-tile>
            <q-item-tile sublabel>
                <!-- <div>Precio unitario <strong>{{ prod.price | currency }}</strong></div> -->
              <!-- <div class="row"> -->
                <!-- <div class="col">{{ prod.qty }} unidad{{ prod.qty == 1 ? '' : 'es'}}</div> -->
                <!-- <div class="col">{{ prod.promo }} bonificadas</div> -->
              <!-- </div> -->
            </q-item-tile>
          </q-item-main>
          <q-item-side right class="text-nowrap">
            <div><small>{{ prod.price | currency }} x {{ prod.qty - prod.promo }}</small></div>
            <div class="text-bold text-primary">{{ prod.price * ( prod.qty - prod.promo ) | currency }}</div>
            <!-- <div><small>{{ prod.qty }} x {{ prod.price | currency }}</small></div> -->
          </q-item-side>
        </q-item>
      </q-list>

      <!-- <table class="q-table striped-even" width="100%">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="text-right">Cantidad</th>
            <th class="text-right">Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prod,key) in pedido" :key="key">
            <td>{{ prod.label }}</td>
            <td class="text-right">{{ prod.qty }}</td>
            <td class="text-right">{{ prod.qty * prod.price |currency }}</td>
          </tr>
        </tbody>
      </table> -->

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round icon="add" color="orange" class="animate-pop" @click="addProducto()"/>
      </q-fixed-position>

      <q-modal ref="modalAddProducto" maximized position="bottom" :content-css="{padding: '20px'}">
        <h5>Agregar Producto</h5>
        <q-search autofocus ref="productFilterRef" v-model="productoFilter" placeholder="Buscar producto" @change="checkInput">
          <q-autocomplete :min-characters="3" @selected="selected" :filter="myFilter" :static-data="{field: 'value', list: parsedProducts}"/>
        </q-search>
        <template v-if="productSelected">
          <q-list border>
            <q-item>
              <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side>
              <q-item-main>
                <q-item-tile label>{{ productSelectedDetail.label }}</q-item-tile>
                <q-item-tile sublabel>{{ productSelectedDetail.sublabel }}</q-item-tile>
              </q-item-main>
              <q-item-side right class="text-bold">{{ productSelectedDetail.stamp }}</q-item-side>
            </q-item>
          </q-list>

          <q-alert v-show="productSelectedDetail.stock == 0" color="negative"
              style="margin-top: 1.5rem; margin-bottom: 1.5rem">Artículo sin stock, por favor elegí otro</q-alert>

          <template v-if="productSelectedDetail.stock > 0">

            <div class="row items-center">
              <!-- <div class="col">Cantidad</div> -->
              <div class="col">
                <!-- <q-input type="number" :min="1" :max="productSelectedDetail.stock" v-model="qty" /> -->
                <q-field icon="format_list_numbered" label="Cantidad">
                  <q-slider v-if="productSelectedDetail.stock != 1" 
                    v-model="qty" :min="1" :max="productSelectedDetail.stock" />
                </q-field>
              </div>
              <div class="col-2  text-right">
                <q-input type="number" v-model="qty" :min="1" :max="productSelectedDetail.stock" />
                <!-- <q-chip color="primary">{{qty}}</q-chip> -->
              </div>
            </div>
            <div class="row items-center">
              <!-- <div class="col">Promoción</div> -->
              <div class="col">
                <q-field icon="star" label="Promoción">
                  <q-slider v-model="promo" :min="0" :max="qty" />
                </q-field>
                <!-- <q-input type="number" :min="0" :max="qty" v-model="promo" /> -->
              </div>
              <div class="col-2 text-right">
                <!-- <q-chip color="primary">{{promo}}</q-chip> -->
                <q-input type="number" v-model="promo" :min="0" :max="qty" />
              </div>
            </div>
            <div class="row items-center" v-show="this.promo > 0">
              <div class="col">Subtotal</div>
              <div class="col-auto">
                {{ subtotal | currency }}
              </div>
            </div>
            <div class="row items-center" v-show="this.promo > 0">
              <div class="col">Descuento</div>
              <div class="col-auto">
                {{ descuento | currency }}
              </div>
            </div>
            <div class="row items-center">
              <div class="col">Total</div>
              <div class="col-auto">
                {{ total | currency }}
              </div>
            </div>
          </template>
        </template>

        <div class="row">
          <div class="col">
            <q-btn @click="$refs.modalAddProducto.close()">Cancelar</q-btn>
          </div>
          <div class="col text-right">
            <q-btn color="primary" :disabled="!productSelected || productSelectedDetail.stock == 0" @click="agregarProducto">Agregar</q-btn>
          </div>
        </div>
      </q-modal>

  </div>
</template>

<script>
import {
  QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert
} from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'NuevoPedido',
  components: {
    QToolbar, QToolbarTitle, QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile, QInput, QSlider, QField, QChip, QIcon, QAlert
  },
  activated() {
    let config = {
      title: "Nuevo pedido",
      search: false,
      cancel: true,
      footer: true
    }
    this.$store.commit('updateLayoutConf', config)

    // this.updateFooter()
  },
  data() {
    return {
      productoFilter: "",
      pedido: [],
      qty: 1,
      promo: 0,
      productSelected: false,
      productSelectedDetail: {}
    }
  },
  methods: {
    myFilter(terms, { field, list }) {
      const token = terms.toLowerCase()
      return list.filter(item => {
        return item[field].toLowerCase().indexOf(token) >= 0
      })
    },
    addProducto() {
      this.$refs.modalAddProducto.open()
      this.$refs.productFilterRef.focus()
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
      this.$refs.productFilterRef.clear()
      this.$refs.modalAddProducto.close()
      // this.updateFooter()
    },
    // updateFooter() {
    //   let footer = {
    //     left: this.pedido.length + " producto" + (this.pedido.length != 1 ? "s" : ""),
    //     right: "TOTAL: " + this.$options.filters.currency(this.totalPedido)
    //   }

    //   this.$store.commit('updateFooterText', footer)
    // }
  },
  computed: {
    ...mapState(['productosList']),
    parsedProducts: function() {
      return this.productosList.map(product => {
        let color = product.stock > 0 ? "primary" : "faded"
        return {
          label: product.descripcion,
          sublabel: product.id + " - Stock: " + product.stock,
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
    totalPedido: function() {
      return this.pedido.reduce(function (sum, prod) {
          return sum + ( prod.price * prod.qty );
        }, 0);
    },
    idCliente: function() {
      return this.$route.params.id
    },
    subtotal: function() {
      return this.productSelectedDetail.price * this.qty
    },
    descuento: function() {
      return this.productSelectedDetail.price * this.promo
    },
    total: function() {
      return this.subtotal - this.descuento
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
