import { EventEmitter } from 'events'
import { polyfill } from 'es6-promise'
import fetch from 'isomorphic-fetch'

import config from 'json!../../config.json'
import { getCookie } from './cookie'

polyfill()

const owner = config.owner || 'fraserxu'
const repo = config.repo || 'github-voter'
const api = new EventEmitter()

api.fetchIssues = () => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
    .then(res => {
      return res.json()
    })
}

api.getUser = (token) => {
  return fetch(`https://api.github.com/user?access_token=${token}`)
    .then(res => {
      return res.json()
    })
}

api.vote = (number) => {
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

api.getToken = code => {
  return fetch(`https://whispering-headland-4014.herokuapp.com/authenticate/${code}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
}

export default api
