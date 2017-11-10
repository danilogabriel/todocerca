<template>
  <div class="layout-padding row justify-center">
      Pedidos
  </div>
</template>

<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile
} from 'quasar'

export default {
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile
  },
  activated() {
    let config = {
      title: "Pedidos",
      search: true
    }
    this.$store.commit('updateLayoutConf', config)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
