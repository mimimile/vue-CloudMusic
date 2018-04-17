<template>
  <router-link class="recommend-cell"
    :to="{
      name: 'playlist',
      query: {
        id: data.id
      }
    }">
    <div class="recommend-cell__img">
      <img :src="data.picUrl" alt="">
      <span class="u-earp recommend-cell__lnum">{{playCount}}</span>
    </div>
    <p class="recommend-cell__text">{{data.name}}</p>
  </router-link>
</template>

<script>
import { addChineseUnit } from '@/utils'

export default {
  name: 'recommend-cell',
  props: {
    data: Object
  },
  computed: {
    playCount () {
      return addChineseUnit(this.data.playCount)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

@include b(recommend-cell) {
  @include e(img) {
    position: relative;
    padding-bottom: 100%;
    & > img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      vertical-align: middle;
    }
  }
  @include e(lnum) {
    position: absolute;
    right: 5px;
    top: 2px;
    z-index: 3;
    padding-left: 13px;
    color: #fff;
    font-size: 12px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 11px 10px;
    text-shadow: 1px 0 0 rgba(0,0,0,.15);
  }
  @include e(text) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    line-height: 1.2;
    font-size: 13px;
  }
}
</style>
