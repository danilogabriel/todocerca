<template>
  <div class="layout-padding">
      <div>Nuevo Pedido de Cliente ID: {{ idCliente }}</div>
      <div>Detalle del pedido</div>
      <q-list inset-separator no-border>
        <q-item v-for="(prod,key) in pedido" :key="key">
          <q-item-side icon="free_breakfast" inverted color="primary"></q-item-side>
          <q-item-main>
            <q-item-tile label>{{ prod.label }}</q-item-tile>
            <q-item-tile sublabel>Cantidad {{ prod.qty }}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold">$ {{ prod.price * prod.qty }}</q-item-side>
          <q-item-side right>
            <q-btn flat small round color="dark">
              <q-icon name="edit" />
            </q-btn>
          </q-item-side>
          <q-item-side right>
            <q-btn flat small round color="negative">
              <q-icon name="close" />
            </q-btn>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-side icon="shopping_basket" inverted color="dark"></q-item-side>
          <q-item-main>
            <q-item-tile label>Total</q-item-tile>
            <q-item-tile sublabel>en {{ pedido.length }} productos</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-bold">$ {{ totalPedido }}</q-item-side>
          <q-item-side right></q-item-side>
          <q-item-side right></q-item-side>
        </q-item>
      </q-list>

      <table class="q-table striped-even" width="100%">
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
            <td class="text-right">{{ prod.qty * prod.price }}</td>
            <td class="text-right">
              <q-btn flat small round>
                <q-icon name="edit" />
              </q-btn>
              <q-btn flat small round color="negative">
                <q-icon name="close" />
              </q-btn>
            </td>
          </tr>
          <tr>
            <td class="text-bold">TOTAL</td>
            <td class="text-right">{{ pedido.length }}</td>
            <td class="text-right">{{ totalPedido }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round icon="add" color="orange" class="animate-pop" @click="addProducto()"/>
      </q-fixed-position>

      <q-modal ref="modalAddProducto" position="bottom" :content-css="{padding: '20px'}">
        <h4>Agregar Producto</h4>
        <q-search autofocus ref="productFilterRef" v-model="productoFilter" placeholder="Buscar producto" @change="checkInput">
          <!-- <q-autocomplete @search="search" @selected="selected" /> -->
          <q-autocomplete :min-characters="3" @selected="selected" :static-data="{field: 'value', list: parsedProducts}"/>
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

          <div class="row items-center">
            <!-- <div class="col">Cantidad</div> -->
            <div class="col">
              <!-- <q-input type="number" :min="1" :max="productSelectedDetail.stock" v-model="qty" /> -->
              <q-field icon="format_list_numbered" label="Cantidad">
                <q-slider v-if="productSelectedDetail.stock != 1" 
                  fill-handle-always label v-model="qty" :min="1" :max="productSelectedDetail.stock" />
              </q-field>
            </div>
            <div class="col-1 text-right">
              <q-chip color="primary">{{qty}}</q-chip>
            </div>
          </div>
          <div class="row items-center">
            <!-- <div class="col">Promoción</div> -->
            <div class="col">
              <q-field icon="star" label="Promoción">
                <q-slider label v-model="promo" :min="0" :max="qty" />
              </q-field>
              <!-- <q-input type="number" :min="0" :max="qty" v-model="promo" /> -->
            </div>
            <div class="col-1 text-right">
              <q-chip color="primary">{{promo}}</q-chip>
            </div>
          </div>
          <div class="row items-center" v-show="this.promo > 0">
            <div class="col">Subtotal</div>
            <div class="col-auto">
              {{ subtotal }}
            </div>
          </div>
          <div class="row items-center" v-show="this.promo > 0">
            <div class="col">Descuento</div>
            <div class="col-auto">
              -{{ descuento }}
            </div>
          </div>
          <div class="row items-center">
            <div class="col">Total</div>
            <div class="col-auto">
              {{ total }}
            </div>
          </div>
        </template>

        <div class="row">
          <div class="col">
            <q-btn @click="$refs.modalAddProducto.close()">Cancelar</q-btn>
          </div>
          <div class="col text-right">
            <q-btn color="primary" :disabled="!productSelectedDetail" @click="agregarProducto">Agregar</q-btn>
          </div>
        </div>
      </q-modal>

  </div>
</template>

<script>
import {
  QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QItem, QItemSide, QItemMain, QItemTile, QInput, QSlider, QField, QChip, QIcon
} from 'quasar'
import { mapState } from 'vuex'

export default {
  name: 'NuevoPedido',
  components: {
    QBtn, QFixedPosition, QModal, QSearch, QAutocomplete, QList, QItem, QItemSide, QItemMain, QItemTile, QInput, QSlider, QField, QChip, QIcon
  },
  activated() {
    let config = {
      title: "Nuevo pedido",
      search: false,
      cancel: true
    }
    this.$store.commit('updateLayoutConf', config)
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
    }
  },
  computed: {
    ...mapState(['productosList']),
    parsedProducts: function() {
      return this.productosList.map(product => {
        return {
          label: product.descripcion,
          sublabel: product.id + " - Stock: " + product.stock,
          icon: "free_breakfast",
          stamp: "$ " + product.precio,
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
