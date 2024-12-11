import {createWebHistory,createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login/Login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/home/home.vue')
    },
    {
        path: '/designer/:diagramId',
        name: 'designer',
        component: () => import('../views/designer/designer.vue'),
        props: true
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})