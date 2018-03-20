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
