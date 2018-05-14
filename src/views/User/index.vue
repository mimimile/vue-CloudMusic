<template>
  <div class="user" v-if="profile">
    <section class="user__header">
      <div class="usrhd_wrap"
        :style="{
          backgroundImage: `url(${profile.backgroundUrl})`
        }">
        <div class="usrhd_in">
          <div class="usrhd_top">
            <div class="usrhd_num usrhd_tfl">
              <p class="usrhd_t1">{{listenSongs}}</p>
              <p class="usrhd_t2">听歌数</p>
            </div>
            <div class="usrhd_avatar">
              <img class="u-img" :src="profile.avatarUrl" alt="">
            </div>
            <div class="usrhd_num usrhd_tfr">
              <p class="usrhd_t1">{{profile.followeds}}</p>
              <p class="usrhd_t2">粉丝数</p>
            </div>
          </div>
          <div class="usrhd_info">
            <div class="usrhd_name">
              <h1 class="f-thide">
                {{profile.nickname}}
              </h1>
              <div class="usrhd_icns">
                <m-svg :sex="profile.gender === 1 ? 'man' : 'women'"></m-svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchUserDetail, fetchUserPlaylist } from '@/api/user'
import MSvg from './components/Svg'

export default {
  name: 'user',
  components: {
    MSvg
  },
  data () {
    return {
      uid: null,
      profile: null,
      listenSongs: null
    }
  },
  async created () {
    this.uid = this.$route.query.uid
    await this.getUserDetail()
  },
  methods: {
    async getUserDetail () {
      const { profile, listenSongs } = await fetchUserDetail({ uid: this.uid })
      const { playlist } = await fetchUserPlaylist({ uid: this.uid })
      console.log('profile', profile)
      console.log('playlist', playlist)
      this.profile = profile
      this.listenSongs = listenSongs
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.usrhd_icns {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  padding-right: 1px;
}

.usrhd_name {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
  & h1 {
    margin-top: 9px;
    font-size: 17px;
  }
}

.usrhd_icns, .usrhd_name {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.usrhd_info {
  width: 100%;
  padding: 0 9.7%;
  box-sizing: border-box;
}

.u-img {
  width: 100%;
  vertical-align: middle;
  border-radius: 50%;
}

.usrhd_avatar {
  width: 80px;
  height: 80px;
  position: relative;
}

.usrhd_num {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  height: 80px;
  padding-top: 20px;
  text-align: center;
  box-sizing: border-box;
}

.usrhd_t2 {
  margin-top: 1px;
  font-size: 12px;
  color: hsla(0,0%,100%,.6);
}

.usrhd_t1 {
  font-size: 17px;
  color: #fff;
  min-height: 20px;
}

.usrhd_top {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.usrhd_in {
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 2;
  width: 100%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.usrhd_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: 50%;
  background-size: cover;
}

.usrhd_wrap:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAMhCAYAAAGI8zHRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUMzOTg5M0NFQ0YwNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQzI4RDIzRkNCNjUxMUU2OUM2REIwNjMzMUNEOURENCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQzI4RDIzRUNCNjUxMUU2OUM2REIwNjMzMUNEOURENCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YWFkODQ2ZTUtOTVlZC0zZjQ0LWI2YzYtZTljM2I3NTExMzA1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6Zjk5NjliNzAtMDcwZS0xMTdhLTg1NjgtY2YzNDBkZTU1ZWVmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5YiX/wAAA8NJREFUeNpiZGBgOMCABFiA+B/pAn9JV0ENLWQY+ocWtlBD4M8g8f6/gVFBDYH/pKlgYkADI0sAFB6MpAsw0ULFoBVgpoIKmhhKE2sHrQBKCgIIIMbRSmu00hqttEYrrdFKa7TSGiqVFkAAgTj7GfAAjKxPloK/Q8GKP7S34u8gUPCH9r74MyzCYXhENx3yxZDI/v9p74Z/tHUDEwMBMKpgOCnAqKvJMoGJIiuoYwLlVjANAm8y096Rw8OK0ZActWIwZX+AAOxYQQrAMAgD//9mXe+DbWQdJi69Bk1UVOzpY+7xWqYEc46ghFbbLWey5VZLULK5LSm1gyzdZXJdVkyhvBvjxcZZDWprBtgRZ8DHs0GDBjeAl+ffR25xTtxtB2dHKB0gfvzjlnrpC6n0/aVkYUFqxfY0YZsmXnTrHQKwawc5AIIwEEWD97+y6BFIMAiTPvc/bacDadXhjzrTw9ToGX6XXhr52Qb3zLQr1twJllIzh9VQu/O2tJfCN4c5z9QmmPGRYAevwMFph7bK/vwXHPxiKdCeoZfBp7TBYDAYDAYvmwyayAmR98EVaw4W7NLnFHhfq0Rmz0O9TW1qq9ntyWHU5m0wuBU7GKGL6CsAO/eSAyAIAwE03P/O4I6lcUUc5h1g0s6nRYPx9WczXyoHXrOF3j8HX+SuMp+pbZ61bfXutqeEpVRmlbZxNpJCIiR8FhIhaVLbVPHZJiGYw51VBsPelm1ryFT9dKq0HdW2WyM+qyzblSHxxRLOt7btebvDKmBgYGBgYGBgYGBgYGDg4y/fg2DXC9bos5/M8ZnaBKsVjNoEw5lgOONMMJzjOcs2n1UmmB3GZ8eN48YToGyrLNuybW+rLCQ442yehYTa5YI9ArR3R7cBhEAMRBH91wwUsUJG7EsDI4+9d5efpPTH+Ku+dgI8R+gnBo6p7texxO74quqlY+ekY3dMNdVU+/TxdqKaaqp17O2kY6um2rOaaqqp1rFPH+MyLh3r2APEqiX226I7tmrjAtYx1R4gwDqm2gPEuKyaaqqpptprUcfOyTk9kNiqnRPVVFMtsXFRTbXEPm/dsXEZl449qyWmWscSAzsn5wQMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDJwCl/5pItXAxuWcgI1LYomplti4mnZsXMZlXBJTrWMd65hqq7ZqHetYx1QbF9USS0y1joE9uSR2TlRLLDGwby4dU021xFRT7bWoY6qplphqiSV2TsZlXL6rdaxjHVMtscQSS0y1jnUsscRUS/xP4gPCMwFN4MxUIAAAAABJRU5ErkJggg==) repeat-x;
  background-size: contain;
}

@include b(user) {
  @include e(header) {
    position: relative;
    width: 100%;
    padding-bottom: 64.49%;
    line-height: 1.2;
  }
}
</style>
