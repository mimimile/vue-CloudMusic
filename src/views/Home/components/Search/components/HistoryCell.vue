<template>
  <div class="history-cell">
    <i class="u-svg u-svg-histy"></i>
    <div class="histyr f-bd f-bd-btm">
      <span @click="search" class="link f-thide">{{data}}</span>
      <figure class="close" @click="remove"><i class="u-svg u-svg-close"></i></figure>
    </div>
  </div>
</template>

<script>
import { localStorage } from '@/modules/storage'
const historyKey = 'historyKey'

export default {
  name: 'history-cell',
  props: {
    data: String
  },
  methods: {
    search () {
      this.$emit('search', this.data)
    },
    remove () {
      const arr = localStorage.getItem(historyKey)
      const order = arr.indexOf(this.data)
      const result = arr.splice(order + 1, 1)
      localStorage.setItem(historyKey, result)
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.u-svg-histy {
  margin: 0 10px;
}

.histyr {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  width: 1%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 45px;
}
.histyr:after {
  border-color: rgba(0,0,0,.1);
}
.link {
  margin-right: 10px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  width: 1%;
}

.history-cell {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 45px;
}
.close {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  line-height: 32px;
}
.u-svg-close {
  margin-left: 2px;
}
</style>
