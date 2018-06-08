<template>
  <div class="m-newsong">
    <div v-if="song" class="m-song-bg" :style="{
      backgroundImage: `url(${bgImg})`,
      opacity: 1
    }">
    </div>
    <div class="m-scroll_wrapper m-song_nor j-songsrl">
      <div class="m-scroll_scroller m-scroll_scroller_vertical">
        <m-player v-if="isFinish" :data="song" :lyric="lyric" :url="url"></m-player>
      </div>
      <div class="m-giude" style="bottom: -14px;">
        <i class="arr ani"></i>
      </div>
    </div>
    <div class="m-footer">
      <div class="footer-wrap">
        <span class="u-btn u-btn-block u-btn-red" @click="toGitHub">项目地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import MPlayer from './components/player'
import { fetchMusicDetail, fetchLyric, fetchMusicUrl } from '@/api/player'

export default {
  name: 'player',
  components: {
    MPlayer
  },
  data () {
    const prefix = process.env.OSS_PREFIX
    return {
      song: null,
      lyric: null,
      url: null,
      prefix
    }
  },
  computed: {
    bgImg: {
      get () {
        const pic = this.song ? this.song.al.pic || this.song.al.pic_str : ''
        return `${this.prefix}/blur/${pic}`
      },
      set (pic) {
        return `${this.prefix}/blur/${pic}`
      }
    },
    id () {
      return this.$route.query.id
    },
    isFinish () {
      if (this.lyric && this.song && this.url) return true
      return false
    }
  },
  async created () {
    await this.getSongData()
    await this.getLyric()
    await this.getMusicUrl()
  },
  methods: {
    toGitHub () {
      location.href = process.env.GIT_URL
    },
    async getMusicUrl () {
      const id = this.id
      const { data } = await fetchMusicUrl({ id })
      this.url = data ? data[0].url : ''
    },
    async getSongData () {
      const ids = this.id
      const { songs } = await fetchMusicDetail({ ids })
      this.song = songs[0]
      const pic = this.song ? this.song.al.pic || this.song.al.pic_str : ''
      this.bgImg = pic
    },
    async getLyric () {
      const id = this.id
      const { lrc: { lyric } } = await fetchLyric({ id })
      this.lyric = lyric
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.u-btn {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 6px;
  border: 1px solid #adadad;
  border-radius: 40px;
  font-size: 18px;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
}

.u-btn-block {
  display: block;
  width: 100%;
}

.u-btn-red {
  color: #fff;
  background-color: #d33a31;
  border-color: #d33a31;
}

.u-btn {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-left: 10px;
}

.footer-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0 10px;
  margin: 0 auto;
}

.m-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 20;
}

.arr {
  display: block;
  width: 17px;
  height: 12px;
  background-repeat: no-repeat;
  background-size: 17px auto;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAADACAYAAABhy7FLAAAHtElEQVR4nO2c6Y8cxRnGf+8e3gvbrNY2lh0nJpxBgANJlAQCJCCIIAmXgCAkEEJCAgHhE39FPiUkSqJISRQkcoAI5MACxH0kiJhbHAZjc1k+sPCuvYd3Z6f48HTH1TUzPdO9PSga1fNlV69qup9+q97n6aqubnPOURITwE3AJuBl4DfAvjIHMjOsJJHvAzcAo15sBvgd8NDnQWQtcBtwak6bV4E7gV3dINIH/Ai4Fhjy4gvAU8DZwKAXPwTcBfwDqFdFZAPwE+DEIP4G8DNgJ7AOuB04KWjzFvBz4MOlEOkHrgCuBga8+BzwB+BBwP+xARcB1wPDXrwG/Bm4F1gsSuQYdIVHB/GXgF8Ae1qxB9YAtwKnBfHtKIPbOiEyCFwDXI7GRYpp4LfAozkEQpwH3AiMebE6cB9wNxpfTYl8BY2FLwQH/DfwK+DTAiRSjAM3A98O4h+hsfOmT2QYuA74IernFPuBXwPPliAQ4kwkfkd6MQf8E/ijmc2Zc+6nNFbE46grDuQcfCVwGXAcsBW4H5jMab8cddX3gvhbZnaHOed+D6xKgp8AvwT+m3NAgG8iXfGrYw7pxvNtfvt14BbvnHvN7AZzzq1FA3QfcA+S6laYAK4Ejs1p825ynDzfGU2OMwHcbWa7iijrd4ALySpoDRneV8lqzQKwGXiGCpX1KOAq4EtBfDvwV2AvsDppE+rO+0mb3Ush0o8G1vnJ/ynmgX8Bz9GorGcAPwCWefFF4BFUAIWVdT3wY+QhPrai/s/TlHHU/8cH8Z3AX4CPOyEyAFwAfJesss4CfwdeyCEQ4hvAxcCIF6sDTwAPo/HVlMhGlIXVwQFfA/4GTBUgkWIF0ppTgvhelJ0dPpEhVA1nklXWgwmBV0oQCLEpIXSEF3NItTeb2SFzzt1GY0VsAR4gX1OKYhS4BPhaEH/fzO4cIKv/k+i+4c0KCaSYAf6EdOcKZBGkf805N4EG6CTwGJLqbmMYODch8bCZ7St7F18pzCwjy0VR1H3zyZTMyFLct5FEiXlNVe5bmkh0X4juK0T37Qn3HUPk16N+fxZNTVuhK+57IvAtDlfHRjSw/4OWIpqhUvddgRZlwmrysRMt3uSNqdLua8DJqBJ8BV1EywzHkNWaGqqw18lqTfODd6is48A5aN3Dxy7gSZTJlUmbtUGbPUmb3JWEdkT6kIecTlZTashh36BRWU9CzuxnrQ68iMZGU9/JI7IKXeFEEP8I9f/BVuxRiZ5N4zrLPpSdTzoh0o/KaxNZTZlH3rI1h0CI45H3+L7jkC5twfOdkMja5Er8cgap3zOUu6MfRbcPG4P4fpTZXT6RQVQNJweNZ5FIvVeCQIgvI/EbCeKvAy+Y2YI55y6lsSLeQWtnVd7RD6O1tOOC+B4zu3+A7KrfNPA08EGFBFLMoXuSbcBZ3nlHQcq6Ag3QaVRi810gEWIZkoYxYIuZTfXEvKao++aTKZmR0H1BXZrnvq1JlJjXVOW+pYlE94XovkJ0355w3yHkpOOoKt5Bj1lboSvuu46sdqxKCG1DgtYMlbrvCHACjePIx37gbdS1rVDafQ2V49FkNaWORGtNk/h2VO6VKesYysKKID6JrnwGpfcEDk8jU0wlbXJduRNl3YBKz9eURVRJO2lU1nWoQnzfcUgCPqSEsi5HV3hEEP8UXWFeNQ0nvx0P4geT3zY8OW1GpA9lYAPZLNTQsmXHWzGQQB5L1nccyswOvOyERFYmV+JvTgF5QzuNaIVUa1YF8RmUnUmfSD/q1/VB44WEQN6GhE6xJiE0GMQ/Bt4zs0Vzzp1OY0XsRl2xQHUYRF11VBCfMrMXB8jukDmEHLbUpqU2WEArUXuQM6fnHQIp6wgaoIeQtNcaj1E5BoAvJiR2mNlsT8xrirpvPpmSGQndFw7f0bdy39YkSsxrqnLf0kSi+0J0XyG6b0+4bz/K4hDK1iQtHh4m6Ir7jiXk03E0nBxnitalWqn7pg+aluW0mUfq2u44pdzXUBaWk60mkJSHc1qHynSaCpV1EGUhHGj+lbfK1ELSJvdOrx0RQ4K2PIg7NBZmaFTWUbJjJ8UBJGhNT5ZHZBApY3i/klZHu/5Pq8lHDSlzQ3aaETGUgVDaXUKgyGLNaEIozM5BlKH/nTgksgz1c5iFOdprRCukWjMcxGto7Mz7RPpQFsaCxvWEQMc3ODkYSQj1BfFp4ICZ1c05t5rGiphNSLTdhFIAfQmZsNQXzGzvANl7hzpKWTe2gNXRYJ1FQyDNTh9IWQdQ1yyigVRlFlqhDxVEP+qaWk/Ma4q6bz6ZkhkJ3RcOK27hh0dl5jVVuW9pItF9IbpvEiO6bw+4b9EVo1z3TV9rSZl26r5LWTEaJuu+i2a2u6j7VrViVNp944oRxBUjIa4Y9cSKUVHE5zV5iM9r2pOJz2tKEonuC9F9hei+PeG+RXf4dsV9y7xfU6n7VrXDd0nPa+IO37jDF+IO3x7Z4VsU8f2aPMT3a9qTie/XlCQS3Rei+wrRfXvCfYt+kaUr7ht+keWU5AR5X2Sp1H2r+iJLafeNX2SB+EUWIX6RpSe+yFIU8XtoeejN76HFeQ3EeY0Q5zUQ5zVCnNfEeQ1xXtMGcV5ThEic10Cc18R5zf/5vOZzOGdn+Awy41HF8ePswwAAAABJRU5ErkJggg==);
  background-position: 0 0;
}

.ani {
  animation: shining 1.2s steps(1) infinite;
}

.m-giude {
  position: absolute;
  left: 0;
  right: 0;
}

.m-giude {
  height: 36px;
  padding-top: 10px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

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
