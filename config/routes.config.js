


export default {
	// 权限路由 在main.js可实现路由拦截 所以路由都需要注册 待完善
	defaultAuth:true,
	auths:{
		requiresAuth:[
			{name: 'index',label:"点餐",path: '/',},
			{name: 'my',label:"点餐",path: '/pages/my/my',},
			{name: 'programLog',label:"编程记录",path: '/pages/programLog/programLog',},
			{name: 'programLogDetails',label:"编程记录详情",path: '/pages/programLog/programLogDetails',},
			
			{name: 'journal',label:"个人日志",path: '/pages/journal/journal',},
		],
		// 非权限路由
		noAuth:[
			{name: 'login',label:"登录",path: '/pages/user/login/login'},
			{name: 'regist',label:"注册",path: '/pages/user/regist/regist'},

		],
	}
};
