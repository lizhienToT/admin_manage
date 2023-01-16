import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import HydLayoutWrap from "../layout/index.vue"
import 'nprogress/nprogress.css'
// import { useAppStore, useUserInfoStore, useRoutesStore } from '../store'
// import { size, forEach } from 'lodash'
// import { setRouteEmitter } from './listener'
import { parseQuery, stringifyQuery } from './encryption'

NProgress.configure({ showSpinner: false })

const router = createRouter({
    history: createWebHistory(),
    parseQuery,
    stringifyQuery,
    routes: [
        {
            path: '/',
            redirect: '/login',
            name: ''
        },
        {
            name: 'Login',
            path: '/login',
            component: () => import('../views/login/index.vue')
        },
        {
            name: 'Admin',
            path: '/',
            component: HydLayoutWrap,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

// router.beforeEach(async (to, from, next) => {
//     const userInfoStore = useUserInfoStore()
//     const appStore = useAppStore()
//     const routesStore = useRoutesStore()
//     NProgress.start()
//     if (userInfoStore.isLogin) {
//         if (to.path === appStore.loginRoutePath) {
//             next({ path: appStore.defaultRoutePath })
//             NProgress.done()
//             return
//         }
//
//         if (size(routesStore.asyncRouteRecordRaws) === 0) {
//             try {
//                 await routesStore.generateRoutes().then(() => {
//                     forEach(routesStore.asyncRouteRecordRaws, route => {
//                         router.addRoute('Admin', route)
//                     })
//                     router.addRoute({
//                         path: '/:pathMatch(.*)*',
//                         name: 'notFound',
//                         component: () => import('../views/login/404.vue')
//                     })
//                     const redirect = decodeURIComponent(<string>from.query.redirect || to.path)
//                     if (to.path === redirect) {
//                         next({ ...to, replace: true })
//                     } else {
//                         delete from.query.redirect
//                         next({ path: redirect, query: { ...from.query } })
//                     }
//                 })
//             } catch (e) {
//                 console.error(e)
//             }
//         } else {
//             next()
//         }
//     } else {
//         if (size(to.matched) > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
//             next()
//         } else {
//             next({
//                 path: appStore.loginRoutePath,
//                 query: { redirect: to.path, ...to.query }
//             })
//         }
//     }
//     NProgress.done()
// })
//
// router.beforeEach(to => {
//     setRouteEmitter(to)
// })
export default router