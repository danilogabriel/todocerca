<template>
  <div>
    Resumen
  </div>
</template>

<script>
export default {
  
  name: 'resumen',
  activated() {
    let config = {
      title: "Todo cerca",
      search: false
    }
    this.$store.commit('updateLayoutConf', config)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
