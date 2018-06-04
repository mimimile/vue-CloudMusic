<template>
  <router-link
    class="list-cell"
    :to="{
      name: 'player',
      query: {
        id: data.id
      }
    }"
  >
    <div class="sgi_fl">
      {{id}}
    </div>
    <div class="sgi_fr f-bd f-bd-btm">
      <div class="sgich_fl">
        <div class="f-thide sgich_tl">
          {{data.name}}
        </div>
        <div class="f-thide sgich_info">
          {{sginfo}}
        </div>
      </div>
      <div class="sgich_fr">
        <span class="u-hmsprt sgich_ply"></span>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'list-cell',
  props: {
    data: Object,
    id: Number
  },
  computed: {
    sginfo () {
      const song = this.data
      if (!song.album && song.artists.length === 0) return '无'
      let data = ''
      const list = song.artists
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

.sgich_ply {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-position: -24px 0;
}

.sgich_fr {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 10px;
}

.sgich_info {
  font-size: 12px;
  color: #888;
}

.list-cell {
  display: flex;
  width: 100%;
}

.sgich_tl {
  font-size: 17px;
}

.sgich_fl {
  padding: 6px 0;
  width: 0;
}

.sgi_fr, .sgich_fl {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
}

.sgi_fl, .sgi_fr {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.sgi_fr, .sgich_fl {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
}

.sgi_fr {
  position: relative;
}

.sgi_fl {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  width: 40px;
  font-size: 17px;
  color: #999;
}
</style>
