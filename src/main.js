// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import App from './App'

import router from "./router"; //引入路由实例与映射,把一堆路径单独放

//引入mock数据，不需要时注释该行即可
require('./mock/mock')

//滑动验证码
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);


import ElementUI from "element-ui";
// 按需导入 Button 和 Select 这两个组件,减少打包后项目的体积
// import { Button, Select } from 'element-ui';
// // 组件导入后需要在 Vue.use() 中进行注册
// Vue.use(Button)
// Vue.use(Select)
import 'element-ui/lib/theme-chalk/index.css'; //全局引入element的样式
Vue.use(ElementUI, {
  size: "small"
}); //使用Element-ui

import VueECharts from "./components/ECharts";
Vue.component("chart", VueECharts);

import store from '@/store'
//开发环境下才会引入mockjs
//process.env.MOCK && require('@/mock')

//本地存储
import {
  localStorageGetItem
} from "./utils/index.js"

Vue.config.productionTip = false

//引入请求方法
import {
  post,
  get
} from './http.js'
//指向原型 封装的方法
Vue.prototype.$HTTPPost = post
Vue.prototype.$HTTPGet = get
/**
 * 限制非法进入权限
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!localStorageGetItem("a")) { //获取当前UUSERID 是否存在
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
var myVue = new Vue({
  el: '#app',
  router, //将配置好的路由在Vue实例中使用
  store, //在main.js中导入store实例
  components: {
    App
  },
  template: '<App/>',
  data: {
    Bus: new Vue()
  }
  // mounted() {
  //   var that = this;
  //   window.homeTreeSelect = function(params) {
  //     // 全局面包屑
  //     that.$store.dispatch("setbreadcrumb", params);
  //   };
  // }
})
