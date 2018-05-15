<template>
  <div class="usrl_itm" v-if="data" @click="toList">
    <div class="f-bd f-bd-full usrl_fl">
      <img class="u-img" :src="data.coverImgUrl" alt="">
    </div>
    <div class="f-bd f-bd-btm usrl_fr">
      <h4 class="usrl_ft f-thide">
        {{data.name}}
      </h4>
      <div class="usrl_fb">
        {{data.trackCount}}首，播放{{data.playCount}}次
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'playlist-item',
  props: [ 'data' ],
  methods: {
    toList () {
      this.$router.push({
        name: 'playlist',
        query: {
          id: this.data.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.usrl_fb {
  margin-top: 5px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  color: #888;
}

.usrl_ft {
  margin-top: 6px;
  height: 20px;
  line-height: 20px;
  font-size: 17px;
  color: #333;
}

.usrl_fr {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  padding: 3px 10px 3px 0;
  height: 50px;
  overflow: hidden;
}

.usrl_fl {
  position: relative;
  top: 3px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.usrl_itm {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  padding-left: 6px;
}
</style>
