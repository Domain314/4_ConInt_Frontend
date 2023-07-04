import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import TodoList from './components/TodoList.vue'

const routes = [
    { path: '/', redirect: '/todos' },
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegisterForm },
    { path: '/todos', component: TodoList }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
