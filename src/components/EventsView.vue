<template>
  <div class="news-view" :class="{ loading: isLoading }">
    <!-- not found -->
    <not-found
      v-if="error">
    </not-found>

    <!-- issue list -->
    <issue
      v-if="issues.length"
      v-for="issue in issues"
      :index="$index | formatItemIndex"
      :issue="issue"
      track-by="$index">
    </issue>
  </div>
</template>

<script>
import store from '../store'
import Issue from './Issue.vue'
import NotFound from './NotFoundView.vue'

const { fetchIssues } = store.actions

export default {
  name: 'EventsView',

  components: {
    Issue,
    NotFound
  },

  data () {
    return {
      isLoading: false
    }
  },

  computed: {
    issues () {
      return store.state.issues
    },
    error () {
      return store.state.error
    }
  },

  created () {
    fetchIssues()
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
  margin 0
  padding 0
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
