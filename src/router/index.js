import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/chat' },
    { path: '/chat', component: ChatView },
    {
      path: '/settings',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
