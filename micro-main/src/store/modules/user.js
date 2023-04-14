import Vue from 'vue'
import { USER_NAME, ACCESS_SECURITY, ACCESS_TOKEN, NAVS, MENUS } from '@/store/mutation-types'
import { handleMenus, generateRoutes, generateActiveRule } from '@/utils/menu.js'
import { getMenu } from '@/api/auth'

const user = {
  namespaced: true,
  state: {
    username: '',
    security: '',
    token: '',
    navs: [],
    menus: [],
    routes: {}
  },
  getters: {
    GET_ROUTES (state) {
      return state.routes
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      Vue.ss.set(USER_NAME, user)
      state.username = user
    },
    SET_SECURITY: (state, security) => {
      Vue.ss.set(ACCESS_SECURITY, security)
      state.security = security
    },
    SET_TOKEN: (state, token) => {
      Vue.ss.set(ACCESS_TOKEN, token)
      state.token = token
    },
    SET_NAVS: (state, navs) => {
      Vue.ss.set(NAVS, navs)
      state.navs = navs
    },
    SET_MENUS: (state, menus) => {
      Vue.ss.set(MENUS, menus)
      state.menus = menus
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    // 登录
    Login ({ commit }, params) {
      
    },
    // 退出登录
    Logout ({ commit, state }) {
      
    },
    Security ({ commit }) {
      
    },
    // 获取菜单
    Navigation ({ commit, state, dispatch }) {
      return new Promise(async (resolve, reject) => {
        let response = await getMenu()
        let data = response.data
        // 整理各个微应用的路由信息
        dispatch('GenerateRoutes', data)
        let navs = []
        let menus = []
        // 进入系统后首个加载的微应用activeRule
        const customConfig = window.microApp.getCustomConfig()
        let activeRule = generateActiveRule(customConfig.activeRule, data)
        if (customConfig.menuLayout === 'nav') {
          // 导航栏模式布局
          data.forEach((nav, index) => {
            navs.push({
              title: nav.title,
              icon: nav.icon ? nav.icon : 'table',
              path: nav.activeRule ? nav.activeRule + nav.target : '',
              key: index.toString(),
              menus: []
            })

            if (nav.children && nav.children.length) {
            // 如果存在子菜单
              navs[index].menus = handleMenus(nav.children)
            }
          })
          commit('SET_NAVS', navs)
        } else if (customConfig.menuLayout === 'menu') {
          // 侧边栏模式布局
          menus = handleMenus(data)
          commit('SET_MENUS', menus)
        }
        resolve(activeRule)
      })
    },
    // 将菜单的层级结构，拆分成各个微应用的map结构
    GenerateRoutes ({ commit }, data) {
      let routes = generateRoutes(data)
      commit('SET_ROUTES', routes)
    }
  }
}

export default user
