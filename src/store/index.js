import { EventEmitter } from 'events'
import { polyfill } from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

const owner = 'fraserxu'
const repo = 'github-voter'
const store = new EventEmitter()

// issue api: https://api.github.com/repos/:owner/:repo/issues
// auth server: https://github-voter.herokuapp.com/

store.fetchIssues = id => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
    .then(res => {
      return res.json()
    })
}

store.getToken = code => {
  return fetch(`https://github-voter.herokuapp.com/authenticate/${code}`)
    .then(res => {
      return res.json()
    })
}

export default store
