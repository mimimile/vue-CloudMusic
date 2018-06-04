<template>
  <router-link
    :to="{
      name: 'player',
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
</style>
