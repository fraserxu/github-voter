<template>
  <div class='redirect'>
    redirecting...
  </div>
</template>

<script>
import api from '../utils/api'
import { setCookie} from '../utils/cookie'

export default {
  name: 'Oauth',

  route: {
    canActivate (transition) {
      const code = transition.to.query.code
      if (code) {
        api.getToken(code)
          .then(res => {
            if (!res.error) {
              setCookie('oauth-token', res.token)
              const { router } = transition.to
              router.go({
                path: '/events'
              })
            } else {
              const { router } = transition.to
              router.go({
                path: '/401'
              })
            }
          })
      }
      return true
    }
  }
}
</script>

<style lang="stylus">
.redirect
  box-sizing border-box
  margin 25px 25px 0
  transition background-color .2s ease
  border-bottom 1px solid #f2f2f2
  padding-bottom 25px
</style>
