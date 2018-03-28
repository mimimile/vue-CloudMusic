import request from '@/utils/request'

export function fetchRecommendList () {
  return request({
    url: '/personalized',
    method: 'get'
  })
}

export function fetchSglist () {
  return request({
    url: '/personalized/newsong',
    method: 'get'
  })
}

export function fetchPlaylist (query) {
  return request({
    url: '/top/list',
    method: 'get',
    params: query
  })
}

export function searchSuggest (query) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params: query
  })
}
