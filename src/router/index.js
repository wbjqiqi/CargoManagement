import Vue from 'vue'
import Router from 'vue-router'
import Search from '../pages/search.vue'
import searchMain from '../pages/search-main.vue'
import Management from '../pages/cargo-main/cargo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search,
      children: [{
        path: '/:cargoId',
        name: 'searchMain',
        component: searchMain
      }]
    },
    {
      path: '/admin',
      name: 'management',
      component: Management
    }
  ]
})
