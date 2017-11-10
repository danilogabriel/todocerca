<template>
  <div class="layout-padding row justify-center">
      Nuevo Pedido de Cliente ID: {{ idCliente }}
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round icon="shopping_cart" class="animate-pop" @click="addProducto()"/>
      </q-fixed-position>

      <q-modal ref="modalAddProducto" position="bottom" :content-css="{padding: '20px'}">
        <h4>Agregar Producto</h4><p>Aqui se cargara cada producto</p>
        <q-btn color="orange" @click="$refs.modalAddProducto.close()">Close Me</q-btn>
      </q-modal>

  </div>
</template>

<script>
import {
  QBtn, QFixedPosition, QModal
} from 'quasar'

export default {
  name: 'NuevoPedido',
  components: {
    QBtn, QFixedPosition, QModal
  },
  data() {
    return {
      idCliente: null
    }
  },
  mounted() {
    this.idCliente = this.$route.params.id
  },
  methods: {
    addProducto() {

      this.$refs.modalAddProducto.open()

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
