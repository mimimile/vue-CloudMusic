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
        <div class="plhead_fr">
          <h2 class="f-thide2 f-brk lsthd_title">{{data.name}}</h2>
          <div class="lsthd_auth f-thide">
            <router-link :to="{
              name: 'music',
              query: {
                id: data.id
              }
            }">
              <div class="lsthd_link">
                <div class="u-avatar lsthd_ava">
                  <img class="u-img" :src="creator.avatarUrl" alt="">
                </div>
                {{creator.nickname}}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="pylst_intro">
      <div class="lstit_tags">
        标签:
        <em class="f-bd f-bd-full lstit_tag" v-for="(tag, index) in tags" :key="index">{{tag}}</em>
      </div>
      <div class="u-intro">
        <div class="f-brk" :class="{
          'f-thide3': introIsHiden
        }">
          <span v-for="(text, index) in description" :key="index">
            <i>{{index === 0 ? '简介：' : ''}}{{text}}</i>
            <br>
          </span>
        </div>
        <span class="intro_arrow" :class="{
          'u-arowup': !introIsHiden,
          'u-arowdown': introIsHiden
        }"
        @click="introHiden"></span>
      </div>
    </section>
    <div class="pylst_list">
      <h3 class="u-smtitle">歌曲列表</h3>
      <ol class="u-songs">
        <li class="u-song" v-for="(song, index) in songs" :key="index">
          <list-cell :data="song" :id="index+1"></list-cell>
        </li>
      </ol>
    </div>
    <div class="m-talk">
      <div class="m-comments">
        <h4 class="cmt_title">
          精彩评论
        </h4>
        <div class="cmt_list">
          <cmt-item v-for="(hotCmt, index) in hotCmts" :key="index" :data="hotCmt"/>
        </div>
      </div>
      <div class="m-comments">
        <h4 class="cmt_title">
          最新评论({{total}})
        </h4>
        <div class="cmt_list">
          <cmt-item v-for="(cmt, index) in cmts" :key="index" :data="cmt"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addChineseUnit } from '@/utils'
import { fetchPlaylist, fetchCmt } from '@/api/playlist'

import ListCell from './components/Cell'
import CmtItem from './components/CmtItem'

export default {
  name: 'playlist',
  components: {
    ListCell,
    CmtItem
  },
  data () {
    return {
      id: null,
      bgImg: null,
      data: null,
      creator: null,
      tags: [],
      description: [],
      songs: [],
      introIsHiden: true,
      hotCmts: [],
      cmts: [],
      total: 0
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
    await this.getData()
    await this.getCmtData()
  },
  methods: {
    introHiden () {
      this.introIsHiden = !this.introIsHiden
    },
    async getData () {
      const { result } = await fetchPlaylist({ id: this.id })
      const { creator, tags, description, tracks } = result
      this.data = result
      this.creator = creator
      this.bgImg = result.coverImgUrl
      this.tags = tags
      this.description = description.split('\n')
      this.songs = tracks
    },
    async getCmtData () {
      const { hotComments, comments, total } = await fetchCmt({ id: this.id })
      this.hotCmts = hotComments
      this.cmts = comments
      this.total = total
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.cmt_title {
  margin: 0;
  padding: 4px 10px;
  color: #666;
  font-size: 12px;
  font-weight: 400;
  background: rgba(0,0,0,.05);
}

.m-comments {
  word-wrap: break-word;
  word-break: break-all;
}

.m-comments {
  word-break: break-all!important;
  word-break: break-word!important;
}

.u-song {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.u-smtitle {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}

.u-arowup {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAlElEQVR4AY2ShQ1CMRBA33efgSgD4B/3aPdfhwsO1Vdvz1OMZCwYExNIzhYlbUocJr5DybjKPPOrFHfxLRndXWVO7Bbfo9iQIdBykdOCBAslBxRrMgS/yl2cFRnfNHeVnkQXP97FU/6pOcvL8vel4nS/NEdbc/oxdr/Q3eoGV2Qvl3piusrxWRCPuJ4lg+BfU7JneAOq9xL9utncPAAAAABJRU5ErkJggg==);
}

.u-arowdown {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAkElEQVR4AY2RtQEDMQxFX+D4RsgA6cN4XGr/cQJyEzD9yvCeZIAVWxbEJKNhDQ3CiUUE3iE0UNAjnFniS674nVQnqlw8iiHuJN/+hQRbzBluJP8tryQWfLAXy2j/61Aa3H7clOb7pJSMFtyipABUip/9T55yR2hIqZnifihRpVX8aMGtyg1BODAnMglHdnb8CYQbEwGgBxiKAAAAAElFTkSuQmCC);
}

.intro_arrow {
  position: absolute;
  bottom: 3px;
  right: 0;
  z-index: 3;
  width: 15px;
  height: 15px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 12px auto;
}

.u-intro {
  position: relative;
  padding-bottom: 18px;
  line-height: 19px;
  color: #666;
}

.lstit_tag {
  display: inline-block;
  margin-right: 10px;
  padding: 1px 8px;
  font-size: 12px;
}

.lstit_tag:after {
  border-radius: 9999px;
}

.lstit_tags {
  margin-bottom: 10px;
  line-height: 20px;
  margin-right: -10px;
}

.pylst_intro {
  position: relative;
  margin: 0 10px 0 15px;
  padding-top: 10px;
  line-height: 19px;
  color: #666;
}

.ava-icon.ava-icon-v {
  background-position: 0 0;
}

.u-avatar > .u-img {
  border-radius: 50%;
}

.u-avatar {
  position: relative;
  width: 100%;
}

.lsthd_ava {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}

.lsthd_link {
  display: inline-block;
  color: hsla(0,0%,100%,.7);
}

.lsthd_auth {
  display: block;
  position: relative;
  margin-top: 20px;
}

.lsthd_title {
  padding-top: 1px;
  font-size: 17px;
  line-height: 1.3;
  color: #fefefe;
  height: 44px;
  display: -webkit-box;
  -webkit-box-pack: center;
}

.plhead_fr {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-left: 16px;
}

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
