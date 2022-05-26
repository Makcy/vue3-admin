import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    async Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      // const password = userInfo.password
      // const code = userInfo.code
      // const uuid = userInfo.uuid
      setToken('User-Token')
      commit('SET_TOKEN', 'User-Token')
    },

    // 获取用户信息
    async GetInfo({ commit, state }) {
      const avatar =
        user.avatar == '' || user.avatar == null
          ? defAva
          : import.meta.env.VITE_APP_BASE_API + user.avatar

      commit('SET_NAME', 'Admin')
      commit('SET_AVATAR', avatar)
    },

    // 退出系统
    async LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
