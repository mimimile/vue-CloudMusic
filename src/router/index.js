import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Playlist from '@/views/Playlist'
import User from '@/views/User'
import notFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: Home
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
