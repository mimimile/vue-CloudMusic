<template>
  <div class="m-song_newfst" :style="{
    height: `${playerHeight}px`
  }">
    <span class="m-logo"></span>
    <div class="m-song-wrap">
      <div class="m-song-disc">
        <div class="m-song-turn">
          <div class="m-song-rollwrap">
            <div class="m-song-img" :class="{
              'z-play': isPlaying,
              'z-pause': !isPlaying
            }">
              <img class="u-img" :src="img" alt="">
            </div>
          </div>
          <div class="m-song-lgour">
            <div class="m-song-light" :class="{
              'z-play': isPlaying,
              'z-pause': !isPlaying
            }">
            </div>
          </div>
        </div>
        <span v-show="status !== playerStatus.playing" class="m-song-plybtn"></span>
      </div>
      <div class="m-song-clickarea" @click="playerCrl"></div>
    </div>
    <div class="m-song-info">
      <h2 class="m-song-h2">
        <span class="m-song-sname">{{name}}</span>
        <span class="m-song-gap">-</span>
        <b class="m-song-autr">{{autr}}</b>
      </h2>
      <div class="m-song-lrc f-pr">
        <div class="m-song-scroll" style="height: 88px;" ref="scroll">
          <div class="m-song-iner">
            <p class="m-song-lritem j-lritem" v-for="(item, index) in lyricList" :key="index" ref="lrc">{{item.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler'
import BScroll from 'better-scroll'
import Enum from 'enum'
import LRC from 'lrc.js'
import Lyric from '@/modules/lyric'
import Loader from '@/components/Loaders'

const playerStatus = new Enum(['default', 'loading', 'loaded', 'playing', 'pause', 'end'])

export default {
  name: 'm-player',
  props: [ 'data', 'lyric', 'url' ],
  data () {
    return {
      img: null,
      status: playerStatus.default,
      scroll: null,
      currentLrc: null,
      playerStatus,
      player: null,
      loader: null
    }
  },
  computed: {
    playerHeight () {
      const windowHeight = document.body.clientHeight
      return windowHeight - 60
    },
    isPlaying () {
      return this.status === playerStatus.playing
    },
    name () {
      return this.data.name || ''
    },
    autr () {
      const arList = this.data.ar
      let result = ''
      if (arList.length === 1) return arList[0].name
      arList.forEach((item, index) => {
        if (index === 0) {
          result = item.name
        } else {
          result += `/${item.name}`
        }
      })
      return result
    },
    lyricList () {
      if (!this.lyric) return []
      const { lines } = LRC.parse(this.lyric)
      return lines.map((item) => {
        return {
          text: item.text,
          time: item.time * 1000}
      })
    }
  },
  created () {
    this.img = this.data.al.picUrl
  },
  mounted () {
    const scroll = this.$refs['scroll']
    this.scroll = new BScroll(scroll)
    this.currentLrc = new Lyric(this.lyricList, this.handleLyric)
    this.playerInit()
  },
  beforeDestroy () {
    if (this.player) {
      this.loader.finish()
      this.player.unload()
    }
  },
  methods: {
    playerInit () {
      if (this.player) return
      this.loader = Loader({
        type: 'ball-grid-pulse'
      })
      this.status = playerStatus.loading
      this.player = new Howl({
        src: [ this.url ],
        // src: [ 'http://m10.music.126.net/20180608175953/350ad87e480ec451579f81c0600d69e3/ymusic/390a/819f/4ed5/9ca3ad0b2d6a3ab2249e043b8a7909cf.mp3' ],
        // autoplay: true,
        onload: () => {
          this.loader.finish()
          this.status = playerStatus.loaded
        },
        onloaderror: () => {
          alert(1)
        },
        onplayerror: () => {
          alert(2)
        },
        onplay: () => {
          this.currentLrc.togglePlay()
          this.status = playerStatus.playing
        },
        onpause: () => {
          this.currentLrc.togglePlay()
          this.status = playerStatus.pause
        },
        onend: () => {
          this.currentLrc.togglePlay()
          this.status = playerStatus.end
        }
      })
    },
    handleLyric ({ text, lineNum }) {
      if (lineNum !== 0) this.$refs.lrc[lineNum - 1].style.color = ''
      this.scroll.scrollToElement(this.$refs.lrc[lineNum], 200, 0, -24)
      this.$refs.lrc[lineNum].style.color = '#fff'
    },
    playerCrl () {
      switch (this.status) {
        case playerStatus.default:
          this.play()
          break
        case playerStatus.pause:
          this.play()
          break
        case playerStatus.playing:
          this.pause()
          break
        case playerStatus.loading:
          break
        case playerStatus.loaded:
          this.play()
          break
        case playerStatus.end:
          this.play()
          break
        default:
      }
    },
    play () {
      console.log('play')
      this.player.play()
    },
    pause () {
      console.log('pause')
      this.player.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.m-song-wrap {
  padding-top: 63px;
}

.m-song-disc {
  position: relative;
  width: 248px;
  height: 248px;
  margin: 0 auto;
}

.m-song-scroll {
  line-height: 1.5;
  font-size: 13px;
  height: 72px;
  overflow: hidden;
}

.m-song-lremp, .m-song-scroll {
  text-align: center;
  color: hsla(0,0%,100%,.6);
}

.m-song-lritem {
  padding-bottom: 5px;
}

.m-song-lrc {
  position: relative;
  margin-top: 14px;
}

.m-song-autr {
  font-size: 13px;
  color: hsla(0,0%,100%,.6);
}

.m-song-gap {
  margin: 0 4px;
}

@media screen and (min-width: 375px) {
  .m-song-lremp {
    font-size:14px
  }

  .m-song-scroll {
    font-size: 16px
  }

  .m-song-lritem {
    padding-bottom: 8px
  }

  .m-song-lrtrans .m-song-lritem {
    padding-bottom: 6px
  }

  .m-song-lrori {
    font-size: 16px
  }

  .m-song-h2 {
    font-size: 18px
  }

  .m-song-autr,.m-song-pure {
    font-size: 16px
  }
}

@media screen and (min-width: 414px) {
  .m-song-info {
    margin-top:15px
  }

  .m-song-lrc {
    margin-top: 6px
  }
}

@media screen and (min-height: 672px) {
  .m-song-info {
    margin-top:25px
  }

  .m-song-lrc {
    margin-top: 14px
  }
}

@media screen and (max-height: 520px) {
  .m-song-info {
    margin-top:15px
  }
}

@media screen and (max-height: 480px) {
  .m-song-info {
    margin-top:10px
  }

  .m-song-lrc {
    margin-top: 6px
  }
}

.m-song-h2 {
  text-align: center;
  font-size: 15px;
  line-height: 1.1;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.m-song-info {
  padding: 0 35px;
  margin-top: 25px;
}

.m-song-clickarea {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 12px;
  z-index: 10;
}

.m-song-light {
  background: url(//s3.music.126.net/m/s/img/disc_light.png?2bb24f3fd11569809b817b4988f12bc7) no-repeat;
  background-size: contain;
}

.m-song-lgour, .m-song-light {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
}

@-webkit-keyframes circling {
  0% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(1turn)
  }
}

@keyframes circling {
  0% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(1turn)
  }
}

.a-circling, .z-pause {
  animation: circling 20s infinite linear;
  animation-play-state: paused
}

.a-circling, .z-play {
  animation: circling 20s infinite linear;
}

.m-song-disc:after {
  content: " ";
  position: absolute;
  top: -63px;
  left: 107px;
  z-index: 5;
  width: 84px;
  height: 122px;
  background: url(//s3.music.126.net/m/s/img/needle.png?702cf6d95f29e2e594f53a3caab50e12) no-repeat;
  background-size: contain;
}

.m-song-plybtn:after {
  content: "";
  display: block;
  position: absolute;
}

.m-song-plybtn {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  z-index: 10;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==) 0 0 no-repeat;
  background-size: contain;
}

.m-song-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: url(//s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188) no-repeat;
  background-size: contain;
}

.m-song-rollwrap {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin: -75px 0 0 -75px;
}

.m-song-turn:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background: url(//s3.music.126.net/m/s/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f) no-repeat;
  background-size: contain;
}

.m-song-turn {
  width: 100%;
  height: 100%;
}

.m-logo {
  position: absolute;
  top: 12px;
  left: 10px;
  display: block;
  width: 100px;
  height: 17px;
  background: url(//s3.music.126.net/m/s/img/logo.png?0c21b75…) no-repeat;
  background-size: 100px auto;
}

.m-song_newfst {
  position: relative;
  padding-bottom: 12px;
  box-sizing: border-box;
}

@media screen and (min-width: 360px) {
  .m-song-wrap {
    padding-top:70px
  }

  .m-song-disc {
    width: 296px;
    height: 296px
  }

  .m-song-disc:after {
    width: 96px;
    height: 137px;
    top: -70px;
    left: 133px;
    background-image: url(//s3.music.126.net/m/s/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862)
  }

  .m-song-turn:before {
    background-image: url(//s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48)
  }

  .m-song-light {
    background-image: url(//s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a2bc62e1ab3f51f135fc459577)
  }

  .m-song-rollwrap {
    width: 184px;
    height: 184px;
    margin: -92px 0 0 -92px
  }

  .m-song-plybtn {
    width: 56px;
    height: 56px
  }
}

@media screen and (min-width: 414px) {
  .m-song-wrap {
    padding-top:80px
  }

  .m-song-disc {
    width: 342px;
    height: 342px
  }

  .m-song-disc:after {
    width: 110px;
    height: 157px;
    top: -80px;
    left: 150px;
    background-image: url(//s3.music.126.net/m/s/img/needle-plus.png?994aa910ce3e4d242eb7076620b0e502)
  }

  .m-song-turn:before {
    background-image: url(//s3.music.126.net/m/s/img/disc-plus.png?b700b62e1971b351dcb8b8ce1c9ceea3)
  }

  .m-song-light {
    background-image: url(//s3.music.126.net/m/s/img/disc_light-plus.png?4392c8c9a8a33d4b2b2c33d3995503c9)
  }

  .m-song-rollwrap {
    width: 212px;
    height: 212px;
    margin: -106px 0 0 -106px
  }

  .m-song-plybtn {
    width: 65px;
    height: 65px;
    background-image: url(//s3.music.126.net/m/s/img/play_btn_3x.png?4da7e135b7c089f3777ec5cdbbb3a8d8)
  }
}
</style>
