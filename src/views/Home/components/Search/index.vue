<template>
  <div class="m-search">
    <form class="m-input f-bd f-bd-btm" method="get" action="#">
      <div class="inputcover">
        <i class="u-svg u-svg-srch"></i>
        <form onsubmit="return false;" >
          <input name="search" class="input" v-model="keywords" @keyup="hiddenLabel" @keyup.enter="getResult" autocomplete="off">
        </form>
        <label v-show="isHidden" class="holder">搜索歌曲、歌手、专辑</label>
        <figure class="close" v-show="!isHidden">
          <i class="u-svg u-svg-empty z-show" @click="keywords = ''; searchWord = ''"></i>
        </figure>
      </div>
    </form>
    <div class="m-search__center">
      <section v-if="type === searchType.default" class="m-hotlist">
        <h3 class="m-hotlist__title">热门搜索</h3>
        <ul class="m-hotlist__list">
          <li class="m-hotlist__list--item f-bd f-bd-full" v-for="item in hotlist" :key="item">
            <a class="link" @click="searchItem(item)">{{item}}</a>
          </li>
        </ul>
        <section class="m-history" v-if="historyList">
          <ul class="m-history__list">
            <li class="m-history__item">
              <history-cell :data="item" v-for="(item, index) in historyList" :key="index" @search="searchItem" @remove="remove"></history-cell>
            </li>
          </ul>
        </section>
      </section>
      <section v-else-if="type === searchType.recom" class="m-history">
        <h3 class="title f-bd f-bd-btm f-thide">
          搜索“{{keywords}}”
        </h3>
        <ul>
          <li class="recomitem" v-for="(item, index) in orderList" :key="index">
            <i class="u-svg u-svg-search"></i>
            <span class="f-bd f-bd-btm f-thide">{{item}}</span>
          </li>
        </ul>
      </section>
      <section v-else-if="type === searchType.result" class="m-songlist">
        <div class="m-sglst" v-for="(item, index) in resultList" :key="index">
          <result-cell class="m-sglst__item" :data="item" :highlight="searchWord"></result-cell>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Enum from 'enum'
import { searchSuggest, searchResult } from '@/api/home'
import { localStorage } from '@/modules/storage'
import { ResultCell, HistoryCell } from './components'

const searchType = new Enum(['default', 'recom', 'result'])
const historyKey = 'historyKey'

export default {
  name: 'search',
  components: {
    ResultCell,
    HistoryCell
  },
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
      searchType,
      type: searchType.default,
      searchWord: '',
      isHidden: true,
      stopHidden: false,
      orderList: [],
      resultList: [],
      historyList: []
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
          this.type = searchType.default
          return
        }
        this.searchWord = v
        this.handleSearch(v)
        this.type = searchType.recom
      }
    }
  },
  mounted () {
    this.checkHistory()
  },
  methods: {
    remove () {
      this.historyList = localStorage.getItem(historyKey)
    },
    addHistory (keywords) {
      const order = this.historyList.indexOf(keywords)
      if (order >= 0) return
      this.historyList.push(keywords)
      localStorage.setItem(historyKey, this.historyList)
    },
    checkHistory () {
      if (localStorage.hasItem(historyKey)) {
        this.historyList = localStorage.getItem(historyKey)
      }
    },
    async searchItem (keywords) {
      this.searchWord = keywords
      this.keywords = keywords
      this.isHidden = false
      const { result: { songs } } = await searchResult({ keywords, limit: 100 })
      this.resultList = songs
      this.type = searchType.result
      this.addHistory(keywords)
    },
    async getResult () {
      const { result: { songs } } = await searchResult({ keywords: this.keywords, limit: 100 })
      this.resultList = songs
      this.type = searchType.result
      this.addHistory(this.keywords)
    },
    async handleSearch (v) {
      const { result: { order } } = await searchSuggest({ keywords: v })
      this.orderList = order
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

.recomitem {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 45px;
  padding-left: 10px;
}

.recomitem > span {
  display: inline-block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  width: 1%;
  padding-right: 10px;
  font-size: 15px;
  line-height: 45px;
  color: #333;
  &:after {
    border-color: rgba(0,0,0,.1);
  }
}

.recomitem > i {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  margin-right: 7px;
}

.title {
  height: 50px;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  line-height: 50px;
  color: #507daf;
}

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

@include b(m-sglst) {
  @include e(item) {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-left: 10px;
  }
}
</style>
