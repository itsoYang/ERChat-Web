import { createApp } from 'vue'
import {createPinia} from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/iconfont/iconfont.css' // 阿里矢量图
import './assets/font/font.css'
import App from './App.vue'
import {router} from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
