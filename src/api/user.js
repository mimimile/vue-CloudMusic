import request from '@/modules/request'

export function fetchUserDetail (query) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: query
  })
}

export function fetchUserPlaylist (query) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: query
  })
}
