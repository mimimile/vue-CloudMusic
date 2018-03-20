<template>
  <div>
    <h2 class="remd-tl" data-reactid="49">{{title}}</h2>
  </div>
</template>

<script>

export default {
  name: 'subtitle',
  props: {
    title: {
      type: String,
      default: '我是标题'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.remd-tl {
  position: relative;
  padding-left: 9px;
  margin-bottom: 14px;
  font-size: 17px;
  height: 20px;
  line-height: 20px;
}

.remd-tl:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 2px;
    height: 16px;
    background-color: #d33a31;
}
</style>
