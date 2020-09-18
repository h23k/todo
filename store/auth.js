export const state = () => ({
  authUser: null,
})

export const getters = {
  getAuthUsername(state) {
    return (state.authUser) ? state.authUser.username : ''
  }
}

export const mutations = {
  SET_USER(state, authUser) {
    state.authUser = authUser
  },
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post('/auth/login', { username, password })
      commit('SET_USER', data)
    } catch(error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.error)
      }
      throw error
    }
  },
  async logout({ commit }) {
    await this.$axios.post('/auth/logout')
    commit('SET_USER', null)
  },
}