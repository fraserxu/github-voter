<template>
  <div class="issue">
    <span class="index">{{index}}.</span>
    <p>
      <a class="title" :href="issue.html_ur" target="_blank">{{{issue.title}}}</a>
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
export default {
  name: 'Issue',
  props: {
    issue: Object,
    index: Number
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"
.issue
  padding 2px 0 2px 40px
  position relative
  transition background-color .2s ease
  p
    margin 2px 0
  .title:visited
      color $gray
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
