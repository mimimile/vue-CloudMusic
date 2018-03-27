<template>
  <router-link
    :to="{
      name: 'music',
      query: {
        id: data.id
      }
    }">
    <div class="sgfr f-bd f-bd-btm">
      <div class="sgchfl">
        <div class="f-thide sgtl">
          {{data.song.name}}
          <span v-if="data.song.alias !== []" class="sgalia">
            {{data.song.alias[0]}}
          </span>
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
  name: 'sglist-cell',
  props: {
    data: Object
  },
  computed: {
    sginfo () {
      const song = this.data.song
      if (!song.album && song.album.artists.length === 0) return '无'
      let data = ''
      const list = song.album.artists
      for (let i = 0; i < list.length; i++) {
        if (i === 0) {
          data += `${list[i].name} `
          continue
        }
        data += `/ ${list[i].name} `
      }
      return `${data} - ${song.album.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.sgchfl {
  padding: 6px 0;
  width: 0;
}
.sgchfr {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 10px;
}
.u-hmsprt {
  background: url(https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880) no-repeat;
  background-size: 166px 97px;
}
.sgchply {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-position: -24px 0;
}
.sgtl {
  font-size: 17px;
}
.sgfr {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
}
.f-bd {
  position: relative;
}
.sgalia {
  color: #888;
  margin-left: 4px;
}
.sginfo {
  font-size: 12px;
  color: #888;
}
.f-bd-btm:after {
  border-color: hsla(0,0%,100%,.1);
}
.f-bd-btm:after {
  border-bottom-width: 1px;
}
.f-bd:after {
  position: absolute;
  z-index: 2;
  content: "";
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  -webkit-transform-origin: top left;
  transform-origin: top left;
  border: 0 solid rgba(0,0,0,.1);
}
</style>
