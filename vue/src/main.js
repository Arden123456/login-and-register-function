import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


router.beforeEach((to,from,next) => {
    if(to.path === "/login"||to.path === "/register"){
        next()
    }else{
        if (sessionStorage.getItem('user')){
            next()
        } else {
            next("/login")
        }
    }
})


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from "element-plus/lib/locale/lang/zh-cn";

import '@/assets/css/global.css'

createApp(App).use(store).use(router).use(ElementPlus,{locale, size: 'middle'}).mount('#app')


