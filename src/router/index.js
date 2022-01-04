import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import AuthRoutes from './auth'
import DashboardRoutes from './Dashboerad'
import PublicRoutes from './public'

Vue.use(VueRouter)

const routes = [
  AuthRoutes,
  DashboardRoutes,
  ...PublicRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['Auth/isAuth'];
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (!isLoggedIn) {
      store.dispatch('Auth/logoutUser');
      next({
        path: '/auth/login',
        /* query: {
          redirect: to.fullPath
        } */
      });
    } else {
      next()
    }
  } else if (to.matched.some(rec => rec.meta.requiresGuest)) {
    if (isLoggedIn) {
      next({
        path: '/dashboard/profile',
        /* query: {
          redirect: to.fullPath
        } */
      });
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
