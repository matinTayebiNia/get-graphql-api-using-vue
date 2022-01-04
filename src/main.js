import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import { BootstrapVue } from 'bootstrap-vue'
import './assets/scss/main.scss';
import defaultLayout from "./components/layouts/defaultLayout";
import adminLayout from "./components/AdminLayout/sidebar"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from "vuelidate";
import '@fortawesome/fontawesome-free/js/all'


Vue.config.productionTip = false


Vue.use(VueSweetalert2);
const Toast = Vue.swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Vue.swal.stopTimer)
        toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
    }
})


Vue.config.productionTip = false
window.Toast = Toast
Vue.use(BootstrapVue)
Vue.use(Vuelidate)

//config layout
Vue.component('default-layout',defaultLayout);
Vue.component('admin-layout',adminLayout);

new Vue({
    router,
    store,
    render: h => h(App),
    apolloProvider: createProvider(),

}).$mount('#app')
