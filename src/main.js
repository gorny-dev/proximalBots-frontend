import Vue from 'vue'
import App from './App.vue'
import './assets/scss/styles.scss'
import router from './router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueMoment from 'vue-moment';


//todo: wgrać własne obrazki
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://banner2.kisspng.com/20180404/bqw/kisspng-computer-icons-error-download-clip-art-x-mark-5ac54ca17a5a95.5409712615228796495012.jpg',
    loading: 'https://editionsdelarose.com/wp-content/themes/edr/img/loading.gif',
    attempt: 1
});
Vue.use(VueAxios, axios);
Vue.use(VueSession);
Vue.use(VueMoment);
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App),

}).$mount('#app');

Vue.prototype.$apiUrl = process.env.VUE_APP_API_LINK_MAIN || 'http://localhost:1337'; //base URL for our api app
Vue.prototype.$areasUrl = process.env.VUE_APP_API_LINK_AREAS || '/areas';
Vue.prototype.$projectsUrl = process.env.VUE_APP_API_LINK_PROJECTS || '/projects';
Vue.prototype.$postUrl = process.env.VUE_APP_API_LINK_POSTS || '/posts';
Vue.prototype.$teamUrl = process.env.VUE_APP_API_LINK_TEAM || '/teammates';
Vue.prototype.$tasksUrl = process.env.VUE_APP_API_LINK_TASKS || '/tasks';
Vue.prototype.$preloadTime = process.env.VUE_APP_PRELOAD_TIME || 0;
