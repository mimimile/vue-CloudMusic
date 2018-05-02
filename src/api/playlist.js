import request from '@/modules/request'

export function fetchPlaylist (query) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: query
  })
}

export function fetchCmt (query) {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params: query
  })
}
