import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/lesson1',
    },
    {
      path: '/lesson1',
      name: 'lesson1',
      component: () => import('../views/Lesson1Reactive.vue'),
    },
    {
      path: '/lesson2',
      name: 'lesson2',
      component: () => import('../views/Lesson2Computed.vue'),
    },
    {
      path: '/lesson3',
      name: 'lesson3',
      component: () => import('../views/Lesson3Component.vue'),
    },
    {
      path: '/lesson4',
      name: 'lesson4',
      component: () => import('../views/Lesson4Render.vue'),
    },
    {
      path: '/lesson5',
      name: 'lesson5',
      component: () => import('../views/Lesson5Form.vue'),
    },
    {
      path: '/lesson6',
      name: 'lesson6',
      component: () => import('../views/Lesson6Router.vue'),
    },
    {
      path: '/lesson6/user/:id',
      name: 'user',
      component: () => import('../views/Lesson6Router.vue'),
    },
    {
      path: '/lesson6/search',
      name: 'search',
      component: () => import('../views/Lesson6Router.vue'),
    },
    {
      path: '/lesson7',
      name: 'lesson7',
      component: () => import('../views/Lesson7Lifecycle.vue'),
    },
    {
      path: '/lesson8',
      name: 'lesson8',
      component: () => import('../views/Lesson8ClassStyle.vue'),
    },
    {
      path: '/lesson9',
      name: 'lesson9',
      component: () => import('../views/Lesson9AdvComponent.vue'),
    },
    {
      path: '/lesson10',
      name: 'lesson10',
      component: () => import('../views/Lesson10BuiltIn.vue'),
    },
    {
      path: '/lesson11',
      name: 'lesson11',
      component: () => import('../views/Lesson11Directive.vue'),
    },
    {
      path: '/lesson12',
      name: 'lesson12',
      component: () => import('../views/Lesson12Advanced.vue'),
    },
    {
      path: '/lesson13',
      name: 'lesson13',
      component: () => import('../views/Lesson13Pinia.vue'),
    },
    {
      path: '/lesson14',
      name: 'lesson14',
      component: () => import('../views/Lesson14Reactivity.vue'),
    },
    {
      path: '/lesson15',
      name: 'lesson15',
      component: () => import('../views/Lesson15Template.vue'),
    },
    {
      path: '/lesson16',
      name: 'lesson16',
      component: () => import('../views/Lesson16SFC.vue'),
    },
    {
      path: '/lesson17',
      name: 'lesson17',
      component: () => import('../views/Lesson17TypeScript.vue'),
    },
    {
      path: '/lesson18',
      name: 'lesson18',
      component: () => import('../views/Lesson18TestDeploy.vue'),
    },
    {
      path: '/lesson19',
      name: 'lesson19',
      component: () => import('../views/Lesson19SSRSecurity.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoApp.vue'),
    },
  ],
})

export default router
