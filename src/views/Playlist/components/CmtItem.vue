<template>
  <div class="cmt_item">
    <div class="cmt_head">
      <router-link class="userphoto"
        :to="{
          name: 'music'
        }">
        <img :src="user.avatarUrl" alt="">
      </router-link>
    </div>
    <div class="cmt_wrap f-bd f-bd-btm">
      <div class="cmt_header">
        <div class="cmt_meta">
          <span class="cmt_user">
            <router-link class="nickname"
              :to="{
                name: 'music'
              }">
              {{user.nickname}}
            </router-link>
          </span>
          <div class="cmt_time">
            <span>{{time}}</span>
          </div>
        </div>
        <div class="cmt_like">
          <span class="cmt_likearea">
            {{data.likedCount}}
            <i class="cmt_likeicn">
              <like-svg></like-svg>
            </i>
          </span>
        </div>
      </div>
      <div class="cmt_content">
        <span class="cmt_text">
          {{data.content}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha'

import LikeSvg from '@/components/Svgs/like'

export default {
  name: 'cmt-item',
  components: {
    LikeSvg
  },
  data () {
    return {
      user: null
    }
  },
  props: {
    data: Object
  },
  computed: {
    time () {
      const timestamp = this.data.time
      return fecha.format(timestamp, 'HH:ss')
    }
  },
  created () {
    const { user } = this.data
    this.user = user
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.cmt_text {
  vertical-align: middle;
}

.cmt_content {
  color: #333;
  font-size: 15px;
  line-height: 22px;
  margin-top: 5px;
}

.cmt_likeicn {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  display: inline-block;
  cursor: pointer;
}

.cmt_likearea {
  padding-left: 5px;
}

.cmt_like {
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-size: 11px;
  color: #999;
  -webkit-flex: none;
  -webkit-box-flex: 0;
  flex: none;
  text-align: right;
  vertical-align: baseline;
}

.cmt_time {
  font-size: 9px;
  color: #999;
}

.cmt_user a {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  overflow: hidden;
}

.cmt_user {
  max-width: 100%;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: inline-flex;
}

.cmt_meta {
  -webkit-flex: auto;
  -webkit-box-flex: 1;
  flex: auto;
  width: 0;
  font-size: 0;
}

.cmt_header {
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  -webkit-flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
}

.cmt_wrap {
  padding-right: 10px;
  padding-bottom: 11px;
  padding-left: 10px;
  -webkit-flex: auto;
  -webkit-box-flex: 1;
  flex: auto;
  width: 0;
}

.cmt_wrap {
  padding-left: 0;
}

.userphoto img {
  display: block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

a {
  position: relative;
  display: block;
  color: #507daf;
  text-decoration: none;
}

.cmt_head {
  margin: 0 10px;
  -webkit-flex: none;
  -webkit-box-flex: 0;
  flex: none;
}

.cmt_head {
  height: 35px;
}

.cmt_item {
  padding-top: 10px;
  width: 100%;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  -webkit-flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
}
</style>
