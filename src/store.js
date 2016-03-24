import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetch'

import api from './utils/api'
import { getCookie } from './utils/cookie'

Vue.use(Vuex)

// Constants
const GET_USER = 'GET_USER'
const FETCH_ISSUES = 'FETCH_ISSUES'
const IS_LOADING_ISSUE = 'IS_LOADING_ISSUE'
const FETCH_ISSUES_ERROR = 'FETCH_ISSUES_ERROR'
// const VOTE_ISSUE = 'VOTE_ISSUE'

// State
const state = {
  user: null,
  issues: [],
  error: null,
  isLoadingIssue: false
}

// Actions
const actions = {
  getUser: ({ dispatch }) => {
    const token = getCookie('oauth-token')
    if (token) {
      api.getUser(token)
        .then(user => {
          dispatch(GET_USER, user)
        })
    }
  },

  fetchIssues: ({ dispatch }) => {
    api.fetchIssues()
      .then(issues => {
        dispatch(FETCH_ISSUES, issues)
      })
      .catch(err => {
        dispatch(FETCH_ISSUES_ERROR, err)
      })
  }
}

// Mutations
const mutations = {
  [GET_USER] (state, user) {
    state.user = user
  },

  [FETCH_ISSUES] (state, issues) {
    state.issues = issues
  },

  [FETCH_ISSUES_ERROR] (state, error) {
    state.error = error
  }
}

// Store
export default new Vuex.Store({
  state,
  actions,
  mutations
})
