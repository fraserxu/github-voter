<template>
  <div class="news-view" :class="{ loading: !issues.length }">
    <!-- issue list -->
    <issue
      v-for="issue in issues"
      :issue="issue"
      :index="$index | formatItemIndex"
      track-by="id">
    </issue>
  </div>
</template>

<script>
import store from '../store'
import Issue from './Issue.vue'

export default {
  name: 'EventsView',

  components: {
    Issue
  },

  data () {
    return {
      issues: []
    }
  },

  route: {
    data ({ to }) {
      return store.fetchIssues()
        .then(issues => {
          return ({
            issues
          })
        })
    }
  },

  filters: {
    formatItemIndex (index) {
      return index + 1
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-left 5px
  padding-right 15px
  &.loading:before
    content "Loading..."
    position absolute
    top 16px
    left 20px
  .nav
    padding 10px 10px 10px 40px
    margin-top 10px
    border-top 2px solid #f60
    a
      margin-right 10px
      &:hover
        text-decoration underline
</style>
