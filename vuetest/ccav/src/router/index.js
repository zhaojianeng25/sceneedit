import Vue from 'vue'
import Router from 'vue-router'
import PanBase from '@/PanBase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PanBase',
      component: PanBase

    }
  ]
})
