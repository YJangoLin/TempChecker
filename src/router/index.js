import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/module/sys/login'
import resigter from "../views/module/sys/resigter";
import menu from '../views/module/menu/MainMenu'
import userinfo from '../views/module/menu/userinfo'
import logininfo from "../views/module/log/logininfo";
import userperson from "../views/module/usermanage/userperson";
import viewchart from "../views/module/check/viewchart";
import currentcheck from "../views/module/check/currentcheck";
import analysis from "../views/module/dataerror/analysis";
import tip from "../views/module/check/tip";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/register',
    name: 'register',
    component: resigter
  },{
    path: '/main',
    name: '主页面',
    component: menu
  },{
    path: '/page1',
    name: '用户管理',
    component: menu,
    children: [{
      path: '/userInfo',
      name: '用户信息',
      component: userinfo
    },{
      path: '/userperson',
      name: '个人中心',
      component: userperson
    }

    ]
  },{
    path: '/page2',
    name: '温湿度监控',
    component: menu,
    children:[
      {
        path: '/currentcheck',
        name: '实时监控',
        component: currentcheck
      },{
        path: '/echart',
        name: '可视化分析',
        component: viewchart
      },{
        path: '/tip',
        name: '温馨提示',
        component:tip
      }
    ]
  }, {
    path: '/page3',
    name: '日志信息',
    component: menu,
    children:[
      {
        path: '/logininfo',
        name: '用户日志信息',
        component: logininfo
      }
    ]
  },{
    path: '/page4',
    name: '异常检测',
    component: menu,
    children:[
      {
        path: '/analysis',
        name: '异常数据分析展示',
        component: analysis
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
