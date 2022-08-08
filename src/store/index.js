import { createStore } from 'vuex'
import { getinfo } from '@/api/manager'
import { removeToken, setToken } from '@/composables/auth'

const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
      asideWidth: '250px',
      menus: [],
      ruleNames: [],
    }
  },
  actions: {
    //解决刷新后页面的用户信息就木有了的问题

    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            commit('SET_USERINFO', res)
            commit('SET_MENUS', res.menus)
            commit('SET_RULENAMES', res.ruleNames)
            resolve(res)
          })
          .catch((err) => {})
      })
    },
    logout({ commit }) {
      // 清除cookie里面的Token
      removeToken()
      // 清除用户的用户状态  vuex
      commit('SET_USERINFO')
    },
  },
  /**
   * 记录用户信息
   */

  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user
    },
    // 展开/缩起侧边
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
    },
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    },
  },
})

export default store
