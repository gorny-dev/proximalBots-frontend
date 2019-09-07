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
    },
    {
      path: '/projekty/:area?',
      name: 'Projects',
      component: () => import(/* webpackChunkName: "news" */ './components/Projects.vue')
    },
    {
      path: '/projekt/:slug',
      name: 'ProjectPage',
      component: () => import(/* webpackChunkName: "news" */ './components/ProjectPage.vue')
    },
    {
      path: '/pomoce-naukowe/:slug?',
      name: 'Study',
      component: () => import(/* webpackChunkName: "news" */ './components/Study.vue')
    },
    {
      path: '/zadanie/:slug?',
      name: 'StudyPage',
      component: () => import(/* webpackChunkName: "news" */ './components/StudyPage.vue')
    }
  ]
});
