import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Roles from '@/components/rbac/roles.vue'
import Power from '@/components/rbac/power.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path:'/login',
      component:Login
    },{
      name:'home',
      path:'/',
      component:Home,
      children:[{
        name:'users',
        path:'/users',
        component:Users
      },{
        name:'roles',
        path:'/roles',
        component:Roles
      },{
        name:'power',
        path:'/power',
        component:Power
      }]
    }
  ]
})
