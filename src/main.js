import Vue from 'vue'
import App from './App.vue'
import './assets/scss/styles.scss'
import router from './router'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);

// or with options
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
});


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),

}).$mount('#app');

// Vue.component('social', Social);
