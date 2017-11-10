<template>
  <div class="layout-padding row justify-center">
      Cliente Detail {{ $route.params.id }}
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn round color="secondary" icon="shopping_cart" class="animate-pop" @click="nuevoPedido()"/>
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
  data() {
    return {
      idCliente: null
    }
  },
  mounted() {
    this.idCliente = this.$route.params.id
  },
  methods: {
    nuevoPedido() {
      this.$router.push({ path: '/nuevopedido/${idCliente}' })
      //router.push({ path: '/nuevopedido', params: { idCliente }})      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
