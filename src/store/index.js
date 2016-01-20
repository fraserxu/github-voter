import { EventEmitter } from 'events'
import { polyfill } from 'es6-promise'
import fetch from 'isomorphic-fetch'

import { getCookie } from './cookie'

polyfill()

const owner = 'fraserxu'
const repo = 'github-voter'
const store = new EventEmitter()

store.fetchIssues = token => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
    .then(res => {
      return res.json()
    })
}

store.getUser = (token) => {
  return fetch(`https://api.github.com/user?access_token=${token}`)
    .then(res => {
      return res.json()
    })
}

store.vote = (number) => {
  const token = getCookie('oauth-token')
  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments?access_token=${token}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: ':+1:'
      })
    })
    .then(res => {
      return res.json()
    })
}

store.getToken = code => {
  return fetch(`http://localhost:4000/authenticate/${code}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
}

export default store
