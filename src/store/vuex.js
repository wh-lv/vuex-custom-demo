/**
 * 1、维护状态 state
 * 2、修改状态 commit
 * 3、业务逻辑分发 dispatch
 * 4、状态派发 getters
 * 5、实现 state 响应式
 * 6、插件
 * 7、混入
 */

let Vue;

// 可自定义 storeName
function install (_Vue, storeName = '$store') {
    Vue = _Vue

    Vue.mixin({
        beforeCreate () {
            if (this.$options.store) {
                Vue.prototype[storeName] = this.$options.store
            }
        }
    })
}

class Store {
    constructor (options) {
        this.state = new Vue({
            data: options.state
        })

        this.mutations = options.mutations || {}
        this.actions = options.actions || {}
        options.getters && this.handleGetters(options.getters)
    }

    // 实现 commit
    commit = (type, ...arg) => {
        const fn = this.mutations[type]
        fn(this.state, ...arg)
    }

    // 实现 dispatch
    dispatch = (type, ...arg) => {
        const fn = this.actions[type]
        return fn({ commit: this.commit, state: this.state }, ...arg)
    }

    // getters 确定 getters 拿到的数据只读
    handleGetters = (getters) => {
        this.getters = {}
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                // 箭头函数写法，确定下面的 this 能拿到 state
                get: () => {
                    return getters[key](this.state)
                }
            })
        })
    }
}

export default { Store, install }

