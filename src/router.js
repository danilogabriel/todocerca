import Vue from 'vue'
import VueRouter from 'vue-router'

import Pedidos from '@/Pedidos.vue'
import Clientes from '@/Clientes.vue'
import Productos from '@/Productos.vue'
import Resumen from '@/Resumen.vue'
import Lista from '@/Lista.vue'
import ClienteDetail from '@/ClienteDetail.vue'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/pedidos', component: Pedidos },
    { path: '/clientes', component: Clientes },
    
    { path: '/clientedetail/:id', component: ClienteDetail },

    { path: '/productos', component: Productos },
    { path: '/resumen', component: Resumen }
  ]
})
