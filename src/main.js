import Vue from 'vue'
import App from './App.vue'
import './assets/scss/styles.scss'
import router from './router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'

//todo: wgrać własne obrazki
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://banner2.kisspng.com/20180404/bqw/kisspng-computer-icons-error-download-clip-art-x-mark-5ac54ca17a5a95.5409712615228796495012.jpg',
    loading: 'https://editionsdelarose.com/wp-content/themes/edr/img/loading.gif',
    attempt: 1
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),

}).$mount('#app');

Vue.prototype.$apiUrl = 'http://localhost:1337'; //base URL for our api app
Vue.prototype.$areasUrl = '/areas';
Vue.prototype.$projectsUrl = '/projects';
Vue.prototype.$teamUrl = '/teammates';
Vue.prototype.$tasksUrl = '/tasks';
Vue.prototype.$tasksCategoriesUrl = '/taskscategories';
Vue.prototype.$preloadTime = process.env.VUE_APP_PRELOAD_TIME || 500;
