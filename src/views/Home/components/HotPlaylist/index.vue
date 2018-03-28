<template>
  <div class="hot-playlist">
    <div class="hot-playlist__head">
      <div class="hot-playlist__head--topic">
        <div class="u-hmsprt hoticon"></div>
        <div class="hottime">
          更新日期
          {{updateTime}}
        </div>
      </div>
    </div>
    <div class="hot-playlist__center">
      <div v-if="list" class="playlist-li" v-for="(item, index) in list" :key="index">
        <playlist-cell :data="item" :id="index+1"></playlist-cell>
      </div>
    </div>
    <div v-if="list" class="hot-playlist__footer">
      <span v-if="list.length !== fullList.length" @click="viewFullList">查看完整榜单</span>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha'
import { fetchPlaylist } from '@/api/home'
import PlaylistCell from './components/HotPlaylistCell'

export default {
  name: 'hot-playlist',
  components: {
    PlaylistCell
  },
  data () {
    return {
      list: null,
      updateTime: null,
      fullList: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { playlist } = await fetchPlaylist({ idx: 1 })
      const { updateTime, tracks } = playlist
      this.updateTime = fecha.format(new Date(updateTime), 'MM月DD日')
      this.list = tracks.slice(0, 20)
      this.fullList = tracks.slice(0, 99)
    },
    viewFullList () {
      this.list = this.fullList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.hot-playlist__head--topic, .hot-playlist__head:after {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.u-hmsprt {
  background: url(https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880) no-repeat;
  background-size: 166px 97px;
}

.hoticon {
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
}

.hottime {
  margin-top: 10px;
  color: hsla(0,0%,100%,.8);
  font-size: 12px;
  -webkit-transform: scale(.91);
  transform: scale(.91);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

@include b(hot-playlist) {
  @include e(head) {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background: url(https://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee) no-repeat;
    background-size: contain;
    @include m(topic) {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }
  @include e(center) {
    position: relative;
  }
  @include e(footer) {
    height: 55px;
    line-height: 55px;
    text-align: center;
    & > span {
      display: inline-block;
      color: #999;
      padding-right: 14px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAyMiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJtMSAxbDEwIDEwLTEwIDEwIi8+PC9zdmc+) 100% no-repeat;
      background-size: 7px 12px;
    }
  }
}
</style>
