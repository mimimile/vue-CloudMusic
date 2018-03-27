<template>
  <router-link
    class="playlist-cell"
    :to="{
      name: 'music',
      query: {
        id: data.id
      }
    }">
    <div class="sgfl sgfl-cred">
      {{index}}
    </div>
    <div class="sgfr f-bd f-bd-btm">
      <div class="sgchfl">
        <div class="f-thide sgtl">
          {{data.name}}
        </div>
        <div class="f-thide sginfo">
          {{sginfo}}
        </div>
      </div>
      <div class="sgchfr">
        <span class="u-hmsprt sgchply"></span>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'hot-playlist-cell',
  props: {
    data: Object,
    id: Number
  },
  computed: {
    index () {
      if (this.id < 10) return `0${this.id}`
      return this.id
    },
    sginfo () {
      const song = this.data
      if (!song.al && song.ar.length === 0) return '无'
      let data = ''
      const list = song.ar
      for (let i = 0; i < list.length; i++) {
        if (i === 0) {
          data += `${list[i].name} `
          continue
        }
        data += `/ ${list[i].name} `
      }
      return `${data} - ${song.al.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.sgfl-cred {
  color: #df3436;
}
.sgfl {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 28px;
  font-size: 17px;
  color: #999;
}
.sgfl {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.sgfr {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
}
.f-bd {
  position: relative;
}
@include b(playlist-cell) {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-left: 10px;
}
</style>
