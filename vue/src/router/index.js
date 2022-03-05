import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../Layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/user",
    children:[
      {
        path: 'user',
        name: 'User',
        component: () => import("@/views/User"),
      },
      {
        path: '/book',
        name: 'Book',
        component: () => import( '../views/Book.vue')
      },
      {
        path: '/news',
        name: 'News',
        component: () => import( '../views/News.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
