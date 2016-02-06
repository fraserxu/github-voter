<template>
  <div>
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
              setCookie('oauth-token', res.access_token)
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
