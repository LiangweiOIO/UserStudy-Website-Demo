/*
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:53:59
 * @LastEditTime: 2024-07-05 01:00:38
 * @LastEditors: Liangwei Wang
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutS1View from '../views/AboutS1View.vue'
import AboutS2View from '../views/AboutS2View.vue'
import StudyTwoView from '../views/StudyTwoView.vue'
import StudyOneView from '../views/StudyOneView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/aboutS1',
      name: 'aboutS1',
      component: AboutS1View
    },
    {
      path: '/studyOne',
      name: 'studyOne',
      component: StudyOneView
    },
    {
      path: '/aboutS2',
      name: 'aboutS2',
      component: AboutS2View
    },
    {
      path: '/studyTwo',
      name: 'studyTwo',
      component: StudyTwoView
    },
  ]
})

export default router
