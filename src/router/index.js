import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/pages/Chat'
import Login from './../pages/Login'
import Register from './../pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      component: Chat
    }
  ]
})
