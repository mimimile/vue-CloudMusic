import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Playlist from '@/views/Playlist'
import Player from '@/views/Player'
import User from '@/views/User'
import notFound from '@/views/NotFound'

const basePath = '/client'
const resolve = (path = '') => `${basePath}/${path}`

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: resolve('app'),
      name: 'app',
      component: Home
    },
    {
      path: resolve('playlist'),
      name: 'playlist',
      component: Playlist
    },
    {
      path: resolve('user'),
      name: 'user',
      component: User
    },
    {
      path: resolve('player'),
      name: 'player',
      component: Player
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
