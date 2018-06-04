import request from '@/modules/request'

export function fetchMusicDetail (query) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: query
  })
}
