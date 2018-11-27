// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Myserverhttp from '@/public/http.js'
// @引入时间格式处理插件
import moment from 'moment'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset.css'

Vue.use(Element)
Vue.use(Myserverhttp)
Vue.config.productionTip = false

// @注册全局过滤器,使用出|调用就可以了,v指向调用者【调用的属性】
Vue.filter('fmdata',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
