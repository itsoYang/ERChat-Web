import {createMemoryHistory,createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue')
    }
]


export const router = createRouter({
    history: createMemoryHistory(),
    routes
})