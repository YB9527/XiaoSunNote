import routesconfig from "@/config/routes.config.js"
import userApi from '@/api/userApi.js'
/*
 * 路由对象
 * 中心思想：需要路由鉴权,由于uni-app没有vue中的全局钩子函数，所以封装了Router对象。
 * 说明：应用中的路由跳转尽量使用该Router的方法，并配合config中的路由表对象进行跳转。
 *
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 *
 */
class Router {
	constructor() {
		this.routeMap={};
		for (let key in routesconfig.auths) {
			let routeArray = routesconfig.auths[key];
			let requiresAuth;
			switch(key){
				case "requiresAuth":
					requiresAuth = true;
					break;
				case "noAuth":
					requiresAuth = false;
					break;
			}
			for (let route of routeArray) {
				route.requiresAuth = requiresAuth;
				this.routeMap[route.name] = route;
			}
		}
		//console.log(112,this.routeMap);
		this.callBack = () => {};
	}
	setVue(vue){
		this.vue = vue;
		
	}
	
	/**路由跳转
	 * @param {Object} navType 跳转类型
	 * @param {Object} key 关键字
	 * @param {Object} params 携带的参数
	 */
	jump(navType,key,params){
		let self = this;
		let route = this.routeMap[key];
		if(!route){
			console.log("没有配置路由："+key);
		}
		let url = this.objParseUrlAndParam(route.path,params);
		 new Promise(resole=>{
			 let flag = true;
			if(route.requiresAuth){
				if(!userApi.token){
					//self.redirectTo("login");
					resole(false);
				}else{
					resole(true);
				}
			}else{
				resole(true);
			}
		}).then(()=>{
			//console.log(url);
			uni[navType]({
				url,
				fail(e){
					console.log("error",e);
				}
			})
		});
	}
	jumpAll(route,search){
		let url = route.path+search;
		
		//console.log(url);
		uni.redirectTo({
			url,
			fail() {
				uni.switchTab({
					url
				})
			}
		})
	}
	objParseUrlAndParam(path, obj) {
		let url = path || '/';
		let paramsStr = '';
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += '?');
		url += paramsStr;
		return url;
	}
	/*
	 * obj 转 params字符串参数
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = '';
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	}
	navigateTo(key,params) {
		
		this.jump('navigateTo', key,params);
	}

	redirectTo(key,params) {
		this.jump('redirectTo', key,params);
	}

	reLaunch(key,params) {
		this.jump('reLaunch', key,params);
	}

	switchTab(key,params) {
		this.jump('switchTab', key,params);
	}

	back(delta) {
		// #ifdef H5
		history.back();
		// #endif
		// #ifndef H5
		uni.navigateTo({ 			delta
		});
		// #endif
	}
	
	
	
}

export default new Router();
