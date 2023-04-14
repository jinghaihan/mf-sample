import Vue from 'vue'
import { MICRO_LOADING } from '@/store/mutation-types'

const micro = {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING: (state, loading) => {
      Vue.ss.set(MICRO_LOADING, loading)
      state.loading = loading
    }
  }
}

export default micro
