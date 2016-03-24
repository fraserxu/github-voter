<template>
  <div class='error'>
    This is a private board. Please make sure you are logged in and have access to the Github repo.
    <div class='detail' v-if="error">
      Detail: <small>{{error}}</small>
    </div>
    <div class='login'>
      <a :href="oauthUrl">Login</a>
    </div>
  </div>
</template>

<script>
import store from '../store'
import config from 'json!../../config.json'

export default {
  name: 'NotFound',

  data () {
    return {
      oauthUrl: `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scope}`
    }
  },

  computed: {
    error () {
      return store.state.error
    }
  }
}
</script>

<style lang="stylus">
.error
  box-sizing border-box
  margin 25px 25px 0
  transition background-color .2s ease
  border-bottom 1px solid #f2f2f2
  padding-bottom 25px
  .detail
    margin-top 15px
  .login
    margin-top 15px
    > a
      padding 0
      margin 0
      color #000
      text-decoration underline
      &:hover
        text-decoration none

</style>
