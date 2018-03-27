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
      <div class="playlist-li" >

      </div>
    </div>
  </div>
</template>

<script>
import { fetchPlaylist } from '@/api/home'
import fecha from 'fecha'

export default {
  name: 'hot-playlist',
  data () {
    return {
      list: [],
      updateTime: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { playlist } = await fetchPlaylist({ idx: 1 })
      const { updateTime } = playlist
      this.updateTime = fecha.format(new Date(updateTime), 'MM月DD日')
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
}
</style>
