import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        // cartItems: []
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        // setCartItems(state, cartItems){
        //     state.cartItems = cartItems
        // }
    },
    actions: {
        setToken({ commit }, token) {
            //async logic
            //call mutation setToken and pass it the token object
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        // setCartItems({commit}, cartItems){
        //     commit(("setCartItems"),cartItems)
        // }
    }
})