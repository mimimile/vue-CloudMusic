<template>
  <div class="m-svg">
    <svg v-if="sex === 'man'" viewBox="0 0 48 48" class="usr-svg usr-svg-male usrhd_icn" data-reactid="18"><g data-reactid="19"><path class="svg_st0" d="M24,0C10.7,0,0,10.7,0,24c0,13.3,10.7,24,24,24c13.3,0,24-10.7,24-24C48,10.7,37.3,0,24,0z M36,21 c0,0.8-0.7,1.5-1.5,1.5S33,21.8,33,21v-3.9L28.1,22c1.2,1.6,1.9,3.6,1.9,5.7c0,5.4-4.4,9.8-9.8,9.8c-5.4,0-9.8-4.4-9.8-9.8 c0-5.4,4.4-9.7,9.8-9.7c2.2,0,4.1,0.7,5.7,1.9l4.9-4.9H27c-0.8,0-1.5-0.7-1.5-1.5S26.2,12,27,12h9V21z" data-reactid="20"></path><circle class="svg_st0" cx="20.2" cy="27.8" r="6.7" data-reactid="21"></circle><path class="svg_st1" d="M25.5,13.5c0,0.8,0.7,1.5,1.5,1.5h3.9L26,19.9c-1.6-1.2-3.6-1.9-5.7-1.9c-5.4,0-9.8,4.4-9.8,9.7 c0,5.4,4.4,9.8,9.8,9.8c5.4,0,9.8-4.4,9.8-9.8c0-2.2-0.7-4.1-1.9-5.7l4.9-4.9V21c0,0.8,0.7,1.5,1.5,1.5S36,21.8,36,21v-9h-9 C26.2,12,25.5,12.7,25.5,13.5z M20.2,34.5c-3.7,0-6.8-3-6.8-6.8s3-6.7,6.8-6.7c3.7,0,6.8,3,6.8,6.7S24,34.5,20.2,34.5z" data-reactid="22"></path></g></svg>
    <svg v-if="sex === 'woman'" viewBox="0 0 48 48" class="usr-svg usr-svg-female usrhd_icn" data-reactid="18"><path class="svg_st0" d="M24,0c13.3,0,24,10.7,24,24S37.3,48,24,48C10.7,48,0,37.3,0,24S10.7,0,24,0z" data-reactid="19"></path><path class="svg_st1" d="M27,31c-2.3,0-4.4-0.8-6.1-2.1c-0.1,0.2-0.2,0.4-0.3,0.5L19,31l2.5,2.5c0.6,0.6,0.6,1.5,0,2 c-0.6,0.6-1.5,0.6-2,0L17,33l-2.6,2.5c-0.6,0.6-1.5,0.6-2,0c-0.6-0.6-0.6-1.5,0-2L15,31l-2.5-2.5c-0.6-0.6-0.6-1.5,0-2 c0.6-0.6,1.5-0.6,2,0L17,29l1.6-1.6c0.1-0.1,0.3-0.3,0.5-0.3C17.8,25.4,17,23.3,17,21c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10 C37,26.5,32.5,31,27,31z M27,14c-3.9,0-7,3.1-7,7c0,3.9,3.1,7,7,7c3.9,0,7-3.1,7-7C34,17.1,30.8,14,27,14z" data-reactid="20"></path></svg>
  </div>
</template>

<script>
export default {
  name: 'm-svg',
  props: [ 'sex' ]
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.usr-svg-male .svg_st0 {
  fill: #47a1ce;
}

.usr-svg-male .svg_st0 {
  fill: #47a1ce;
}

.usr-svg-male .svg_st1 {
  fill: #fff;
}

.usr-svg-female .svg_st1 {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #fff;
}

.usr-svg-female .svg_st0 {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #ff86b6;
}

.usrhd_icn {
  margin-left: 5px;
  width: 18px;
  height: 18px;
}

.usr-svg {
  display: inline-block;
  width: 21px;
  height: 21px;
  fill: currentColor;
  font: inherit;
}
</style>
