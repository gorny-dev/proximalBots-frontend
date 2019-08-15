import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/o-nas',
      name: 'AboutUs',
      component: () => import(/* webpackChunkName: "about" */ './components/AboutUs.vue')
    },
    {
      path: '/aktualnosci',
      name: 'News',
      component: () => import(/* webpackChunkName: "news" */ './components/News.vue')
    }
  ]
});
