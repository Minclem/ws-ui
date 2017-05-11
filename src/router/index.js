import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home'
import Swiper from '@/views/demo/swiper'
import Loading from '@/views/demo/loading'
import DropDownMenu from '@/views/demo/drop-down-menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/demo/swiper',
      name: 'Swiper',
      component: Swiper
    },
    {
      path: '/demo/loading',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/demo/drop-down-menu',
      name: 'DropDownMenu',
      component: DropDownMenu
    }
  ]
})
