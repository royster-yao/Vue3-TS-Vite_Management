import {RouteRecordRaw, createRouter,createWebHashHistory} from 'vue-router'
// * import Vue from 'vue'
// * Vue.use(VueRouter)
// * Vue2 use:调用的就是参数上的install方法，或者是直接调用参数. Vue.prototype.$router/$route

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name:'login',
        component: () => import("../views/login/Login.vue")
    },
    {
        path: '/home',
        name:'home',
        component: () => import("../views/home/Home.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes   // * 路由配置   
})

export default router