
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
        loginUser:"",
    },
	getters: {
		loginUser: state => {
			return state.loginUser;
		},
	},
	mutations: {
		setLoginUser(state,user) {
			// 变更状态
			uni.loginUser = user;
			state.loginUser= user;
		}
	}
})
export default store