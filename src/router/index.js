import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/home'
import Playlist from '@/views/Playlist/playlist'
import notFound from '@/views/NotFound/notFound'

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
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
