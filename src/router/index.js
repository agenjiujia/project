import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Roles from '@/components/rbac/roles.vue'
import Rights from '@/components/rbac/power.vue'
import { Message } from 'element-ui';
// 商品列表
import Goods from '@/components/goods/goodslist.vue'
// 商品参数
import Params from '@/components/goods/goodsParams.vue'
// 商品分类
import Categories from '@/components/goods/categories.vue'
// 添加商品
import Addgoods from '@/components/goods/Addgoods.vue'
Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    },{
      name:'goods',
      path:'/goods',
      component:Goods
    },{
      name:'params',
      path:'/params',
      component:Params
    },{
      name:'categories',
      path:'/categories',
      component:Categories
    },{
      name:'addGoods',
      path:'/goodsAdd',
      component:Addgoods
    }]
  }
  ]
})
// 路由守卫
router.beforeEach(function (to, from, next) {
  // console.log(to,from)
  if (to.path === '/login') {
    next()
  } else {
    var token = sessionStorage.getItem('token')
    if (!token) {
      router.push('/login')
      Message.error('请先登录')
      return
    }
  }
  next()
})
export default router