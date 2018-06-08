import request from '@/modules/request'

export function fetchMusicDetail (query) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: query
  })
}

export function fetchLyric (query) {
  return request({
    url: '/lyric',
    method: 'get',
    params: query
  })
}

export function fetchMusicUrl (query) {
  return request({
    url: '/music/url',
    method: 'get',
    params: query
  })
}
