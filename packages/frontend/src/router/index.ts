import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/Home.vue'
import AboutView from '@/views/About.vue'
import Generate from '@/views/Generate.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/generate', component: Generate },
  { path: '/about', component: AboutView },
  { path: '/login', component: Login },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

router.beforeEach((to, _from, next) => {
  const allowCodeVerified = localStorage.getItem('allowCodeVerified');
  if (to.path !== '/login' && allowCodeVerified !== 'true') {
    next('/login');
  } else {
    next();
  }
});