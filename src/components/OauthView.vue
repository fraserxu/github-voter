<template>
  <div>
    redirecting...
  </div>
</template>

<script>
import store from '../store'
import { setCookie} from '../store/cookie'

export default {
  name: 'Oauth',

  route: {
    canActivate (transition) {
      const code = transition.to.query.code
      if (code) {
        store.getToken(code)
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
