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
        <div class="f-thide sgtl" >
          <span v-html="keywords(data.name, highlight)"></span>
          <span v-if="data.alias.length !== 0" class="sgalia" v-html="keywords(data.alias[0], highlight)">
          </span>
        </div>
        <div class="f-thide sginfo" v-html="keywords(sginfo, highlight)">
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
  name: 'result-cell',
  props: {
    data: Object,
    highlight: {
      type: String,
      default: ''
    }
  },
  computed: {
    sginfo () {
      const song = this.data
      if (song.artists.length === 0) return '无'
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
  },
  methods: {
    keywords (v, highlight) {
      const str = v.toLowerCase()
      const key = highlight.toLowerCase()
      const len = key.length
      if (key === '') return v
      if (str.match(key)) {
        let begin = str.indexOf(key)
        let i = 0
        const arr = str.split('')
        for (i, begin; begin < len; ++begin, ++i) {
          arr[begin] = `<span style="color: #507daf;">${v[i]}</span>`
        }
        return arr.join('')
      }
      return v
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";
</style>
