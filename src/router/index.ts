import { RouteRecordRaw, createRouter,createWebHashHistory } from 'vue-router'
import store from '../store/index'
import Cookies from "js-cookie"
// * import Vue from 'vue'
// * Vue.use(VueRouter)
// * Vue2 use:调用的就是参数上的install方法，或者是直接调用参数. Vue.prototype.$router/$route

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name:'login',
        component: () => import("../views/login/Login.vue")
    },
    // {
    //     path: '/home',
    //     name:'home',
    //     component: () => import("../views/home/Home.vue")
    // },
    // {
    //     path:'/pms',
    //     name:'pms',
    //     component: () => import("../views/home/Home.vue"),
    //     children:[
    //         {
    //             path:'product',
    //             name:'product',
    //             component: () => import("../views/pms/product.vue"),
    //         }
    //     ]
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes   // * 路由配置   
})

// ? 前置导航守卫
router.beforeEach((to,from,next) => {
    // 1. token && menus(权限列表) 为空
    const token = Cookies.get("token")
    if (token && store.state.menus.length === 0) {

        // ? 异步
       store.dispatch("getAdminInfo").then(() =>{
        const menus = store.getters.getNewMenus
            // const routeTable: RouteRecordRaw[] = []
            // 循环菜单对象
            for(let key in menus) {
                const newRoute: RouteRecordRaw = {
                    path:'/' + menus[key].name,
                    name: menus[key].name,
                    component: () => import("../views/home/Home.vue"),
                    redirect:'/' + menus[key].name + '/' + menus[key].children,
                    children:[]
                };
                for(let i = 0; i < menus[key].children.length; i++) {
                    newRoute.children?.push({
                        path:menus[key].children[i].name,
                        name: menus[key].children[i].name,
                        component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`),
                    })
                }
                // ? 动态添加路由规则
                router.addRoute(newRoute)
            }  
                // ? 动态添加首页
                router.addRoute({
                    path:"/",
                    name:'home',
                    redirect:'/index',
                    component: () => import("../views/home/Home.vue"),
                    children:[
                        {
                            path:'index',
                            name:'index',
                            component: () => import("../views/index/index.vue")
                        }
                    ]
                })
            next(to.path)
       })
    }else {
        next()
    }
})



export default router