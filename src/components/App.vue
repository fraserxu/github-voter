<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
      <div class="title">
        <span class="feature"><a href="#/">Github Voter</a></span>
        <div class="source">
          <a href="https://github.com/Wiredcraft/ideas" target="_blank">Source</a>
          <span v-show="!user">
            <a :href="oauthUrl">Login</a>
          </span>
          <span v-if="user">
            <a :href="user.html_url">{{user.login}}</a>
          </span>
        </div>
      </div>
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
  background-color $bg
  font-family Verdana
  font-size 13px
  height 100%
  margin 20px 0 0
  padding 0
ul
  list-style-type none
  padding 0
  margin 0
a
  color #000
  padding 0 .5em
  cursor pointer
  text-decoration none

#wrapper
  position relative
  background-color #FFFFFF
  max-width 725px
  width 725px

  margin 0 auto 20px
  border 1px solid #f2f2f2
#header
  align-items flex-end
  box-sizing border-box
  display flex

  margin 0 20px
  height 60px
  padding-bottom 15px
  border-bottom 1px solid #f2f2f2
  position relative
  .title
    display flex
    align-items baseline
    justify-content space-between
    width 100%
    .feature
      font-weight 200
      font-size 20px
      letter-spacing .2px
      line-height 24px
      color #000
    .source
      > a
        font-size 12px
        font-weight 400
        letter-spacing .6px
        line-height 16px
        color #000
        &:hover
          text-decoration underline
        &:first-of-type
          border-right 1px solid #f2f2f2
.view
  max-width 725px
  &.v-enter, &.v-leave
    opacity 0
@media screen and (max-width: 700px)
  html, body
    margin 0
  #wrapper
    width 100%
</style>
