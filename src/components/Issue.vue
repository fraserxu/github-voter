<template>
  <div class="issue">
    <div class="avatar">
      <div class="bgimg" v-bind:style="{ backgroundImage: 'url(' + issue.user.avatar_url + ')' }"></div>
    </div>
    <div class="main">
      <div class="header">

        <span class="username">{{issue.user.login}}</span>

        <a class="title" :href="issue.html_url" target="_blank">{{{issue.title}}}</a>

      </div>
      <div class="body">
        <button v-on:click="vote(issue.number)">
          <span v-if="user" class="votearrow"></span>
          <span class="comments-link">
            {{issue.comments}}
          </span>
        </button>

        <!-- <span class="index">{{index}}.</span> -->

        <span class="subtext">
          {{issue.created_at | fromNow}} ago
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import api from '../utils/api'

const { fetchIssues } = store.actions

export default {
  name: 'Issue',

  computed: {
    user () {
      return store.state.user
    }
  },

  props: {
    issue: Object,
    index: Number
  },

  methods: {
    vote (number) {
      api.vote(number).then(res => {
        fetchIssues()
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"
.issue
  box-sizing border-box
  margin 25px 25px 0
  transition background-color .2s ease

  display flex
  border-bottom 1px solid #f2f2f2
  padding-bottom 25px
  .avatar
    height 110px
    min-width 110px
    width 110px
    margin-right 25px
    border-radius 3px
    background-color #f2f2f2
    .bgimg
      height inherit
      width inherit
      background none center/cover #f2f2f2
  .main
    display flex
    flex-direction column
    justify-content center
    .header
      display flex
      flex-direction column
      .username
        font-size 20px
        font-weight 200
        letter-spacing .2px
        line-height 24px
        color #000
    .body
      margin-top 15px
      button
        cursor pointer
        background #fff
        margin-right 10px
        color #000
        file #000
        border-radius 3px
        border 1px solid transparent
        box-sizing border-box
        outline 0
        border-color #f2f2f2
        height 24px
        padding 0 8px
  p
    margin 2px 0
    padding-left 30px
  .title
    padding 0
  .title:visited
    color $gray
  .votearrow
    display inline-block
    cursor pointer
    width 10px
    height 10px
    border 0px
    background url("https://news.ycombinator.com/grayarrow2x.gif") no-repeat
    background-size 10px
  .index
    color $gray
  .domain, .subtext
    font-size 11px
    color $gray
    a
      color $gray
  .subtext a:hover
    text-decoration underline
</style>
