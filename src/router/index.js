import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutAnime from '../views/AboutAnime.vue'
import SearchAnime from '../views/SearchAnime.vue'
import AboutCharacter from '../views/AboutCharacter'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/:id',
    name: 'AboutAnime',
    component: AboutAnime
  },
  {
    path: '/character/:id',
    name: 'AboutCharacter',
    component: AboutCharacter
  },
  // {
  //   path: '/SearchAnime',
  //   name: 'SearchAnime',
  //   component: SearchAnime
  // },
  {
    path: '/SearchAnime',
    name: 'SearchAnime',
    component: SearchAnime,
    props: (route) => ({ text: route.query.text} )
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

