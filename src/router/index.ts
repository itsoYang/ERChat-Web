import {createWebHistory,createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue')
    },
    {
        path: '/designer',
        name: 'designer',
        component: () => import('../views/designer.vue'),
        props: true
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})