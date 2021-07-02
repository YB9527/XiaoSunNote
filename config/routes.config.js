


export default {
	// 权限路由 在main.js可实现路由拦截 所以路由都需要注册 待完善
	defaultAuth:true,
	auths:{
		requiresAuth:[
			{name: 'index',label:"点餐",path: '/',},
			{name: 'my',label:"点餐",path: '/pages/my/my',},
		],
		// 非权限路由
		noAuth:[
			{name: 'login',label:"登录",path: '/pages/login/login'},

		],
	}
};
