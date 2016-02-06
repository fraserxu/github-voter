<template>
  <div class="issue">
    <span class="index">{{index}}.</span>
    <span v-if="user" class="votearrow" v-on:click="vote(issue.number)"></span>
    <p>
      <a class="title" :href="issue.html_url" target="_blank">{{{issue.title}}}</a>
      <span class="domain">
        ({{issue.html_url}})
      </span>
    </p>
    <p class="subtext">
      <span>
        Created by
        <a :href="issue.user.html_url">{{issue.user.login}}</a>
      </span>
      {{issue.created_at | fromNow}} ago
      <span class="comments-link">
        | {{issue.comments}} {{issue.comments | pluralize 'vote'}}
      </span>
    </p>
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
  padding 2px 0 2px 30px
  position relative
  transition background-color .2s ease
  p
    margin 2px 0
    padding-left 15px
  .title:visited
      color $gray
  .votearrow
    cursor: pointer
    position absolute
    width 10px
    height 10px
    border 0px
    margin 5px 2px 6px
    background url("https://news.ycombinator.com/grayarrow2x.gif") no-repeat
    background-size: 10px
  .index
    color $gray
    position absolute
    width 30px
    text-align right
    left 0
    top 4px
  .domain, .subtext
    font-size 11px
    color $gray
    a
      color $gray
  .subtext a:hover
    text-decoration underline
</style>
