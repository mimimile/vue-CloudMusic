<template>
  <div v-if="data" class="playlist">
    <section class="u-plhead pylst__header">
      <div class="plhead_bg"
        :style="{
          backgroundImage: `url(${plheadBg})`
        }">
      </div>
      <div class="plhead__wrap">
        <div class="plhead_fl lsthd_fl">
          <img class="u-img" :src="plheadBg" alt="">
          <span class="lsthd_icon">歌单</span>
          <i class="u-earp lsthd_num">{{playCount}}</i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { addChineseUnit } from '@/utils'
import { fetchPlaylist } from '@/api/playlist'

export default {
  name: 'playlist',
  data () {
    return {
      id: null,
      bgImg: null,
      data: null
    }
  },
  computed: {
    plheadBg () {
      return this.bgImg
    },
    playCount () {
      return addChineseUnit(this.data.playCount)
    }
  },
  async created () {
    this.id = this.$route.query.id
    const { result } = await fetchPlaylist({ id: this.id })
    console.log('result', result)
    this.data = result
    this.bgImg = result.coverImgUrl
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.plhead_fl {
  position: relative;
  width: 114px;
  height: 114px;
  background-color: #e2e2e3;
}

.lsthd_num {
  position: absolute;
  right: 2px;
  top: 0;
  z-index: 3;
  padding-left: 15px;
  color: #fff;
  font-size: 12px;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 11px 10px;
  text-shadow: 1px 0 0 rgba(0,0,0,.15);
}

.lsthd_fl::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 18px;
  z-index: 2;
  background-image: -webkit-linear-gradient(left,transparent,rgba(0,0,0,.2));
  background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2));
}

.lsthd_icon {
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 0;
  padding: 0 8px;
  height: 17px;
  color: #fff;
  font-size: 9px;
  text-align: center;
  line-height: 17px;
  background-color: rgba(217,48,48,.8);
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
}

.u-img {
  width: 100%;
  vertical-align: middle;
}

.playlist {
  background-color: #f8f8f8;
  min-height: 100%;
}

.plhead_bg, .plhead_bg::after{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.plhead_bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  -webkit-filter: blur(20px);
  filter: blur(20px);
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  &::after {
    content: " ";
    background-color: rgba(0,0,0,.25);
  }
}

@include b(plhead) {
  @include e(wrap) {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: relative;
    z-index: 2;
  }
}

@media screen and (min-width: 360px) {
  .u-plhead .plhead_fl {
      width:126px;
      height: 126px
  }
}

@media screen and (min-width: 414px) {
  .u-plhead .plhead_fl {
      width:145px;
      height: 145px
  }
}

@media screen and (min-width: 768px) {
  .u-plhead .plhead_fl {
      width:200px;
      height: 200px
  }
}
</style>
