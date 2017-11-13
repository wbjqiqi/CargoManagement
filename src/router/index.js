import Vue from 'vue'
import Router from 'vue-router'
import Search from '../pages/search.vue'
import searchMain from '../pages/search-main.vue'
import Management from '../pages/cargo-main/cargo.vue'

import Upload from '../pages/upload/file-upload.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/a',
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
