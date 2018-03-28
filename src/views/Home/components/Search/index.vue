<template>
  <div class="m-search">
    <form class="m-input f-bd f-bd-btm" method="get" action="#">
      <div class="inputcover">
        <i class="u-svg u-svg-srch"></i>
        <input name="search" class="input" v-model="keywords" @keyup="hiddenLabel" autocomplete="off">
        <label v-show="isHidden" class="holder">搜索歌曲、歌手、专辑</label>
        <figure class="close">
          <i class="u-svg u-svg-empty z-show"></i>
        </figure>
      </div>
    </form>
    <div class="m-search__default">
      <section class="m-hotlist">
        <h3 class="m-hotlist__title">热门搜索</h3>
        <ul class="m-hotlist__list">
          <li class="m-hotlist__list--item f-bd f-bd-full" v-for="item in hotlist" :key="item">
            <a class="link">{{item}}</a>
          </li>
        </ul>
      </section>
      <section class="m-history">

      </section>
    </div>
  </div>
</template>

<script>
import { searchSuggest } from '@/api/home'

export default {
  name: 'search',
  data () {
    return {
      hotlist: [
        '谎人国',
        '慢慢喜欢你',
        '披头士',
        '方大同',
        '徐梦圆',
        '偶像练习生',
        '林宥嘉',
        '小幸运',
        'Welcome To New York',
        '苏打绿'
      ],
      searchWord: '',
      isHidden: true,
      stopHidden: false
    }
  },
  computed: {
    keywords: {
      get () {
        return this.searchWord
      },
      set (v) {
        if (v === '' && this.isHidden === false) {
          this.isHidden = true
          this.stopHidden = true
        }
        this.searchWord = v
        this.handleSearch(v)
      }
    }
  },
  methods: {
    async handleSearch (v) {
      console.warn('keywords', v)
      const { result } = await searchSuggest({ keywords: v })
      console.log('result', result)
    },
    hiddenLabel () {
      if (this.stopHidden) {
        this.stopHidden = false
        return
      }
      this.isHidden = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixins/mixins";

.close {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
}

.inputcover {
  padding: 0 16px;
}

.inputcover, .m-input-login {
  width: 100%;
  box-sizing: border-box;
}

.m-input {
  padding: 15px 10px;
  padding-top: 25px;
  & > .inputcover {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
  }
  & .input {
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: transparent;
    font-size: 14px;
    color: #333;
  }
  & .holder {
    position: absolute;
    left: 30px;
    top: 5px;
    font-size: 14px;
    color: #c9c9c9;
    background: transparent;
    pointer-events: none;
  }
}

@include b(m-search) {
  background: #fbfcfd;
}

@include b(m-hotlist) {
  padding: 15px 10px 0;
  @include e(title) {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  @include e(list) {
    margin: 10px 0 7px;
    @include m(item) {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      &:after {
        border-color: #d3d4da;
        border-radius: 32px;
      }
    }
  }
}
</style>
