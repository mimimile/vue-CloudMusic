<template>
  <div class="m-newsong">
    <div class="m-song-bg" :style="{
      backgroundImage: `url(${bgImg})`,
      opacity: 1
    }">
    </div>
    <div class="m-scroll_wrapper m-song_nor j-songsrl">
      <div class="m-scroll_scroller m-scroll_scroller_vertical">
        <m-player v-if="song" :data="song"></m-player>
      </div>
    </div>
  </div>
</template>

<script>
import MPlayer from './components/player'
import { fetchMusicDetail } from '@/api/player'

export default {
  name: 'player',
  components: {
    MPlayer
  },
  data () {
    const prefix = process.env.OSS_PREFIX
    return {
      song: null,
      prefix
    }
  },
  computed: {
    bgImg: {
      get () {
        const pic = this.song ? this.song.al.pic : ''
        return `${this.prefix}/blur/${pic}`
      },
      set (pic) {
        return `${this.prefix}/blur/${pic}`
      }
    }
  },
  async created () {
    await this.getSongData()
  },
  methods: {
    async getSongData () {
      const ids = this.$route.query.id
      const { songs } = await fetchMusicDetail({ ids })
      this.song = songs[0]
      const pic = this.song ? this.song.al.pic : ''
      this.bgImg = pic
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.m-scroll_scroller {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
}

.m-scroll_scroller_vertical {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  width: 100%;
}

.m-scroll_wrapper {
  overflow: hidden;
}

.m-song_nor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow: hidden;
  z-index: 21;
}

.m-song-bg:after {
  position: absolute;
  left: 0;
  right: 0;
  content: " ";
  bottom: 0;
  top: 0;
  background-color: rgba(0,0,0,.5);
}

.m-song-bg {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transform-origin: center top;
  transform-origin: center top;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  // z-index: -1;
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear;
}

.m-newsong {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 320px;
  overflow: hidden;
}
</style>
