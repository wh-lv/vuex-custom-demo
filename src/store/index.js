import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        score (state) {
            return 'score: ' + state.count
        }
    },
    mutations: {
        add (state, num = 1) {
            state.count += num
        },
        asyncAdd (state, num = 1) {
            state.count += num
        }
    },
    actions: {
        add ({ commit }, num) {
            commit('add', num)
        },
        asyncAdd({ commit }, num) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('asyncAdd', num)
                    resolve({ ok: true })
                }, 1000)
            })
        }
    }
})