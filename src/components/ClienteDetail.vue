<template>
  <div class="layout-padding row justify-center">
      Cliente Detail {{ this.idCliente }}
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round color="primary" icon="add_shopping_cart" class="animate-pop" @click="nuevoPedido()"/>
      </q-fixed-position>     
  </div>
</template>

<script>
import {
  QBtn, QFixedPosition
} from 'quasar'

export default {
  name: 'ClienteDetail',
  components: {
    QBtn, QFixedPosition
  },
  activated() {
    let config = {
      title: "Detalle del cliente",
      search: false,
      cancel: false
    }
    this.$store.commit('updateLayoutConf', config)
  },
  data: () => ({
  }),
  computed: {
    idCliente: function() {
      return this.$route.params.idCliente
    }
  },
  methods: {
    nuevoPedido() {
      this.$router.push({ path: `/nuevopedido/${this.idCliente}` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
