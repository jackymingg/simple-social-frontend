import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import PostListPage from '../pages/PostListPage.vue'
import CreatePostPage from '../pages/CreatePostPage.vue'
import EditPostPage from '../pages/EditPostPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/posts',
    component: PostListPage 
  },
  { 
    path: '/create-post', 
    component: CreatePostPage 
  },
  { 
    path: '/edit-post/:id',
    component: EditPostPage 
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



