<template>
  <div class="news-view" :class="{ loading: isLoading }">
    <!-- not found -->
    <not-found
      v-if="error"
      :error="error">
    </not-found>

    <!-- issue list -->
    <issue
      v-if="!error"
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
import NotFound from './NotFoundView.vue'

export default {
  name: 'EventsView',

  components: {
    Issue,
    NotFound
  },

  data () {
    return {
      issues: [],
      isLoading: false,
      error: null
    }
  },

  route: {
    data ({ to }) {
      return store.fetchIssues()
        .then(issues => {
          if (issues.message === 'Not Found') {
            return {
              issues: [],
              error: issues,
              isLoading: false
            }
          } else {
            return ({
              issues,
              isLoading: false
            })
          }
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
