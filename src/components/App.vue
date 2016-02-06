<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
      <a id="yc" href="https://github.com/fraserxu/github-voter">
        <img src="/static/logo.png">
      </a>
      <h1><a href="#/">Github Voter</a></h1>
      <span class="source">
        Built with <a href="http://vuejs.org" target="_blank">Vue.js</a> |
        <a href="https://github.com/fraserxu/github-voter" target="_blank">Source</a> |
        <span v-show="!user">
          <a :href="oauthUrl">Login</a>
        </span>
        <span v-if="user">
          <a :href="user.html_url">{{user.login}}</a>
        </span>
      </span>
    </div>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import { getCookie } from '../utils/cookie'
import store from '../store'
import config from 'json!../../config.json'

const { getUser } = store.actions

export default {
  name: 'App',

  data () {
    return {
      oauthUrl: `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scope}`
    }
  },

  computed: {
    user () {
      return store.state.user
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

html, body
  font-family Verdana
  font-size 13px
  height 100%
ul
  list-style-type none
  padding 0
  margin 0
a
  color #000
  cursor pointer
  text-decoration none

#wrapper
  background-color $bg
  position relative
  width 85%
  min-height 80px
  margin 0 auto
#header
  background-color #f60
  height 24px
  position relative
  h1
    font-weight bold
    font-size 13px
    display inline-block
    vertical-align middle
    margin 0
  .source
    color #fff
    font-size 11px
    position absolute
    top 4px
    right 4px
    a
      color #fff
      &:hover
        text-decoration underline
#yc
  border 1px solid #fff
  margin 2px
  display inline-block
  vertical-align middle
  img
    vertical-align middle
    width 18px
.view
  position absolute
  background-color $bg
  width 100%
  transition opacity .2s ease
  box-sizing border-box
  padding 8px 20px
  &.v-enter, &.v-leave
    opacity 0
@media screen and (max-width: 700px)
  html, body
    margin 0
  #wrapper
    width 100%
</style>
